import * as THREE from 'three'
import { useRef, } from 'react';
import { useFrame ,extend} from '@react-three/fiber';
import { useScroll , Text3D ,Center,shaderMaterial} from "@react-three/drei/web";
import  glsl  from 'babel-plugin-glsl/macro';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import Effects from './Effects';



export default function Htext(){
    const portalMaterial = useRef()
    // useFrame((state, delta) => (portalMaterial.current.uTime += delta))
    return(
        <>
        <EffectComposer multisampling={0} disableNormalPass={false}>
        <Bloom
          luminanceThreshold={-1.5}
          luminanceSmoothing={1.5}
          height={300}
          opacity={0.5}
          intensity={3}
        />
        <Noise opacity={0.025} />
        </EffectComposer>
        <Center>
        <Text3D lineHeight={0.7} letterSpacing={-0.025} font={'/Fonts/Roboto_Bold.json'} size={1.3} >
        {`hello\nworld !`}
        {/* <portalMaterial  ref={portalMaterial}  /> */}
        <meshNormalMaterial />
        {/* <ColorShiftMaterial/> */}
        </Text3D>
        </Center>
        </>
    )

}
extend({
    // shaderMaterial creates a THREE.ShaderMaterial, and auto-creates uniform setter/getters
    // extend makes it available in JSX, in this case <portalMaterial />
    PortalMaterial: shaderMaterial(
      { uTime: 0 },
      glsl`
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv*0.5;
      }`,
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
  
      }`,
    ),
  })