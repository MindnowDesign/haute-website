"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
        >
          HAUTE CLUB
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
        >
          Exclusive Club in Zurich
        </p>
      </div>
    </section>
  )
}

