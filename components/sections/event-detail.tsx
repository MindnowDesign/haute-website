"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { CTAButton } from "@/components/ui/cta-button"

const events = [
  { label: "Finger food", image: "/Asset/Events/finger-food.jpg", href: "/events/finger-food", slug: "finger-food" },
  { label: "Banquet", image: "/Asset/Events/banquet.jpg", href: "/events/banquet", slug: "banquet" },
  { label: "Uetliberg exclusive", image: "/Asset/Events/exclusive.jpg", href: "/events/uetliberg-exclusive", slug: "uetliberg-exclusive" },
  { label: "Private events", image: "/Asset/Events/private.jpg", href: "/events/private-events", slug: "private-events" }
]

interface EventDetailProps {
  title: string
  paragraph1: string
  paragraph2: string
  currentEventSlug?: string
}

export function EventDetail({ title, paragraph1, paragraph2, currentEventSlug }: EventDetailProps) {
  const heroImageRef = useRef<HTMLDivElement>(null)
  const parallaxImage1Ref = useRef<HTMLDivElement>(null)
  const parallaxImage2Ref = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Map event slugs to image names
  const getEventImages = (slug?: string) => {
    const imageMap: Record<string, { hero: string; parallax1: string; parallax2: string }> = {
      'finger-food': {
        hero: '/Asset/Events/Detail/Finger_Food-img-01.jpg',
        parallax1: '/Asset/Events/Detail/Finger_Food-img-02.jpg',
        parallax2: '/Asset/Events/Detail/Finger_Food-img-03.jpg',
      },
      'banquet': {
        hero: '/Asset/Events/Detail/Banquet-img-01.jpg',
        parallax1: '/Asset/Events/Detail/Banquet-img-02.jpg',
        parallax2: '/Asset/Events/Detail/Banquet-img-03.jpg',
      },
      'uetliberg-exclusive': {
        hero: '/Asset/Events/Detail/Exclusive-img-01.jpg',
        parallax1: '/Asset/Events/Detail/Exclusive-img-02.jpg',
        parallax2: '/Asset/Events/Detail/Exclusive-img-03.jpg',
      },
      'private-events': {
        hero: '/Asset/Events/Detail/Private-img-01.jpg',
        parallax1: '/Asset/Events/Detail/Private-img-02.jpg',
        parallax2: '/Asset/Events/Detail/Private-img-03.jpg',
      },
    }
    return imageMap[slug || ''] || {
      hero: '/Asset/Events/Detail/Finger_Food-img-01.jpg',
      parallax1: '/Asset/Events/Detail/Finger_Food-img-02.jpg',
      parallax2: '/Asset/Events/Detail/Finger_Food-img-03.jpg',
    }
  }

  const images = getEventImages(currentEventSlug)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Parallax effect per l'hero image (interno al div dell'immagine)
      if (heroImageRef.current) {
        const imageContainer = heroImageRef.current
        const container = imageContainer.parentElement
        if (container) {
          const containerHeight = container.offsetHeight
          // Movimento massimo: 6% dell'altezza del container
          const maxMovement = containerHeight * 0.06
          
          gsap.fromTo(
            imageContainer,
            {
              y: 0,
            },
            {
              y: -maxMovement,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        }
      }

      // Parallax effect per la prima immagine (interno al div dell'immagine) - movimento più prominente
      // L'immagine è 115% più grande, quindi può muoversi senza mostrare bordi vuoti
      if (parallaxImage1Ref.current) {
        const imageContainer = parallaxImage1Ref.current
        const container = imageContainer.parentElement
        if (container) {
          const containerHeight = container.offsetHeight
          // Movimento massimo: 8% dell'altezza del container per un effetto più visibile
          const maxMovement = containerHeight * 0.08
          
          gsap.fromTo(
            imageContainer,
            {
              y: 0,
            },
            {
              y: -maxMovement,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        }
      }

      // Parallax effect per la seconda immagine (interno al div dell'immagine) - movimento più prominente
      if (parallaxImage2Ref.current) {
        const imageContainer = parallaxImage2Ref.current
        const container = imageContainer.parentElement
        if (container) {
          const containerHeight = container.offsetHeight
          // Movimento massimo: 10% dell'altezza del container per un effetto più visibile e diverso
          const maxMovement = containerHeight * 0.10
          
          gsap.fromTo(
            imageContainer,
            {
              y: 0,
            },
            {
              y: -maxMovement,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            {title}
          </h1>
        </div>

        {/* Hero Image and Paragraphs together */}
        <div className="mb-48">
          {/* Hero Image - aspect ratio 1145:545 */}
          <div 
            className="w-full bg-gray-400 relative overflow-hidden mb-12"
            style={{
              aspectRatio: '1145 / 545',
            }}
          >
            <div
              ref={heroImageRef}
              className="absolute inset-0 bg-gray-400"
              style={{
                backgroundImage: `url(${images.hero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '110%',
                top: '-5%',
              }}
            />
          </div>

          {/* Two Paragraphs */}
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
              <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
                {paragraph1}
              </p>
              <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
                {paragraph2}
              </p>
            </div>
          </div>
        </div>

        {/* Parallax Images - stacked, first left, second right */}
        <div className="container mx-auto px-4 mb-48">
          <div className="flex flex-col gap-32">
            {/* First Parallax Image - left aligned, 740x605 */}
            <div className="w-full md:w-[740px] relative overflow-hidden">
              <div 
                className="w-full bg-gray-400 relative overflow-hidden"
                style={{
                  aspectRatio: '740 / 605',
                }}
              >
                <div
                  ref={parallaxImage1Ref}
                  className="absolute inset-0 bg-gray-400"
                  style={{
                    backgroundImage: `url(${images.parallax1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '115%',
                    top: '-7.5%',
                  }}
                />
              </div>
            </div>

            {/* Second Parallax Image - right aligned, 740x785 */}
            <div className="w-full md:w-[740px] md:ml-auto relative overflow-hidden">
              <div 
                className="w-full bg-gray-400 relative overflow-hidden"
                style={{
                  aspectRatio: '740 / 785',
                }}
              >
                <div
                  ref={parallaxImage2Ref}
                  className="absolute inset-0 bg-gray-400"
                  style={{
                    backgroundImage: `url(${images.parallax2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '115%',
                    top: '-7.5%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Next Event Button */}
          {(() => {
            const currentIndex = currentEventSlug 
              ? events.findIndex(e => e.slug === currentEventSlug)
              : -1
            const nextEvent = currentIndex >= 0 && currentIndex < events.length - 1
              ? events[currentIndex + 1]
              : currentIndex === events.length - 1
              ? events[0]
              : null

            if (!nextEvent) return null

            return (
              <div className="flex justify-center mt-16">
                <CTAButton href={nextEvent.href}>
                  View Next Event
                </CTAButton>
              </div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

