# Esempi di Utilizzo

## Lenis - Smooth Scroll

Lenis è già configurato globalmente nel `SmoothScrollProvider`. Per personalizzare le opzioni, modifica il file `components/providers/smooth-scroll-provider.tsx`:

```tsx
"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

## GSAP - Animazioni

Esempio di animazione con GSAP e ScrollTrigger:

```tsx
"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function AnimatedSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0,
        y: 50,
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return <section ref={ref}>Content</section>
}
```

## WebGL con Three.js

Esempio base con Three.js:

```tsx
"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { WebGLScene } from "@/lib/webgl"

export function WebGLExample() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new WebGLScene(canvasRef.current)
    
    // Aggiungi oggetti 3D
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.scene.add(cube)

    scene.camera.position.z = 5
    scene.animate()

    return () => scene.dispose()
  }, [])

  return <canvas ref={canvasRef} className="w-full h-screen" />
}
```

## WebGL con React Three Fiber

Approccio più moderno con React Three Fiber:

```tsx
"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

export function R3FExample() {
  return (
    <Canvas className="w-full h-screen">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      
      <OrbitControls />
    </Canvas>
  )
}
```

## Shadcn UI Components

Per aggiungere nuovi componenti Shadcn:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

Poi usa i componenti:

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <Button variant="default">Click me</Button>
    </Card>
  )
}
```

## Integrazione GSAP + Lenis

Per sincronizzare GSAP con Lenis, modifica il `SmoothScrollProvider`:

```tsx
"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    // Sincronizza ScrollTrigger con Lenis
    lenis.on("scroll", ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Integra con GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(raf)

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

