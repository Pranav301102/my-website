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
const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  glsl`
  attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 worldViewProjection;
uniform float time;

varying vec3 vPosition;
varying vec2 vUV;

void main() {
    vec4 p = vec4( position, 1. );
    vPosition = p.xyz;
    vUV = uv;	
	gl_Position = worldViewProjection * p;
}`,
  // fragment shader
  glsl`
  uniform float iTime;
uniform vec2 iResolution;

varying vec3 vPosition;
varying vec2 vUV;

// --------- START-SHADER-TOY-CODE-HERE ------------

// Original shader code from https://www.shadertoy.com/view/WtG3RD

#define TAU 6.2831852
#define MOD3 vec3(.1031,.11369,.13787)
#define BLACK_COL vec3(16,21,25)/255.

vec3 hash33(vec3 p3)
{
	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

float simplex_noise(vec3 p)
{
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    
    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
        
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
	vec3 i1 = e * (1.0 - e.zxy);
	vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    
    vec3 d1 = d0 - (i1 - 1.0 * K2);
    vec3 d2 = d0 - (i2 - 2.0 * K2);
    vec3 d3 = d0 - (1.0 - 3.0 * K2);
    
    vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
    vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
    
    return dot(vec4(31.316), n);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord.xy-iResolution.xy*0.5)/iResolution.y;
        
    float a = sin(atan(uv.y, uv.x));
    float am = abs(a-.5)/4.;
    float l = length(uv);                         
    
    float m1 = clamp(.1/smoothstep(.0, 1.75, l), 0., 1.);
    float m2 = clamp(.1/smoothstep(.42, 0., l), 0., 1.);
    float s1 = (simplex_noise(vec3(uv*2., 1. + iTime*.525))*(max(1.0 - l*1.75, 0.)) + .9);
    float s2 = (simplex_noise(vec3(uv*1., 15. + iTime*.525))*(max(.0 + l*1., .025)) + 1.25);
    float s3 = (simplex_noise(vec3(vec2(am, am*100. + iTime*3.)*.15, 30. + iTime*.525))*(max(.0 + l*1., .25)) + 1.5);
    s3 *= smoothstep(0.0, .3345, l);    
    
    float sh = smoothstep(0.15, .35, l);
    
    
    float m = m1*m1*m2 * ((s1*s2*s3) * (1.-l)) * sh;
    //m = clamp(m, 0., 1.);
    
    vec3 col = mix(BLACK_COL, (0.5 + 0.5*cos(iTime+uv.xyx*3.+vec3(0,2,4))), m);
            
    fragColor = vec4(col, 1.);
}

// --------- END-SHADER-TOY-CODE-HERE ------------

void main() 
{
    mainImage(gl_FragColor, vUV * iResolution.xy);
}

  `
)

extend({ ColorShiftMaterial })


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
        gl.setClearColor(new THREE.Color('#020207'))
      }}> 
      <fog attach="fog" args={['white', 50, 190]} />
      <pointLight distance={100} intensity={4} color="white" />
      <Particles count={isMobile ? 5000 : 10000} mouse={mouse} />
      <Sparks  count={20} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']}/>
      <Center position={[-10,-1,0]}>
      <Text3D font={'/Fonts/Roboto_Bold.json'} bevelEnabled bevelSize={0.05} size={10}>
        PRANAV
        <colorShiftMaterial   color="blue" time={4} /> 
      </Text3D>
      <Text3D position={[10,11,0]}font={'/Fonts/Roboto_Bold.json'} bevelEnabled bevelSize={0.05} size={10}>
        I AM
        <colorShiftMaterial   color="blue" time={4} />      
      </Text3D>
      </Center>
      <Effects />
    </Canvas>
    </div>
  )
}


