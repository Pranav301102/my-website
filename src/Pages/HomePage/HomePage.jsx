import Particles from "../../Components/Particles"
import Sparks from "../../Components/Sparks"
import { Text3D ,Center} from '@react-three/drei'
import Effects from "../../Components/Effects"
import {  useFrame ,extend,useThree} from '@react-three/fiber'
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'

function HomeText(){
    const ref1 = useRef();
    const ref2 = useRef();
    useFrame((state, delta) => (ref1.current.uTime += delta));
    useFrame((state, delta) => (ref2.current.uTime += delta));
    return(
      <group>
        <Center position={[-10,10,0]}>
        <Text3D position={[22,16,0]}font={'/Fonts/Roboto_Bold.json'} bevelEnabled bevelSize={0.05} size={10} >
          I AM 
          <colorShiftMaterial ref={ref1}  />
        </Text3D>
        <Text3D position={[10,5,0]}font={'/Fonts/Roboto_Bold.json'} bevelEnabled bevelSize={0.05} size={10}>
          PRANAV
          <colorShiftMaterial ref={ref2}  />
        </Text3D>
        </Center>
      </group>
    )
  }

export default function Model(props){
    const mouse = useRef([0, 0])
    useFrame(() => {
    }
    );
    return(
    <><group position={[0,10,0]}>
      <fog attach="fog" args={['white', 50, 190]} />
      <pointLight distance={100} intensity={4} color="white" />
      <Particles count={props.isMobile ? 5000 : 10000} mouse={mouse} />
      <Sparks  count={20} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']}/>
      <HomeText/>
      <Effects />
      </group>
    </>
    )
}