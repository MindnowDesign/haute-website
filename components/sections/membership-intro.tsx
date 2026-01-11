"use client"

import { CTAButton } from "@/components/ui/cta-button"

export function MembershipIntro() {
  return (
    <section className="relative py-32 bg-[#ECEBE8]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-24 md:gap-[98px] items-start">
          {/* Left side - Title and CTA */}
          <div className="flex flex-col gap-12 flex-1">
            <h2 className="text-[76px] leading-tight font-serif text-black">
              For members. Personal.{" "}
              <span className="italic">Exclusive</span>. Connected.
            </h2>
            <CTAButton href="/contact">Become a member</CTAButton>
          </div>

          {/* Right side - Description paragraphs */}
          <div className="flex flex-col gap-12 flex-1">
            <p className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
              HAUTE is a retreat for members – and their guests. It offers an ideal setting for both business and private encounters. Those who are here, belong here. People come together, cultivate valuable connections, and exchange ideas and inspiration in an elegant, relaxed atmosphere.
            </p>
            <p className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
              Our team creates the perfect environment for engaging conversations and delightful moments, ensuring with great attention to detail that everyone feels welcome and at home at all times.
            </p>
          </div>
        </div>
    </section>
  )
}

