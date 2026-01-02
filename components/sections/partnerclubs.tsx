"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

// Partner clubs data from haute.ch
const partnerClubs = [
  { 
    name: "Club zur Geduld", 
    location: "Winterthur, Switzerland",
    image: "/Asset/Partnerclubs/Haute_ClubzurGeduld_Winterthur-600x600-1.jpg",
    link: "http://www.zurgeduld.ch/public/club_zur_geduld/club_zur_geduld"
  },
  { 
    name: "Club de Bâle", 
    location: "Basel, Switzerland",
    image: "/Asset/Partnerclubs/Haute_ClubdeBale-600x600-1.jpg",
    link: "https://clubdebale.ch/"
  },
  { 
    name: "Airport Club", 
    location: "Frankfurt, Germany",
    image: "/Asset/Partnerclubs/Haute_AurportClub_Frankfurt-600x600-1.jpg",
    link: "http://www.airportclub.de/"
  },
  { 
    name: "Business Club", 
    location: "Hamburg, Germany",
    image: "/Asset/Partnerclubs/Haute_BusinessClubHamburg-600x600-1.jpg",
    link: "http://www.bch.de/"
  },
  { 
    name: "Drivers & Business Club", 
    location: "Munich, Germany",
    image: "/Asset/Partnerclubs/Drivers-Club.png",
    link: "https://www.driversclub.biz/de"
  },
  { 
    name: "Wirtschaftsclub", 
    location: "Düsseldorf, Germany",
    image: "/Asset/Partnerclubs/Haute_Wirtschaftsclub_Duesseldorf-600x600-1.jpg",
    link: "http://www.wirtschaftsclubduesseldorf.de/"
  },
  { 
    name: "Havanna Lounge", 
    location: "Bremen, Germany",
    image: "/Asset/Partnerclubs/Haute_HavannaLounge_Bremen-600x600-1.jpg",
    link: "http://www.havannalounge.de/"
  },
  { 
    name: "Rotonda Business-Club", 
    location: "Köln, Germany",
    image: "/Asset/Partnerclubs/Haute_RotondaBusiness-Club_Koeln-600x600-1.jpg",
    link: "http://www.rotonda.de/"
  },
  { 
    name: "Kitzbühel Country Club", 
    location: "Kitzbühel, Austria",
    image: "/Asset/Partnerclubs/Haute_KitzbuehelCountryClub_Kitzbuehel-600x600-1.jpg",
    link: "https://www.kitzbuehel.cc/"
  },
  { 
    name: "Am Hof 8", 
    location: "Vienna, Austria",
    image: "/Asset/Partnerclubs/Unbenannt-e1719922549248.jpg",
    link: "https://amhof8.com/"
  },
  { 
    name: "Saint James Club", 
    location: "Paris, France",
    image: "/Asset/Partnerclubs/Haute_SaintJamesClub_Paris-600x600-1.jpg",
    link: "http://www.saintjamesclub.com/"
  },
  { 
    name: "National Liberal Club", 
    location: "London, England",
    image: "/Asset/Partnerclubs/Haute_NationalLiberalClub_London-600x600-1.jpg",
    link: "http://www.nlc.org.uk/"
  },
  { 
    name: "Kjarval", 
    location: "Reykjavik, Island",
    image: "/Asset/Partnerclubs/Kjarval.jpg",
    link: "https://www.kjarval.com/"
  },
  { 
    name: "Capital Club", 
    location: "Dubai",
    image: "/Asset/Partnerclubs/Haute_CapitalClub_Dubai-600x600-1.jpg",
    link: "https://capitalclubdubai.com/"
  },
  { 
    name: "Capital Club", 
    location: "Nairobi, Kenia",
    image: "/Asset/Partnerclubs/Haute_CapitalClub_Nairobi-600x600-1.jpg",
    link: "http://www.capitalclubea.com/"
  },
  { 
    name: "Tower Club", 
    location: "Singapore",
    image: "/Asset/Partnerclubs/Haute_Towerlub_Singapore-600x600-1.jpg",
    link: "http://www.tower-club.com.sg/"
  },
  { 
    name: "Candela Nuevo", 
    location: "Melbourne, Australia",
    image: "/Asset/Partnerclubs/Haute_CandelaNuevo_Melbourne-600x600-1.jpg",
    link: "http://www.candelanuevo.com.au/"
  },
  { 
    name: "The Forest and Stream Club", 
    location: "Quebec, Canada",
    image: "/Asset/Partnerclubs/Forrest-and-Stream-e1719922523470.jpg",
    link: "https://forestandstream.ca/"
  },
]

export function Partnerclubs() {
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current || typeof window === 'undefined') return

    const grid = gridRef.current
    const section = sectionRef.current
    const items = Array.from(grid.querySelectorAll<HTMLElement>('.grid__item'))

    if (items.length === 0) return

    // Numero di colonne (5 su desktop)
    const columnCount = 5

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
      const maxVelocity = 15 // Velocità massima considerata (aumentata per movimento più smooth)
      const normalizedVelocity = Math.min(velocityMagnitude / maxVelocity, 1)
      // Applica un easing per movimento più naturale
      const easedVelocity = normalizedVelocity * normalizedVelocity // Ease out

      columns.forEach((column, columnIndex) => {
        const centerColumn = (columnCount - 1) / 2
        const distanceFromCenter = Math.abs(columnIndex - centerColumn)
        
        // Le colonne centrali non si muovono, quelle esterne si muovono di più (ancora più accentuato)
        const movementAmount = distanceFromCenter * 55 * easedVelocity // Da 0 a ~110px (ancora più accentuato)
        const targetY = -scrollDirection * movementAmount // Invertito: scroll verso il basso = movimento verso l'alto

        column.forEach((item) => {
          targetPositions.set(item, targetY)
        })
      })
    }

    // Crea una mappa per associare ogni item alla sua colonna effettiva
    // Questo è importante per gli ultimi 3 item che sono centrati (colonne 2, 3, 4)
    const itemToColumnMap = new Map<HTMLElement, number>()
    items.forEach((item, index) => {
      // Controlla se è uno degli ultimi 3 item
      const isLastThree = index >= items.length - 3
      if (isLastThree) {
        // Gli ultimi 3 item sono nelle colonne 2, 3, 4
        const positionInLastThree = index - (items.length - 3)
        const actualColumn = 2 + positionInLastThree // 2, 3, 4
        itemToColumnMap.set(item, actualColumn)
      } else {
        // Per gli altri item, usa la colonna normale
        const columnIndex = index % columnCount
        itemToColumnMap.set(item, columnIndex)
      }
    })

    // Funzione di animazione con lag differenziato
    const animate = () => {
      items.forEach((item) => {
        const currentY = currentPositions.get(item) || 0
        const targetY = targetPositions.get(item) || 0
        
        // Usa la colonna effettiva dalla mappa
        const columnIndex = itemToColumnMap.get(item) ?? (items.indexOf(item) % columnCount)
        const centerColumn = (columnCount - 1) / 2
        const distanceFromCenter = Math.abs(columnIndex - centerColumn)
        
        // Lag: colonne centrali seguono subito, quelle esterne hanno più lag (ancora più accentuato)
        // Quando tornano a 0, usa un lag più smooth per transizione più fluida
        const baseLagFactor = 0.05 + (distanceFromCenter * 0.1) // Da 0.05 a 0.45
        const isReturningToZero = Math.abs(targetY) < 0.1 && Math.abs(currentY) > 0.1
        // Quando tornano a 0, riduci il lag factor per movimento più smooth e lento
        const lagFactor = isReturningToZero 
          ? baseLagFactor * 0.5 // Lag più smooth quando tornano a 0 (50% del normale = più lento e fluido)
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

        // Quando lo scroll si ferma, torna alla posizione originale (più tempo per transizione smooth)
        scrollTimeout = setTimeout(() => {
          isScrolling = false
          items.forEach(item => {
            targetPositions.set(item, 0)
          })
        }, 250) // 250ms dopo l'ultimo scroll (più tempo per transizione smooth)
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
        <div className="max-w-6xl mx-auto text-center mb-32">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            <span className="italic">HAUTE</span> partner clubs. Collaborative. <span className="italic">Connected</span>. Global.
          </h1>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              With a HAUTE membership, exclusivity doesn't stop at the city limits. Our partnerships with select member clubs around the globe grant you stylish access to exceptional places worldwide, from Dubai to Hong Kong, from London to Melbourne.
            </p>
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              As a HAUTE member, you are part of an international network built on trust, quality, and hospitality. We personally coordinate your reservations Telephone +41 43 344 72 71 oder <a href="mailto:welcome@haute.ch" className="text-black hover:underline">welcome@haute.ch</a> and ensure that even far from Zurich, you are welcomed like a familiar face.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Container with Elastic Grid Scroll Effect */}
      <div className="container mx-auto px-4">
        <div 
          ref={gridRef}
          className="partnerclubs-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-20"
          style={{
            '--column-count': '5',
            '--column-size': 'minmax(0, 1fr)',
            '--c-gap': '4rem',
            '--r-gap': '5rem',
          } as React.CSSProperties}
        >
        {partnerClubs.map((club, index) => {
          // Centra gli ultimi 3 item (18 totali, quindi indici 15, 16, 17)
          // Per centrare 3 item in una griglia a 5 colonne, li posizioniamo nelle colonne 2, 3, 4
          const isLastThree = index >= partnerClubs.length - 3
          let gridColumnClass = ""
          if (isLastThree) {
            const positionInLastThree = index - (partnerClubs.length - 3)
            // Posizioni: 0 -> colonna 2, 1 -> colonna 3, 2 -> colonna 4
            const colStartClasses = ["lg:col-start-2", "lg:col-start-3", "lg:col-start-4"]
            gridColumnClass = colStartClasses[positionInLastThree] || ""
          }
          
          return (
          <figure 
            key={index}
            className={`grid__item flex flex-col gap-4 ${gridColumnClass}`}
          >
            <a
              href={club.link}
              target="_blank"
              rel="noopener noreferrer"
              className="grid__item-link block w-full aspect-[5/6] overflow-hidden cursor-pointer group"
            >
              <div 
                className="grid__item-img w-full h-full bg-gray-300 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url(${club.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </a>
            <figcaption className="grid__item-caption text-[16px] leading-[1.2] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
              <div className="font-medium">{club.name}</div>
              <div className="text-[#8b8b8b] text-sm mt-1">{club.location}</div>
            </figcaption>
          </figure>
          )
        })}
        </div>
      </div>
    </section>
  )
}

