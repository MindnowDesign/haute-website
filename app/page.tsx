import { Hero } from "@/components/sections/hero"
import { Story } from "@/components/sections/story"
import { Gallery } from "@/components/sections/gallery"
import { About } from "@/components/sections/about"
import { Membership } from "@/components/sections/membership"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Hero />
      <Story />
      <Gallery />
      <About />
      <Membership />
      <Contact />
    </main>
  )
}


