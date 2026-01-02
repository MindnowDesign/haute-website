"use client"

import { useEffect, useRef } from "react"

// Partner clubs data from haute.ch
const partnerClubs = [
  { name: "Club zur Geduld", location: "Winterthur, Switzerland" },
  { name: "Club de Bâle", location: "Basel, Switzerland" },
  { name: "Airport Club", location: "Frankfurt, Germany" },
  { name: "Business Club", location: "Hamburg, Germany" },
  { name: "Drivers & Business Club", location: "Munich, Germany" },
  { name: "Wirtschaftsclub", location: "Düsseldorf, Germany" },
  { name: "Havanna Lounge", location: "Bremen, Germany" },
  { name: "Rotonda Business-Club", location: "Köln, Germany" },
  { name: "Kitzbühel Country Club", location: "Kitzbühel, Austria" },
  { name: "Am Hof 8", location: "Vienna, Austria" },
  { name: "Saint James Club", location: "Paris, France" },
  { name: "National Liberal Club", location: "London, England" },
  { name: "Kjarval", location: "Reykjavik, Island" },
  { name: "Capital Club", location: "Dubai" },
  { name: "Capital Club", location: "Nairobi, Kenia" },
  { name: "Tower Club", location: "Singapore" },
  { name: "Candela Nuevo", location: "Melbourne, Australia" },
  { name: "The Forest and Stream Club", location: "Quebec, Canada" },
]

export function Partnerclubs() {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4 mb-32">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-12 text-black">
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

      {/* Grid Container - Ready for Elastic Grid Scroll Effect */}
      {/* 
        TODO: Add Elastic Grid Scroll effect using GSAP ScrollSmoother
        The structure is prepared with grid__item classes for easy JavaScript manipulation.
        Columns will be created dynamically by grouping items.
      */}
      <div className="container mx-auto px-4">
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12"
          style={{
            '--column-count': '5',
            '--column-size': 'minmax(0, 1fr)',
            '--c-gap': '2rem',
            '--r-gap': '3rem',
          } as React.CSSProperties}
        >
        {partnerClubs.map((club, index) => (
          <figure 
            key={index}
            className="grid__item flex flex-col gap-4"
          >
            <div 
              className="grid__item-img w-full aspect-[3/4] bg-gray-300 overflow-hidden"
              style={{
                backgroundImage: `url(https://via.placeholder.com/300x400?text=${encodeURIComponent(club.name)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <figcaption className="grid__item-caption text-[16px] leading-[1.2] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
              <div className="font-medium">{club.name}</div>
              <div className="text-[#8b8b8b] text-sm mt-1">{club.location}</div>
            </figcaption>
          </figure>
        ))}
        </div>
      </div>
    </section>
  )
}

