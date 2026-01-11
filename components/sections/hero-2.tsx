"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function Hero2() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Aggiungi classe al body per indicare che siamo sulla homepage-2
    document.body.setAttribute('data-hero-2', 'true')
    
    // Usa GSAP ScrollTrigger pin invece di CSS sticky - funziona meglio con Lenis
    if (!wrapperRef.current || !heroRef.current) return

    const ctx = gsap.context(() => {
      // Calcola l'altezza del contenuto che segue per determinare la durata del pin
      const contentSection = document.querySelector('[data-content-section]')
      const contentHeight = contentSection ? contentSection.getBoundingClientRect().height : window.innerHeight * 2
      
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${contentHeight}`,
        pin: heroRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })
    }, wrapperRef)

    return () => {
      ctx.revert()
      document.body.removeAttribute('data-hero-2')
    }
  }, [])

  return (
    <div ref={wrapperRef} className="sticky-hero-wrapper">
      <section 
        ref={heroRef}
        className="sticky-hero"
        data-hero-section
      >
        {/* Immagine di sfondo */}
        <div className="sticky-hero__background">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          
          {/* Overlay gradient */}
          <div className="sticky-hero__overlay" />
        </div>

        {/* Contenuto */}
        <div className="sticky-hero__content">
          <div className="sticky-hero__container">
            {/* Sottotitolo */}
            <p className="sticky-hero__eyebrow">
              A high-flying idea.
            </p>

            {/* Titolo */}
            <h1 className="sticky-hero__title">
              Exclusive club
              <br />
              in Zurich
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}
