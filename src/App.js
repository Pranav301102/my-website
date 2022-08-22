import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame ,extend} from '@react-three/fiber'
import Effects from './Components/Effects'
import { Text3D ,Center,shaderMaterial} from '@react-three/drei'
// import Sparks from './Components/Sparks'
import Sparks from './Components/Sparks'
import Particles from './Components/Particles'
import './App.css'
import glsl from 'babel-plugin-glsl/macro'
import { GlitchPass } from './Components/Shaders/GlitchPass'

const ColorShiftMaterial = shaderMaterial(
  { time: 0, uColor: new THREE.Color(0, 1, 0.9) ,uTime: 0},
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
    precision lowp float;
    uniform vec3 uColor;
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vec3 col =  sin(uTime + vec3(0,1,3))  ;
      gl_FragColor = vec4(col,1.0);
    }
  `
)

extend({ ColorShiftMaterial })

function HomeText(){
  const ref1 = useRef();
  const ref2 = useRef();
  useFrame((state, delta) => (ref1.current.uTime += delta));
  useFrame((state, delta) => (ref2.current.uTime += delta));
  return(
    <group>
      <Center position={[-10,-1,0]}>
      <Text3D position={[10,11,0]}font={'/Fonts/Roboto_Bold.json'} bevelEnabled bevelSize={0.05} size={10}>
        I AM 
        <colorShiftMaterial ref={ref1}  />
      </Text3D>
      <Text3D position={[10,0,0]}font={'/Fonts/Roboto_Bold.json'} bevelEnabled bevelSize={0.05} size={10}>
        Pranav
        <colorShiftMaterial ref={ref2}  />
      </Text3D>
      </Center>
    </group>
  )
}


export default function App() {
  const mouse = useRef([0, 0])
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return (
    <div className='Container'>
    <Canvas
      linear
      dpr={[1, 2]}
      camera={{ fov: 100, position: [0, 0, 30] }}
      onCreated={({ gl }) => {
        // gl.toneMapping = THREE.ReinhardToneMapping
        gl.setClearColor(new THREE.Color('#020211'))
      }}> 
      <fog attach="fog" args={['white', 50, 190]} />
      <pointLight distance={100} intensity={4} color="white" />
      <Particles count={isMobile ? 5000 : 10000} mouse={mouse} />
      <Sparks  count={20} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']}/>
      <HomeText/>
      <Effects />
    </Canvas>
    </div>
  )
}


