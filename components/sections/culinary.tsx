"use client"

import Link from "next/link"
import { CTAButton } from "@/components/ui/cta-button"

export function Culinary() {

  const menuSections = [
    { label: "Menu Lunch", href: "#" },
    { label: "Menu Dinner", href: "#" },
    { label: "Wine List", href: "#" },
    { label: "Bar Menu", href: "#" },
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

  return (
    <section className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-32">
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
              Our wine list offers the perfect choice for every mood and moment. Whether it's a business lunch, a refreshing cocktail at sunset on the terrace, a light after-work meal, or a festive dinner by the crackling fireplace – dining at HAUTE is pure joy.
            </p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 mb-32">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start w-full">
          {menuSections.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col gap-4 flex-1 w-full"
            >
              <div className="h-[283px] w-full bg-[#d9d9d9] relative overflow-hidden" />
              <p className="text-[18px] leading-[1.5] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] uppercase">
                [ {item.label} ]
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recognized for Excellence Section */}
      <div className="container mx-auto px-4 mb-32">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-serif mb-12 text-black">
            Recognized for excellence!
          </h2>
          <div className="h-[374px] w-full max-w-[560px] mx-auto bg-[#d9d9d9] relative overflow-hidden" />
        </div>
      </div>

      {/* Sustainability Points */}
      <div className="container mx-auto px-4 mb-32 mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
            {sustainabilityPoints.map((point, index) => {
              // Calcola offset progressivo più marcato
              const offsets = [0, 120, 280, 480] // Valori in px per 01, 02, 03, 04
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
                <p className="text-[16px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
                  {point.text}
                </p>
              </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Logos and Final Statement */}
      <div className="container mx-auto px-4 mb-32">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 md:gap-12">
          {/* Logos */}
          <div className="flex items-center justify-center gap-8">
            <div className="w-[70px] h-[70px] bg-[#d9d9d9] rounded-full shrink-0" />
            <div className="w-[64px] h-[70px] bg-[#d9d9d9] rounded shrink-0" />
          </div>

          {/* Final Statement */}
          <p className="text-4xl md:text-5xl lg:text-[52px] font-serif text-black text-center leading-tight max-w-5xl">
            This <span className="italic">motivates</span> us to teach our customers and guests how to use resources sparingly and to make a joint <span className="italic">contribution</span> to a better world. Because as a host, HAUTE wants to give only the <span className="italic">best</span>, always and everywhere!
          </p>
        </div>
      </div>

      {/* Online Reservations CTA */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <CTAButton href="/reservation">
            Online Reservations
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

