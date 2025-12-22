"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { WebGLScene } from "@/lib/webgl"

interface WebGLCanvasProps {
  className?: string
}

export function WebGLCanvas({ className }: WebGLCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<WebGLScene | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize WebGL scene
    const scene = new WebGLScene(canvasRef.current)
    sceneRef.current = scene

    // Example: Add a simple cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.scene.add(cube)

    scene.camera.position.z = 5

    // Start animation loop
    scene.animate()

    // Cleanup
    return () => {
      scene.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}

