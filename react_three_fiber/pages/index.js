import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import React, { useState, useRef } from 'react'
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

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
      <Controls />
      <Sphere />
    </Canvas>
  )
}
