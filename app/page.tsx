import { Hero } from "@/components/sections/hero"
import { Story } from "@/components/sections/story"
import { Gallery } from "@/components/sections/gallery"
import { MembershipIntro } from "@/components/sections/membership-intro"

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Hero />
      <Story />
      <Gallery />
      <MembershipIntro />
    </main>
  )
}


