import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame ,extend,useThree} from '@react-three/fiber'
import Effects from './Components/Effects'
import { Text3D ,Center,shaderMaterial, Text} from '@react-three/drei'
// import Sparks from './Components/Sparks'
import Sparks from './Components/Sparks'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Particles from './Components/Particles'
import './App.css'
import glsl from 'babel-plugin-glsl/macro'
import { GlitchPass } from './Components/Shaders/GlitchPass'

const ColorShiftMaterial = shaderMaterial(
  { time: 0, uColor: new THREE.Color(0, 1, 0.9) ,uTime: 0},
  // vertex shader
  glsl`
  precision mediump float;
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
    void main() {
      vUv = uv*0.1;
      vec3 pos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,
  // fragment shader
  glsl`
    precision mediump float;
    uniform vec3 uColor;
    varying vec2 vUv;
    uniform float uTime;
    float colormap_red(float x) {
      if (x < 0.0) {
          return 54.0 / 255.0;
      } else if (x < 20049.0 / 82979.0) {
          return (829.79 * x + 54.51) / 255.0;
      } else {
          return 1.0;
      }
  }
  
  float colormap_green(float x) {
      if (x < 20049.0 / 82979.0) {
          return 0.0;
      } else if (x < 327013.0 / 810990.0) {
          return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0;
      } else if (x <= 1.0) {
          return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0;
      } else {
          return 1.0;
      }
  }
  
  float colormap_blue(float x) {
      if (x < 0.0) {
          return 54.0 / 255.0;
      } else if (x < 7249.0 / 82979.0) {
          return (829.79 * x + 54.51) / 255.0;
      } else if (x < 20049.0 / 82979.0) {
          return 127.0 / 255.0;
      } else if (x < 327013.0 / 810990.0) {
          return (792.02249341361393720147485376583 * x - 64.364790735602331034989206222672) / 255.0;
      } else {
          return 1.0;
      }
  }
  
  vec4 colormap(float x) {
      return vec4(colormap_red(x)-1.0, colormap_green(x), colormap_blue(x), 1.0);
  }
  
  // https://iquilezles.org/articles/warp
  /*float noise( in vec2 x )
  {
      vec2 p = floor(x);
      vec2 f = fract(x);
      f = f*f*(3.0-2.0*f);
      float a = textureLod(iChannel0,(p+vec2(0.5,0.5))/256.0,0.0).x;
      float b = textureLod(iChannel0,(p+vec2(1.5,0.5))/256.0,0.0).x;
      float c = textureLod(iChannel0,(p+vec2(0.5,1.5))/256.0,0.0).x;
      float d = textureLod(iChannel0,(p+vec2(1.5,1.5))/256.0,0.0).x;
      return mix(mix( a, b,f.x), mix( c, d,f.x),f.y);
  }*/
  
  
  float rand(vec2 n) { 
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }
  
  float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);
  
      float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
      return res*res;
  }
  
  const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );
  
  float fbm( vec2 p )
  {
      float f = 0.0;
  
      f += 0.500000*noise( p + uTime  ); p = mtx*p*2.02;
      f += 0.031250*noise( p ); p = mtx*p*2.01;
      f += 0.250000*noise( p ); p = mtx*p*2.03;
      f += 0.125000*noise( p ); p = mtx*p*2.01;
      f += 0.062500*noise( p ); p = mtx*p*2.04;
      f += 0.015625*noise( p + sin(uTime) );
  
      return f/0.96875;
  }
  
  float pattern( in vec2 p )
  {
    return fbm( p + fbm( p + fbm( p ) ) );
  }
  
  void main()
  {
    float shade = pattern(vUv);
    gl_FragColor = vec4(colormap(shade).rgb, shade);
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
      <Text3D position={[10,11,0]}font={'/Fonts/Roboto_Bold.json'} bevelEnabled bevelSize={0.05} size={10} >
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

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};


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
      <CameraController/>
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


