import { Hero } from "@/components/sections/hero"
import { Story } from "@/components/sections/story"
import dynamic from "next/dynamic"

// Lazy load components below the fold for better initial load performance
const Gallery = dynamic(() => import("@/components/sections/gallery").then(mod => ({ default: mod.Gallery })), {
  loading: () => <div className="h-screen bg-[#ECEBE8]" />,
  ssr: true,
})

const MembershipIntro = dynamic(() => import("@/components/sections/membership-intro").then(mod => ({ default: mod.MembershipIntro })), {
  loading: () => null,
  ssr: true,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Story />
      <Gallery />
      <MembershipIntro />
    </main>
  )
}


