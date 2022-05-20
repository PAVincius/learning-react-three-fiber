import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Canvas } from 'react-three-fiber'

export default function Home() {
  return (
    <Canvas>
        <mesh>
          <sphereBufferGeometry 
            attach="geometry" args={[2, 16, 16]}
          />
          <meshBasicMaterial 
            attach="material" color="red"
          />
        </mesh>
    </Canvas>
  )
}
