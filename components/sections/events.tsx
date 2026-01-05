"use client"

import Link from "next/link"

export function Events() {

  return (
    <section className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4 mb-32">
        <div className="max-w-6xl mx-auto text-center mb-32">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            Events at HAUTE
            <br />
            Festive. Joyful. Fascinating.
          </h1>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Events at HAUTE deserve a stage that leaves a lasting impression. HAUTE can be booked exclusively for private or corporate events, offering spectacular views, personalized service, and everything you need.
            </p>
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              From an aperitif on the glass-enclosed terrace to a party with a DJ above the rooftops of Zurich – we craft each occasion individually, stylishly, and with a keen sense for the extraordinary.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-48">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start w-full mb-24">
          {[
            { label: "Finger food", image: "/Asset/Events/finger-food.jpg", href: "/events/finger-food" },
            { label: "Banquet", image: "/Asset/Events/banquet.jpg", href: "/events/banquet" },
            { label: "Uetliberg exclusive", image: "/Asset/Events/exclusive.jpg", href: "/events/uetliberg-exclusive" },
            { label: "Private events", image: "/Asset/Events/private.jpg", href: "/events/private-events" }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col gap-4 flex-1 w-full group"
            >
              <div 
                className="w-full relative overflow-hidden"
                style={{
                  aspectRatio: '315 / 353',
                }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
              <p className="text-[18px] leading-[1.5] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] uppercase">
                <span className="inline-block">
                  [
                  <span className="inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4">
                    {item.label}
                  </span>
                  ]
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
