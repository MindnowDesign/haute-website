"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "@/lib/gsap"

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Esponi Lenis nel window per accesso globale
    ;(window as any).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      // Sincronizza ScrollTrigger con Lenis
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Aggiorna ScrollTrigger quando Lenis scrolla
    lenis.on("scroll", ScrollTrigger.update)

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      delete (window as any).lenis
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

