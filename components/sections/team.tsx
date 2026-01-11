"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "@/lib/gsap"

interface TeamMember {
  name: string
  roles: string[]
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Thomas Widmer",
    roles: ["CEO & Co-Owner GAMMA Group", "Managing Partner HAUTE"],
    image: "/Asset/Team/Thomas-1-600x400-1.jpg"
  },
  {
    name: "Alexandra Glossidis",
    roles: ["Head of administration", "Member of the Executive Board"],
    image: "/Asset/Team/Alexandra-Glossidis.jpg"
  },
  {
    name: "Max Blume",
    roles: ["Head of Restaurant", "Member of the Executive Board"],
    image: "/Asset/Team/Max-Blume-1.jpg"
  },
  {
    name: "Stefan Pühringer",
    roles: ["Head Chef"],
    image: "/Asset/Team/Stefan-1-600x400-1.jpg"
  },
  {
    name: "Ray Höhener",
    roles: ["Customer Relations"],
    image: "/Asset/Team/Ray-Dinkelmann2.jpg"
  },
  {
    name: "Sabrina Janser",
    roles: ["Assistant Head of Restaurant", "Wine Supervisor"],
    image: "/Asset/Team/Sabrina-Janser.jpg"
  },
  {
    name: "Niclas Ohrmann",
    roles: ["Sous Chef"],
    image: "/Asset/Team/Niclas-Ohrmann.jpg"
  },
  {
    name: "Oliver Dombrowski",
    roles: ["Customer Relations"],
    image: "/Asset/Team/Oliver-Dombrowski.jpg"
  },
  {
    name: "Ali Zulfikar",
    roles: ["Office Staff"],
    image: "/Asset/Team/Ali-600x400-1.jpg"
  },
  {
    name: "Niyat Mengs",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Niyat-Mengs.jpg"
  },
  {
    name: "Mohammad Mosharuf Hossain",
    roles: ["Chef / Allrounder"],
    image: "/Asset/Team/Musharruf-600x400-1.jpg"
  },
  {
    name: "Julian Strimmer",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Julian-Strimmer-1.jpg"
  },
  {
    name: "Monir Bhuiyan",
    roles: ["Office Staff"],
    image: "/Asset/Team/Monir-600x400-1.jpg"
  },
  {
    name: "Lorena Folie",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Lorena-Folie.jpg"
  },
  {
    name: "Kadishe Schnellmann",
    roles: ["Junior Sous Chef"],
    image: "/Asset/Team/Kadishe-Schnellmann.jpg"
  },
  {
    name: "Michael Weigand",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/Michael-Weigand.jpg"
  },
  {
    name: "Andrzej Kulig",
    roles: ["Buffet Staff"],
    image: "/Asset/Team/Andrzej-Kulig-1.jpg"
  },
  {
    name: "Dominik Vogl",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/Dominik-Vogl-1.jpg"
  },
  {
    name: "Sarra Luginbühl",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Sarra-Luginbuehl_2-1.jpg"
  },
  {
    name: "Valentino Savarese",
    roles: ["Apprentice"],
    image: "/Asset/Team/Valentino-Savarese-1.jpg"
  },
  {
    name: "Lucas Becker",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/platzhalter.jpg"
  },
  {
    name: "Leonardo Villa Medrano",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/platzhalter.jpg"
  },
  {
    name: "Luca Iuliano",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/platzhalter.jpg"
  },
  {
    name: "José Imhof",
    roles: ["Buffet Staff"],
    image: "/Asset/Team/platzhalter.jpg"
  }
]

export function Team() {
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current || typeof window === 'undefined') return

    const grid = gridRef.current
    const section = sectionRef.current
    const items = Array.from(grid.querySelectorAll<HTMLElement>('.team-member-item'))

    if (items.length === 0) return

    // Numero di colonne (3 su desktop)
    const columnCount = 3

    // Raggruppa gli item in colonne
    const columns: HTMLElement[][] = Array.from({ length: columnCount }, () => [])

    items.forEach((item, index) => {
      const columnIndex = index % columnCount
      columns[columnIndex].push(item)
    })

    // Stato per tracciare lo scroll
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout | null = null
    const currentPositions = new Map<HTMLElement, number>()
    const targetPositions = new Map<HTMLElement, number>()

    // Inizializza le posizioni
    items.forEach(item => {
      currentPositions.set(item, 0)
      targetPositions.set(item, 0)
    })

    // Funzione di lerp (interpolazione)
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    // Funzione per aggiornare le posizioni target basate sulla velocità dello scroll
    const updateTargetPositions = (velocity: number) => {
      const scrollDirection = velocity > 0 ? 1 : -1
      const velocityMagnitude = Math.abs(velocity)
      const maxVelocity = 15
      const normalizedVelocity = Math.min(velocityMagnitude / maxVelocity, 1)
      // Easing per movimento più naturale
      const easedVelocity = normalizedVelocity * normalizedVelocity

      columns.forEach((column, columnIndex) => {
        const centerColumn = (columnCount - 1) / 2
        const distanceFromCenter = Math.abs(columnIndex - centerColumn)
        
        // Movimento subtle: 35px come via di mezzo
        const movementAmount = distanceFromCenter * 35 * easedVelocity
        const targetY = -scrollDirection * movementAmount

        column.forEach((item) => {
          targetPositions.set(item, targetY)
        })
      })
    }

    // Funzione di animazione con lag differenziato
    const animate = () => {
      items.forEach((item) => {
        const currentY = currentPositions.get(item) || 0
        const targetY = targetPositions.get(item) || 0
        
        const columnIndex = items.indexOf(item) % columnCount
        const centerColumn = (columnCount - 1) / 2
        const distanceFromCenter = Math.abs(columnIndex - centerColumn)
        
        // Lag più smooth e subtle
        const baseLagFactor = 0.08 + (distanceFromCenter * 0.05)
        const isReturningToZero = Math.abs(targetY) < 0.1 && Math.abs(currentY) > 0.1
        const lagFactor = isReturningToZero 
          ? baseLagFactor * 0.6
          : baseLagFactor
        
        // Interpola con lag
        const newY = lerp(currentY, targetY, lagFactor)
        currentPositions.set(item, newY)
        
        // Applica la trasformazione
        gsap.set(item, { y: newY })
      })

      requestAnimationFrame(animate)
    }

    // Gestore scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollVelocity = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Controlla se siamo nella sezione
      const rect = section.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0

      if (isInViewport && Math.abs(scrollVelocity) > 0.3) {
        isScrolling = true
        updateTargetPositions(scrollVelocity)

        // Reset il timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }

        // Quando lo scroll si ferma, torna alla posizione originale
        scrollTimeout = setTimeout(() => {
          isScrolling = false
          items.forEach(item => {
            targetPositions.set(item, 0)
          })
        }, 250)
      } else if (!isScrolling) {
        // Se non stiamo scrollando, torna a 0
        items.forEach(item => {
          targetPositions.set(item, 0)
        })
      }
    }

    // Inizia l'animazione
    animate()

    // Aggiungi listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      // Cleanup
      window.removeEventListener('scroll', handleScroll)
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Reset trasformazioni
      items.forEach(item => {
        gsap.set(item, { y: 0 })
      })
      
      currentPositions.clear()
      targetPositions.clear()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4 mb-32">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto text-center mb-40">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            HAUTE. Warm.
            <br />
            Genuine. Passionate.
          </h1>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Our team accompanies you with attentive and personal service – always one step ahead, so you can enjoy every moment without distraction. We create the perfect setting for relaxed conversations and delightful moments, ensuring with a fine sense of care that you feel at home at all times.
            </p>
            <div className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              <p className="mb-0">
                True hospitality reveals itself when it goes unnoticed yet leaves a lasting impression. That&apos;s why we do everything to make you feel not only welcome but truly understood.
              </p>
              <p>
                Your experience is always at the center – hospitality that connects: personal, effortless, and full of passion.
              </p>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="w-full">
          <div ref={gridRef} className="flex flex-col gap-24 mb-64">
            {/* Group team members into rows of 3 */}
            {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, rowIndex) => {
              const rowMembers = teamMembers.slice(rowIndex * 3, (rowIndex + 1) * 3)
              return (
                <div key={rowIndex} className="flex flex-col md:flex-row items-start md:justify-between gap-8 md:gap-10">
                  {rowMembers.map((member, memberIndex) => (
                    <div key={memberIndex} className="team-member-item flex gap-8 items-end flex-1 md:max-w-[33.333%]">
                      {/* Team member image */}
                      <div className="relative shrink-0 w-[115px] h-[115px] rounded-sm overflow-hidden">
                        <Image 
                          src={member.image || "/Asset/Team/platzhalter.jpg"} 
                          alt={member.name}
                          width={115}
                          height={115}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-[13px] items-start flex-1 min-w-0 max-w-[280px]">
                        <p className="text-[16px] leading-[1.2] text-black uppercase font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
                          {member.name}
                        </p>
                        <div className="flex flex-col gap-[2px] items-start">
                          {member.roles.map((role, roleIndex) => (
                            <p 
                              key={roleIndex}
                              className="text-[14px] leading-[1.2] text-black/40 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]"
                            >
                              {role}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Fill empty slots in last row if needed */}
                  {rowMembers.length < 3 && Array.from({ length: 3 - rowMembers.length }).map((_, emptyIndex) => (
                    <div key={`empty-${emptyIndex}`} className="hidden md:block flex-1" />
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-24 md:gap-[98px] items-start mt-64 mb-32">
        {/* Left side - Title and CTA */}
        <div className="flex flex-col gap-12 flex-1">
          <h2 className="text-[76px] leading-tight font-serif text-black">
            Want to join us?{" "}
            <span className="italic">Passionate</span>. Dedicated.
          </h2>
          <a
            href="https://gammagruppe.ch/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[20px] leading-[1.5] uppercase text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] cursor-pointer transition-opacity duration-300 ease-out hover:opacity-60 group"
          >
            <span className="inline-block">
              [
              <span className="inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4">
                View Jobs
              </span>
              ]
            </span>
          </a>
        </div>

        {/* Right side - Description paragraphs */}
        <div className="flex flex-col gap-12 flex-1">
          <p className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
            We are always looking for motivated individuals who share our passion for excellence and hospitality. Whether you&apos;re an experienced chef, service professional, or looking to start your career in the culinary world, we offer opportunities to grow and excel in a dynamic, supportive environment.
          </p>
          <p className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
            Join a team that values dedication, creativity, and the art of creating memorable experiences. At HAUTE, you&apos;ll work alongside talented professionals in an atmosphere that encourages both personal and professional development.
          </p>
        </div>
      </div>
    </section>
  )
}

