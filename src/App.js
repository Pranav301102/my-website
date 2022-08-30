import logo from "./logo.svg";
import * as THREE from 'three' 
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ScrollControls, Scroll } from "@react-three/drei";
import HomeScene from "./Pages/HomePage/HomePage";
import AboutME from './Pages/AboutMe/Index';

function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <>
      <Canvas linear gl={{ antialias: true }} dpr={[1, 2]} 
      onCreated={({ gl }) => {
          gl.toneMapping = THREE.ReinhardToneMapping
        }}
      >
      
        <Suspense fallback={null}>
          <ScrollControls damping={4} pages={5}>
            <Scroll>
              <HomeScene Position={[0,0,0]} isMobile={isMobile}/>
            </Scroll>
            <Scroll html>
              <div style={{ position: "absolute", top: "100vh", left: "0.5em" }}>
                <AboutME/>
              </div>
              <h1 style={{ position: "absolute", top: "220vh", left: "60vw" }}>
                be
              </h1>
              <h1
                style={{ position: "absolute", top: "300vh", left: "0.5vw",fontSize: "30vw",}}>
                Pranav 
              </h1>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
