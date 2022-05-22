import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/three';

const Sphere = () =>{

  const [hovered, setHovered] = useState(false);  
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active  ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "gray" : "black",
  });

  return (
    <animated.mesh 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 16, 32]}/>
      <animated.meshBasicMaterial attach="material" color={props.color}/>
    </animated.mesh>
  )
}

export default function Home() {
  return (
    <Canvas>
      <Sphere/>
    </Canvas>
  )
}
