import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import {
  Html,
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial
} from "@react-three/drei";

import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Selection,
  Select,
  SelectiveBloom
} from "@react-three/postprocessing";

function MainSphere({ material }) {
  const main = useRef();
  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime();
    main.current.rotation.y = THREE.MathUtils.lerp(
      main.current.rotation.y,
      mouse.x * Math.PI,
      0.1
    );
    main.current.rotation.x = THREE.MathUtils.lerp(
      main.current.rotation.x,
      mouse.y * Math.PI,
      0.1
    );
  });
  return (
    <Icosahedron
      args={[1, 4]}
      ref={main}
      material={material}
      position={[2.4, 0,0]}
    />
  );
}

function Instances({ material }) {
  // we use this array ref to store the spheres after creating them
  const [sphereRefs] = useState(() => []);
  // we use this array to initialize the background spheres
  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20]
  ];
  // smaller spheres movement
  useFrame(() => {
    // animate each sphere in the array
    // sphereRefs.forEach((el) => {
    //   el.position.y += 0.02;
    //   if (el.position.y > 19) el.position.y = -18;
    //   el.rotation.x += 0.06;
    //   el.rotation.y += 0.06;
    //   el.rotation.z += 0.02;
    // });
  });
  return (
    <>
      <MainSphere material={material} />
      {/* {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))} */}
    </>
  );
}

function Scene() {
  const bumpMap = useTexture("/bump.jpg");
  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "/cube/" }
  );
  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();

  return (
    <>
     
      <MeshDistortMaterial
        ref={set}
        envMap={envMap}
        bumpMap={bumpMap}
        color={"#010101"}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={0.2}
        radius={1.4}
        distort={0.4}
      />
      {material && <Instances material={material} />}
    </>
  );
}

export default function Blob() {
  const meshRef = useRef()
  const light = useRef()
  console.log(meshRef)
  return (
    <mesh>
      <Suspense fallback={<Html center>Loading.</Html>}>
      <Selection enabled>
      <EffectComposer multisampling={0} disableNormalPass={false}>
        {/* <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={3}
          height={480}
        /> */}
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={1.9}
          intensity={2.0}
          height={3}
          opacity={2}
        />
        <Noise opacity={0.025} />
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        </EffectComposer>
        <Select enabled>
        <mesh ref={meshRef}>
        <pointLight ref={light} position={[-49,0,-1]} intensity={300}/>
        <Scene/>
        </mesh>
        </Select>
        </Selection>
      </Suspense>
    </mesh>
  );
}
