"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo3D } from "./logo-3d"
import { CTAButton } from "./cta-button"
import { gsap } from "@/lib/gsap"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

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
        className="fixed top-0 left-0 right-0 z-50 bg-[#ECEBE8] border-b border-black/10 transition-transform duration-300 translate-y-0"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Left: Login */}
          <CTAButton href="/login">LOGIN</CTAButton>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Logo3D />
          </Link>

          {/* Right: Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-end w-[85px] h-7 cursor-pointer hover:opacity-70 transition-opacity relative"
            aria-label="Menu"
          >
            {!isMenuOpen ? (
              <Menu className="w-[26px] h-[26px] text-black" strokeWidth={2.5} />
            ) : (
              <X className="w-[26px] h-[26px] text-black" strokeWidth={2.5} />
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
          </div>
        </div>
      </div>
    </>
  )
}

