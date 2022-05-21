import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Canvas } from 'react-three-fiber'
import React, { useState } from 'react'

const Sphere = () =>{

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={active  ? [2, 2, 2] : [1, 1, 1]}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 16, 32]}/>
      <meshBasicMaterial attach="material" color={hovered ? "gray" : "black"}/>
    </mesh>
  )
}

export default function Home() {
  return (
    <Canvas>
      <Sphere/>
    </Canvas>
  )
}
