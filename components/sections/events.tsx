"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import Link from "next/link"

export function Events() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const containers = containerRefs.current.filter(Boolean) as HTMLElement[]
    const wrappers = wrapperRefs.current.filter(Boolean) as HTMLElement[]
    const labels = labelRefs.current.filter(Boolean) as HTMLElement[]
    
    // Set initial flex-basis to equal (25% each) on wrappers
    wrappers.forEach((wrapper) => {
      gsap.set(wrapper, {
        flexBasis: "25%",
      })
    })
    
    containers.forEach((container, index) => {
      const handleMouseEnter = () => {
        const wrapper = wrappers[index]
        
        // Expand hovered wrapper
        if (wrapper) {
          gsap.to(wrapper, {
            flexBasis: "50%",
            duration: 0.7,
            ease: "power1.out",
          })
        }
        
        // Shrink other wrappers
        wrappers.forEach((otherWrapper, otherIndex) => {
          if (otherIndex !== index && otherWrapper) {
            gsap.to(otherWrapper, {
              flexBasis: "16.66%",
              duration: 0.7,
              ease: "power1.out",
            })
          }
        })
        
        // Fade and desaturate other images
        containers.forEach((otherContainer, otherIndex) => {
          if (otherIndex !== index && otherContainer) {
            gsap.to(otherContainer, {
              opacity: 0.5,
              filter: "grayscale(100%) brightness(0.8)",
              duration: 0.7,
              ease: "power1.out",
            })
          }
        })
        
        // Lower opacity of other labels
        labels.forEach((label, labelIndex) => {
          if (labelIndex !== index && label) {
            gsap.to(label, {
              opacity: 0.3,
              duration: 0.5,
              ease: "power1.out",
            })
          }
        })
      }

      const handleMouseLeave = () => {
        // Reset all wrappers to equal width
        wrappers.forEach((wrapper) => {
          if (wrapper) {
            gsap.to(wrapper, {
              flexBasis: "25%",
              duration: 0.7,
              ease: "power1.out",
            })
          }
        })
        
        // Reset all images opacity and filters
        containers.forEach((container) => {
          if (container) {
            gsap.to(container, {
              opacity: 1,
              filter: "grayscale(0%) brightness(1)",
              duration: 0.7,
              ease: "power1.out",
            })
          }
        })
        
        // Reset all labels opacity
        labels.forEach((label) => {
          if (label) {
            gsap.to(label, {
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
            })
          }
        })
      }

      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    })
  }, [])

  return (
    <section className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4 mb-32">
        <div className="max-w-6xl mx-auto text-center mb-32">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            Events at HAUTE
            <br />
            Festive. Joyful. Fascinating.
          </h1>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Events at HAUTE deserve a stage that leaves a lasting impression. HAUTE can be booked exclusively for private or corporate events, offering spectacular views, personalized service, and everything you need.
            </p>
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              From an aperitif on the glass-enclosed terrace to a party with a DJ above the rooftops of Zurich – we craft each occasion individually, stylishly, and with a keen sense for the extraordinary.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-[22px] items-start w-full">
          {[
            { label: "Finger food", image: "/Asset/Events/Apero-Haeppchen.png", href: "/events/finger-food" },
            { label: "Banquet", image: "/Asset/Events/Kulinarik-1.png", href: "/events/banquet" },
            { label: "Uetliberg exclusive", image: "/Asset/Events/Uetliberg-exklusiv.png", href: "/events/uetliberg-exclusive" },
            { label: "Private events", image: "/Asset/Events/Haute_Exklusiv-570x570-1.jpg", href: "/events/private-events" }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              ref={(el) => {
                wrapperRefs.current[index] = el
              }}
              className="flex flex-col gap-[22px] flex-1"
            >
              <div
                ref={(el) => {
                  containerRefs.current[index] = el
                }}
                className="h-[414px] cursor-pointer relative overflow-hidden"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transform: 'scale(1)',
                  transition: 'none',
                  opacity: 1,
                  filter: 'grayscale(0%) brightness(1)',
                }}
              />
              <p
                ref={(el) => {
                  labelRefs.current[index] = el
                }}
                className="text-[16px] leading-[1.2] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] uppercase"
              >
                [ {item.label.toUpperCase()} ]
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
