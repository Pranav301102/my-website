import * as THREE from 'three'
import Particles from "../../Components/Particles"
import { useRef, } from 'react';
import { useFrame ,extend} from '@react-three/fiber';
import Blob from '../../Components/blob';
import { useScroll , Text3D ,Center,shaderMaterial} from "@react-three/drei/web";
import glsl from 'babel-plugin-glsl/macro'
import SphereTxt from '../../Components/SphereText';
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


const RenderConditionally = props => useFrame(({ gl, scene, camera }) =>
  props.isScrolling && gl.render(scene, camera), 1)



const ColorShiftMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
    // vertex shader
    glsl`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // fragment shader
    glsl`
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
      }
    `
  )
  
extend({ ColorShiftMaterial })


export  default function HomeScene(props){
    const mouse = useRef([0,0])
    const data = useScroll()
    const meshRef = useRef()
    const condition = useRef()
    
    useFrame((gl, scene, camera) => {
        if(data.offset>0.3){
           
        }
    });

    return(
        <>
        <mesh>
        {/* <RenderConditionally isScrolling={true}/> */}
        {/* <Htext/> */}
        <Blob ref={meshRef}/>
        
        <SphereTxt/>
        <Particles  count={(props.isMobile ? 1000 : 3000)} mouse={mouse}  />
        </mesh>
        </>
    )
}

// ))