"use client"

import { Canvas } from "@react-three/fiber"
import { useGLTF, PerspectiveCamera } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function LogoModel() {
  const { scene } = useGLTF("/Logo3D.gltf")
  const meshRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (meshRef.current) {
      // Centra il modello
      const box = new THREE.Box3().setFromObject(meshRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      // Calcola lo scale per adattare alle dimensioni dell'header
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 4.8 / maxDim
      
      meshRef.current.position.x = -center.x * scale
      meshRef.current.position.y = -center.y * scale
      meshRef.current.scale.set(scale, scale, scale)
    }
  }, [scene])

  // Animazione: rotazione continua su asse Y in loop
  useFrame((state) => {
    if (meshRef.current) {
      // Rotazione continua orizzontale
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={scene}
    />
  )
}


interface Logo3DProps {
  className?: string
}

export function Logo3D({ className }: Logo3DProps) {
  // Preload del modello per performance
  useGLTF.preload("/Logo3D.gltf")

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: "400px", 
        height: "95px"
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={25} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <LogoModel />
      </Canvas>
    </div>
  )
}

