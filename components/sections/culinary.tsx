"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function Culinary() {
  const imageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const menuSections = [
    { label: "Menu Lunch", href: "https://www.haute.ch/download/HAUTE-Speisekarte-Lunch.pdf", image: "/Asset/Culinary/menu-lunch.jpg" },
    { label: "Menu Dinner", href: "https://www.haute.ch/download/HAUTE-Speisekarte-Dinner.pdf", image: "/Asset/Culinary/menu-dinner.jpg" },
    { label: "Wine List", href: "https://www.haute.ch/download/HAUTE-Weinkarte.pdf", image: "/Asset/Culinary/wine-list.jpg" },
    { label: "Bar Menu", href: "https://www.haute.ch/download/Barkarte%20HAUTE.pdf", image: "/Asset/Culinary/bar-menu.jpg" },
  ]

  const sustainabilityPoints = [
    {
      number: "01",
      text: "The production of food accounts for around a third of global environmental pollution. Anyone who, like us, lives to create culinary delights according to all the rules of the art must also take care of the sustainability of their work and actions.",
    },
    {
      number: "02",
      text: "We are Swisstainable. We are part of the Swisstainable sustainability program and are classified as Level I – committed. The Swisstainable sustainability programme brings together businesses and organizations across the entire Swiss tourism sector.",
    },
    {
      number: "03",
      text: "We have recorded and published the accessibility information for the HAUTE for the OK:GO initiative. This helps people with limited mobility to plan their own journey to our location.",
    },
    {
      number: "04",
      text: "We are also committed to small producers and certified products from Fairtrade Max Havelaar – for the sake of the environment and all of us.",
    },
  ]

  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return

    const image = imageRef.current
    const section = sectionRef.current

    // Dimensioni iniziali fisse - aumentate per renderla più larga
    const INITIAL_WIDTH = 650
    const INITIAL_HEIGHT = Math.round(650 * (374 / 560)) // Mantiene l'aspect ratio originale
    const ASPECT_RATIO = INITIAL_HEIGHT / INITIAL_WIDTH

    // Funzione per calcolare le dimensioni finali
    const getFinalDimensions = () => {
      // Trova il container parent (div.container mx-auto)
      const container = image.closest('.container')
      if (!container) {
        // Fallback: usa viewport meno un piccolo padding
        const containerPadding = 16 * 2 // 16px per lato per sicurezza
        const finalWidth = window.innerWidth - containerPadding
        const finalHeight = finalWidth * ASPECT_RATIO
        return { width: finalWidth, height: finalHeight }
      }

      // Calcola la larghezza disponibile nel container
      // Il container ha mx-auto che crea la stessa larghezza dell'header
      // L'immagine può espandersi fino alla larghezza completa del container
      const containerRect = container.getBoundingClientRect()
      const finalWidth = containerRect.width
      const finalHeight = finalWidth * ASPECT_RATIO
      
      return { width: finalWidth, height: finalHeight }
    }

    // Imposta le dimensioni iniziali esplicitamente
    gsap.set(image, {
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
    })

    // Crea l'animazione con ScrollTrigger
    const ctx = gsap.context(() => {
      const finalDims = getFinalDimensions()

      // Animazione della larghezza e altezza mantenendo l'aspect ratio
      gsap.fromTo(
        image,
        {
          width: INITIAL_WIDTH,
          height: INITIAL_HEIGHT,
        },
        {
          width: finalDims.width,
          height: finalDims.height,
          scrollTrigger: {
            trigger: image,
            start: "top 80%", // Inizia quando l'immagine entra nella viewport
            end: "bottom 30%", // Finisce quando l'immagine è al 30% della viewport
            scrub: 1.2, // Smooth scroll con 1.2s di lag per fluidità
            invalidateOnRefresh: true, // Ricalcola su resize
            markers: false, // Set to true per debug
          },
          ease: "power1.out",
        }
      )
    }, section)

    // Gestisci il resize della finestra
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      ctx.revert()
      window.removeEventListener("resize", handleResize)
      // Reset alle dimensioni originali
      gsap.set(image, {
        width: INITIAL_WIDTH,
        height: INITIAL_HEIGHT,
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-48">
        <div className="max-w-6xl mx-auto text-center mb-32">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            HAUTE. Creative.
            <br />
            Honest. Sustainable.
          </h1>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
            <p className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Amidst its unique location, the cuisine at HAUTE delights with fresh perspectives and creative indulgence. We treat our members and their guests to exquisite European cuisine – seasonal, carefully selected, and focused on sustainable ingredients.
            </p>
            <p className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Our wine list offers the perfect choice for every mood and moment. Whether it&apos;s a business lunch, a refreshing cocktail at sunset on the terrace, a light after-work meal, or a festive dinner by the crackling fireplace – dining at HAUTE is pure joy.
            </p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 mb-48">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start w-full mb-24">
          {menuSections.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-4 flex-1 w-full group"
            >
              <div 
                className="w-full relative overflow-hidden"
                style={{
                  aspectRatio: '315 / 353',
                }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
              <p className="text-[18px] leading-[1.5] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] uppercase">
                <span className="inline-block">
                  [
                  <span className="inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4">
                    {item.label}
                  </span>
                  ]
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recognized for Excellence Section */}
      <div className="container mx-auto mb-48">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-serif mb-16 text-black">
            Recognized for excellence!
          </h2>
        </div>
        <div className="flex justify-center">
          <div 
            ref={imageRef}
            className="h-[434px] w-[650px] relative overflow-hidden"
            style={{ 
              willChange: "width, height",
              transformOrigin: "center center",
              backgroundImage: "url(/Asset/Culinary/Recognized-for-excellence.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>

      {/* Sustainability Points */}
      <div className="container mx-auto px-4 mb-48 mt-48">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-20 md:gap-28 lg:gap-36 mb-16">
            {sustainabilityPoints.map((point, index) => {
              // Calcola offset progressivo più marcato
              const offsets = [180, 320, 500, 720] // Valori in px per 01, 02, 03, 04 (spostati ancora più a destra)
              const marginLeft = offsets[index] || 0
              
              return (
              <div 
                key={index} 
                className="flex flex-col gap-4 max-w-[443px]"
                style={{
                  marginLeft: `${marginLeft}px`,
                }}
              >
                <p className="text-[22px] leading-[1.5] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] mb-2">
                  {point.number}
                </p>
                <p className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
                  {point.text}
                </p>
              </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Logos and Final Statement */}
      <div className="container mx-auto px-4 mb-48">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 md:gap-12">
          {/* Logos */}
          <div className="flex items-center justify-center gap-8">
            <Image 
              src="/Asset/Culinary/Swisstainable.png" 
              alt="Swisstainable" 
              width={70} 
              height={70} 
              className="shrink-0"
            />
            <Image 
              src="/Asset/Culinary/Okgo.png" 
              alt="OK:GO" 
              width={64} 
              height={70} 
              className="shrink-0"
            />
          </div>

          {/* Final Statement */}
          <p 
            className="text-4xl md:text-5xl lg:text-[52px] font-serif text-black/70 text-center max-w-5xl"
            style={{ lineHeight: '1.5' }}
          >
            This <span className="italic text-black">motivates</span> us to teach our customers and guests how to use resources sparingly and to make a joint <span className="italic text-black">contribution</span> to a better world. Because as a host, HAUTE wants to give only the <span className="italic text-black">best</span>, always and everywhere!
          </p>

          {/* Online Reservations CTA */}
          <CTAButton href="/reservation">
            Online Reservations
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

