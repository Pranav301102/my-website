import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  TrackballControls,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";
import { Group } from "three";

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize: 0.3,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    // Make text face the camera
    // ref.current.quaternion.copy(camera.quaternion)
    ref.current.lookAt(0, 0, 100);
    // Animate font color
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "grey"),
      0.1
    );
  });
  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      {...props}
      {...fontProps}
      children={children}
    />
  );
}

function Cloud({ count = 2, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    const things = ['React', 'JavaScript', 'AWS', 'Tensorflow','Python','Express.js','Java','Three.js','MongoDB','MySQL','ROS','Spring'];
    for (let i = 1; i < count + 1; i++)
      // Taken from https://discourse.threejs.org/t/can-i-place-obects-on-a-sphere-surface-evenly/4773/6
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          things[Math.floor(Math.random()*things.length)]
        ]);
    return temp;
  }, [count, radius]);
  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

export default function SphereTxt() {
  const cloudref = useRef();
  console.log(cloudref);
  useFrame((state, delta) => {
    cloudref.current.rotation.x -= delta / 10;
    cloudref.current.rotation.y -= delta / 10;
  });
  return (
    <scene>
     
    <PresentationControls
      cursor={true} // Whether to toggle cursor style on drag
      snap={true} // Snap-back to center (can also be a spring config)
      speed={1} // Speed factor
      // Zoom factor when half the polar-max is reached
      rotation={[0, 0, 0]} // Default rotation
      polar={[0, Math.PI / 2]} // Vertical limits
      azimuth={[-2,0 ]} // Horizontal limits
      config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
    >
      <group ref={cloudref} position={[4.5, -2.5,0]} >
        <Cloud count={10} radius={4} />
      </group>
    </PresentationControls>
    </scene>
  );
}
