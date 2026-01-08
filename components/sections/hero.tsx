"use client"

import Image from "next/image"
import ImageTrail, { ImageTrailItem } from "@/components/fancy/image/image-trail"
import { useEffect, useRef } from "react"
import Lenis from "lenis"

// Array di immagini con aspect ratio diversi e URL da Unsplash
const images = [
  { 
    id: 1, 
    aspectRatio: "4/3", 
    width: 400,
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
  },
  { 
    id: 2, 
    aspectRatio: "16/9", 
    width: 450,
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
  },
  { 
    id: 3, 
    aspectRatio: "3/4", 
    width: 350,
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80"
  },
  { 
    id: 4, 
    aspectRatio: "1/1", 
    width: 380,
    url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80"
  },
]

export function Hero() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Ottieni l'istanza di Lenis dal window se disponibile
    // Lenis viene creato nel SmoothScrollProvider
    const getLenis = () => {
      const lenisInstance = (window as any).lenis
      if (lenisInstance) {
        lenisRef.current = lenisInstance
      }
    }

    // Prova a ottenere Lenis immediatamente e dopo un breve delay
    getLenis()
    const timer = setTimeout(getLenis, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const handleScrollDown = () => {
    const nextSection = document.getElementById('story-section')
    if (nextSection) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(nextSection, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        // Fallback a scrollIntoView se Lenis non è disponibile
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-[#ECEBE8] text-black overflow-hidden">
      {/* Image Trail - sopra il titolo ma sotto le scritte, deve ricevere gli eventi mouse */}
      <ImageTrail
        className="absolute inset-0 z-20"
        threshold={150}
        intensity={0.3}
        repeatChildren={3}
        baseZIndex={20}
        keyframes={{ 
          scale: [0, 1, 1, 1, 0], 
          opacity: [0, 1, 1, 1, 0] 
        }}
        keyframesOptions={{
          duration: 10,
          scale: { times: [0, 0.05, 0.3, 0.9, 1] },
          opacity: { times: [0, 0.05, 0.3, 0.9, 1] },
        }}
        trailElementAnimationKeyframes={{
          x: { duration: 10, type: "tween", ease: "easeOut" },
          y: { duration: 10, type: "tween", ease: "easeOut" },
        }}
      >
        {images.map((image) => (
          <ImageTrailItem
            key={image.id}
            style={{
              width: `${image.width}px`,
              aspectRatio: image.aspectRatio,
            }}
            className="overflow-hidden rounded-sm pointer-events-none"
          >
            <Image
              src={image.url}
              alt="Trail image"
              fill
              className="object-cover"
              unoptimized
            />
          </ImageTrailItem>
        ))}
      </ImageTrail>

      {/* Scritta a sinistra - EST. */}
      <div className="absolute top-1/2 left-4 md:left-8 lg:left-16 -translate-y-1/2 z-30 pointer-events-none">
        <p 
          className="text-sm md:text-base uppercase font-['Helvetica Neue', Helvetica, Arial, sans-serif] tracking-wider opacity-40"
          style={{ mixBlendMode: 'difference' }}
        >
          EST.
        </p>
      </div>

      {/* Scritta a destra - anno di apertura */}
      <div className="absolute top-1/2 right-4 md:right-8 lg:right-16 -translate-y-1/2 z-30 pointer-events-none">
        <p 
          className="text-sm md:text-base uppercase font-['Helvetica Neue', Helvetica, Arial, sans-serif] tracking-wider opacity-40"
          style={{ mixBlendMode: 'difference' }}
        >
          2004
        </p>
      </div>

      {/* Container principale con titolo e "A high-flying idea" */}
      <div className="container mx-auto px-4 text-center relative z-30 pointer-events-none">
        {/* Scritta sopra al titolo */}
        <p 
          className="text-sm md:text-base uppercase font-['Helvetica Neue', Helvetica, Arial, sans-serif] tracking-wider mb-4 md:mb-6 opacity-40"
          style={{ mixBlendMode: 'difference' }}
        >
          A high-flying idea.
        </p>

        {/* Titolo principale */}
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-serif text-black leading-tight">
          Exclusive club
          <br />
          in Zurich
        </h1>
        
        {/* Link scroll down sotto al titolo con animazione hover - deve avere pointer-events */}
        <div className="mt-16 md:mt-20 lg:mt-24 pointer-events-auto inline-block">
          <button
            onClick={handleScrollDown}
            className="text-[20px] leading-[1.5] uppercase text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] cursor-pointer transition-opacity duration-300 ease-out hover:opacity-60 group"
            style={{ mixBlendMode: 'difference' }}
          >
            <span className="inline-block">
              [
              <span className="inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4">
                scroll down
              </span>
              ]
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
