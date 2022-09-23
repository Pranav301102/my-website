import logo from "./logo.svg";
import * as THREE from 'three' 
import "./App.css";
import { Canvas ,useThree, useFrame} from "@react-three/fiber";
import { Suspense ,useRef} from "react";
import { ScrollControls, Scroll } from "@react-three/drei";
import HomeScene from "./Pages/HomePage/HomePage";
import AboutME from './Pages/AboutMe/Index';
import { useScroll } from '@react-three/drei/web';
import Projects from "./Pages/Projects/Index";

function Background({ color }) {
  const scroll = useScroll()
  const tcolor = new THREE.Color()
  useFrame(( gl ) => {
    if(scroll.offset<0.10){
      gl.scene.background.lerp(tcolor.set( "rgb(255, 255, 255,1)"), 0.1)
    }
    else if(scroll.offset>0.10 && scroll.offset<0.85){
      gl.scene.background.lerp(tcolor.set( "rgba(227,253,253,1)"), 0.05)
    }
    else{
      gl.scene.background.lerp(tcolor.set( "rgb(0, 0, 0,2)"), 0.1)
    }
    
  });
  return (
    <color attach="background" args={[color]} />
  )
}

function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <>
      <Canvas linear gl={{ antialias: true }} dpr={[1,2]} 
      onCreated={({ gl }) => {
          gl.toneMapping = THREE.ReinhardToneMapping
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls damping={4} pages={6}>
          <Background color={"white"}/>
            <Scroll>
              <HomeScene Position={[0,0,0]} isMobile={isMobile}/>
            </Scroll>
            <Scroll html>
            <h1
                style={{ position: "absolute", top: "5vh", left: "7.5vw",fontSize: "10vw",width:"50vw"}}>
                Hi ,I am Pranav
              </h1>
              <div style={{ position: "absolute", top: "100vh", left: "0.5em" }}>
                <AboutME/>
              </div>
              <h1 style={{ position: "absolute", top: "200vh", left: "240px",fontSize: "9vw" }}>
                MY PROJECTS
              </h1>
              <div style={{ position: "absolute", top: "280vh", left: "0.5em" }}>
                <Projects/>
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
