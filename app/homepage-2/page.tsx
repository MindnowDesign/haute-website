"use client"

import { Hero2 } from "@/components/sections/hero-2"
import { Story } from "@/components/sections/story"
import { Gallery } from "@/components/sections/gallery"
import { MembershipIntro } from "@/components/sections/membership-intro"

export default function Homepage2() {
  return (
    <main>
      <Hero2 />
      
      {/* Contenuto che scrolla sopra la hero sticky */}
      <div className="relative z-10 bg-[#ECEBE8]" data-content-section>
        <Story />
        <Gallery />
        <MembershipIntro />
      </div>
    </main>
  )
}
