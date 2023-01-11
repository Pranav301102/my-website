import { Text } from "@react-three/drei"
import { extend } from '@react-three/fiber'
import * as THREE from 'three' 
import glsl from 'babel-plugin-glsl/macro'
import { shaderMaterial } from "@react-three/drei"

const fontUrl = `https://fonts.googleapis.com/css?family=Sulphur+Point&display=swap`



export default function MyProject(){
    return(
        <mesh>
            <Text font={fontUrl} position={[-1,-21.8,2]} characters="abcdefghijklmnopqrstuvwxyz" color="white" fontSize={2}>
            Projects 
            <colorShiftMaterial/>
            </Text>    
        </mesh>
    )
}
extend({
    // shaderMaterial creates a THREE.ShaderMaterial, and auto-creates uniform setter/getters
    // extend makes it available in JSX, in this case <portalMaterial />
    ColorShiftMaterial: shaderMaterial(
      { color1: 
         new THREE.Color("#c850c0")
      ,
      color2: 
         new THREE.Color("#ffcc70")
      },
      glsl`
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
      `,
      glsl`
      uniform vec3 color1;
      uniform vec3 color2;
    
      varying vec2 vUv;
      
      void main() {
        
        gl_FragColor = vec4(mix(color1, color2, vUv.y*0.5), 1.0);
      }

    `,
    ),
  })
  