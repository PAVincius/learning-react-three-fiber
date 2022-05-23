import { Canvas, extend, useThree, useFrame } from "react-three-fiber"
import React, { useState, useRef } from 'react'
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { AmbientLight } from 'three';

extend({ OrbitControls })

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[70, 70]}/>
    <meshPhysicalMaterial attach="material" color="white"/>  
  </mesh>
)

const Sphere = () =>{

  const [hovered, setHovered] = useState(false);  
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active  ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "gray" : "blue",
  });

  return (
    <animated.mesh 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <ambientLight intensity={1}/>
      <directionalLight intensity={1} position={[0, 5, 10]} penumbra={1} castShadow/>
      <sphereBufferGeometry attach="geometry" args={[1, 16, 32]}/>
      <animated.meshPhysicalMaterial attach="material" color={props.color}/>    
    </animated.mesh>
  )
}

export default function Home() {
  return (
    <Canvas camera={{position: [0, 1, 5]}} shadows>
      <fog attach="fog" args={["white", 5, 15]}/>
      <Controls />
      <Sphere />
      <Plane />
    </Canvas>
  )
}
