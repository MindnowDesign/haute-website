"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"
import { CTAButton } from "./cta-button"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<"EN" | "DE" | "FR">("EN")
  const [isHero2Page, setIsHero2Page] = useState(false)
  const [isAtFooter, setIsAtFooter] = useState(false)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Controlla se siamo sulla homepage-2 e se l'hero è visibile
  useEffect(() => {
    if (!headerRef.current) return
    
    const checkHero2 = () => {
      const isOnHomepage2 = pathname === '/homepage-2' || document.body.hasAttribute('data-hero-2')
      setIsHero2Page(isOnHomepage2)
    }
    
    checkHero2()
    
    // Osserva i cambiamenti nell'attributo del body
    const observer = new MutationObserver(checkHero2)
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-hero-2'] })
    
    // Usa ScrollTrigger per rilevare quando l'hero esce dalla viewport
    const heroSection = document.querySelector('[data-hero-section]')
    if (heroSection && pathname === '/homepage-2') {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: heroSection,
          start: "bottom top", // Quando il bottom dell'hero tocca il top della viewport
          end: "bottom top",
          onEnter: () => {
            // Quando l'hero esce dalla viewport, torna normale
            setIsHero2Page(false)
          },
          onEnterBack: () => {
            // Quando torni indietro e l'hero entra nella viewport, torna trasparente
            setIsHero2Page(true)
          },
        })
      }, headerRef)
      
      return () => {
        observer.disconnect()
        ctx.revert()
      }
    }
    
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!menuOverlayRef.current || !menuContentRef.current) return

    if (isMenuOpen) {
      // Blocca lo scroll quando il menu è aperto
      document.body.style.overflow = "hidden"
      
      // Apri menu: anima overlay dall'alto con easing più smooth
      gsap.set(menuOverlayRef.current, { y: "-100%", display: "block" })
      gsap.set(menuContentRef.current, { opacity: 0, y: -20 })
      
      gsap.to(menuOverlayRef.current, {
        y: "0%",
        duration: 1,
        ease: "expo.out",
      })
      
      gsap.to(menuContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      })
    } else {
      // Riabilita lo scroll quando il menu è chiuso
      document.body.style.overflow = ""
      
      // Chiudi menu: anima overlay verso l'alto con easing più smooth
      gsap.to(menuContentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      })
      
      gsap.to(menuOverlayRef.current, {
        y: "-100%",
        duration: 1,
        delay: 0.2,
        ease: "expo.in",
        onComplete: () => {
          if (menuOverlayRef.current) {
            gsap.set(menuOverlayRef.current, { display: "none" })
          }
        },
      })
    }

    // Cleanup: riabilita lo scroll quando il componente viene smontato
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // Inverti i colori dell'header quando arriva al footer
  useEffect(() => {
    if (!headerRef.current) return

    const footer = document.querySelector('footer')
    if (!footer) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footer,
        start: "top top", // Inizia quando il top del footer tocca il top della viewport
        onEnter: () => {
          // Quando il footer entra nella viewport, inverti i colori
          setIsAtFooter(true)
        },
        onLeave: () => {
          // Quando il footer esce dalla viewport, torna normale
          setIsAtFooter(false)
        },
        onEnterBack: () => {
          // Quando torni indietro e il footer entra nella viewport, inverti i colori
          setIsAtFooter(true)
        },
        onLeaveBack: () => {
          // Quando torni indietro e il footer esce dalla viewport, torna normale
          setIsAtFooter(false)
        },
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { label: "Online-Reservation", href: "/reservation" },
    { label: "Culinary", href: "/culinary" },
    { label: "Team", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Become a member", href: "/contact" },
    { label: "Partnerclubs", href: "/partnerclubs" },
    { label: "Jobs", href: "/jobs" },
  ]

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHero2Page 
            ? 'bg-transparent border-transparent' 
            : isAtFooter
            ? 'bg-black border-b border-white/10'
            : 'bg-[#ECEBE8] border-b border-black/10'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Left: Login */}
          <CTAButton 
            href="/login"
            className={
              isHero2Page || isAtFooter 
                ? '!text-white hover:!opacity-80' 
                : ''
            }
          >
            LOGIN
          </CTAButton>

          {/* Center: Logo */}
          <Link 
            href="/" 
            className="absolute left-1/2 -translate-x-1/2"
            data-header-logo
          >
            <Logo 
              className="w-[120px] h-auto" 
              variant={isHero2Page || isAtFooter ? "white" : "black"}
            />
          </Link>

          {/* Right: Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-end w-[85px] h-7 cursor-pointer hover:opacity-70 transition-opacity relative"
            aria-label="Menu"
          >
            {!isMenuOpen ? (
              <Menu 
                className={`w-[26px] h-[26px] ${isHero2Page || isAtFooter ? 'text-white' : 'text-black'}`} 
                strokeWidth={2.5} 
              />
            ) : (
              <X 
                className={`w-[26px] h-[26px] ${isHero2Page || isAtFooter ? 'text-white' : 'text-black'}`} 
                strokeWidth={2.5} 
              />
            )}
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black z-[100] hidden"
        style={{ willChange: "transform" }}
      >
        <div className="container mx-auto h-full relative">
          {/* Top Bar - z-index più alto per essere sopra il menu content */}
          <div className="fixed top-0 left-0 right-0 z-[101] bg-black">
            <div className="container mx-auto px-4 flex items-center justify-between h-20">
              {/* Left: Login */}
              <CTAButton href="/login" className="text-white hover:opacity-60">
                LOGIN
              </CTAButton>

              {/* Right: Close Button */}
              <button
                onClick={toggleMenu}
                className="flex items-center justify-end w-[85px] h-7 cursor-pointer hover:opacity-70 transition-opacity relative"
                aria-label="Close Menu"
              >
                <X className="w-[26px] h-[26px] text-white" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Menu Content */}
          <div
            ref={menuContentRef}
            className="flex flex-col items-center justify-center h-full pointer-events-none"
          >
            {/* Menu Title */}
            <h2 className="font-serif text-white text-[100px] leading-normal text-center mb-[40px] pointer-events-none">
              Menu
            </h2>

            {/* Menu Items */}
            <nav className="flex flex-col gap-[32px] items-center pointer-events-auto">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    className={`text-[24px] leading-[1.2] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] uppercase text-center group transition-colors duration-300 ${
                      isActive ? "text-white" : "text-[#8b8b8b] hover:text-white"
                    }`}
                  >
                    <span className="inline-block">
                      [
                      <span className={`inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4 ${isActive ? "underline" : ""}`}>
                        {item.label}
                      </span>
                      ]
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Language Selector */}
            <div className="flex gap-6 items-center mt-[96px] pointer-events-auto">
              {(["EN", "DE", "FR"] as const).map((lang) => {
                const isSelected = selectedLanguage === lang
                return (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`text-[20px] leading-[1.2] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] uppercase transition-colors duration-300 ${
                      isSelected
                        ? "text-white underline"
                        : "text-[#8b8b8b] hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

