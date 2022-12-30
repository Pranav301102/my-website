import * as THREE from 'three'
import { Suspense } from 'react'
import { useRef, useState ,useEffect} from 'react'
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei'




export default function Fooback() {
  const ref = useRef()
  const size = useAspect(1800, 1000)
  console.log(size)
  return (
    <mesh ref={ref} scale={[size[0]*0.25,size[1]*0.25,size[2]]} position={[0,-30.2,4]} rotation={[0, 0, -Math.PI / 13]}>
      <planeGeometry/>  
      <Suspense fallback={<FallbackMaterial url="10.jpg" />}>
        <VideoMaterial url="10.mp4" />
      </Suspense>
    </mesh>
  )
}
function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
  }
  
  function FallbackMaterial({ url }) {
    const texture = useTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
  }