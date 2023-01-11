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