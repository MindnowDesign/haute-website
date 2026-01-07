"use client"

import Image from "next/image"
import ImageTrail, { ImageTrailItem } from "@/components/fancy/image/image-trail"
import Letter3DSwap from "@/components/fancy/text/letter-3d-swap"

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
  const handleScrollDown = () => {
    const nextSection = document.querySelector("section:not(:first-of-type)")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen w-screen flex items-center justify-center bg-[#ECEBE8] text-black overflow-hidden">
      {/* Testo principale */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-serif text-black leading-tight">
          Exclusive club
          <br />
          in Zurich
        </h1>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={handleScrollDown}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer bg-transparent border-none p-0"
        type="button"
      >
        <Letter3DSwap
          mainClassName="text-sm uppercase tracking-wider text-black/60 hover:text-black transition-colors duration-300 font-sans inline-block"
          frontFaceClassName="text-black/60 hover:text-black"
          secondFaceClassName="text-black/60 hover:text-black"
          rotateDirection="top"
          staggerDuration={0.03}
          staggerFrom="first"
          transition={{ type: "spring", damping: 25, stiffness: 160 }}
          as="span"
        >
          scroll down
        </Letter3DSwap>
      </button>

      {/* Image Trail */}
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
    </section>
  )
}
