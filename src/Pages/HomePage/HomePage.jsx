import * as THREE from 'three'
import Particles from "../../Components/Particles"
import { useRef, useMemo,useLayoutEffect} from 'react';
import DistortionMaterial from "../../Components/DistortionMaterial"
import { useFrame,  useThree } from '@react-three/fiber';
import { useScroll,useTexture, } from "@react-three/drei/web";
import SphereTxt from '../../Components/SphereText';

const square = new THREE.PlaneBufferGeometry(5,5,128,128)
const material1 = new DistortionMaterial()

export  default function HomeScene(props){
    return(
        <>
        <mesh>
        
        <HomeLine postion={[20,0,0]} />
        <SphereTxt/>
        {/* <Particles  count={(props.isMobile ? 1000 : 3000)} mouse={mouse}  /> */}
        </mesh>
        </>
    )
}

function HomeLine(){
    const textures = useTexture(["/ao.jpg", "/normal.jpg", "/height.png", "/roughness.jpg"])
    
    useLayoutEffect(() => {
      textures.forEach((texture) => ((texture.wrapT = texture.wrapS = THREE.RepeatWrapping), texture.repeat.set(4, 4)))
    }, [textures])
    return (
        <>
            <group>
                <Shape  geometry={square} material={material1} textures={textures} opacity={[1]} />
            </group>
        </>
    )
}

function Shape({ geometry, material, args, textures, opacity, color, shadowScale = [9, 1.5, 1], ...props }) {
    const ref = useRef()
    const { mouse, clock } = useThree()
    const [ao, normal, height, roughness] = textures
    const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
    useFrame(() => {
      if (ref.current) {
        rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
        ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
        ref.current.material.time = clock.getElapsedTime() * 3
      }
    })
    return (
      <group {...props}>
        <mesh
          ref={ref}
          args={args}
          geometry={geometry}
          material={material}
          material-color="white"
          material-aoMap={ao}
          material-normalMap={normal}
          material-displacementMap={height}
          material-roughnessMap={roughness}
          material-opacity={opacity}
        />
      </group>
    )
  }
// ))