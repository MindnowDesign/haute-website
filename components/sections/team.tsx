"use client"

interface TeamMember {
  name: string
  roles: string[]
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Thomas Widmer",
    roles: ["CEO & Co-Owner GAMMA Group", "Managing Partner HAUTE"],
    image: "/Asset/Team/Thomas-1-600x400-1.jpg"
  },
  {
    name: "Alexandra Glossidis",
    roles: ["Head of administration", "Member of the Executive Board"],
    image: "/Asset/Team/Alexandra-Glossidis.jpg"
  },
  {
    name: "Max Blume",
    roles: ["Head of Restaurant", "Member of the Executive Board"],
    image: "/Asset/Team/Max-Blume-1.jpg"
  },
  {
    name: "Stefan Pühringer",
    roles: ["Head Chef"],
    image: "/Asset/Team/Stefan-1-600x400-1.jpg"
  },
  {
    name: "Ray Höhener",
    roles: ["Customer Relations"],
    image: "/Asset/Team/Ray-Dinkelmann2.jpg"
  },
  {
    name: "Sabrina Janser",
    roles: ["Assistant Head of Restaurant", "Wine Supervisor"],
    image: "/Asset/Team/Sabrina-Janser.jpg"
  },
  {
    name: "Niclas Ohrmann",
    roles: ["Sous Chef"],
    image: "/Asset/Team/Niclas-Ohrmann.jpg"
  },
  {
    name: "Oliver Dombrowski",
    roles: ["Customer Relations"],
    image: "/Asset/Team/Oliver-Dombrowski.jpg"
  },
  {
    name: "Ali Zulfikar",
    roles: ["Office Staff"],
    image: "/Asset/Team/Ali-600x400-1.jpg"
  },
  {
    name: "Niyat Mengs",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Niyat-Mengs.jpg"
  },
  {
    name: "Mohammad Mosharuf Hossain",
    roles: ["Chef / Allrounder"],
    image: "/Asset/Team/Musharruf-600x400-1.jpg"
  },
  {
    name: "Julian Strimmer",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Julian-Strimmer-1.jpg"
  },
  {
    name: "Monir Bhuiyan",
    roles: ["Office Staff"],
    image: "/Asset/Team/Monir-600x400-1.jpg"
  },
  {
    name: "Lorena Folie",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Lorena-Folie.jpg"
  },
  {
    name: "Kadishe Schnellmann",
    roles: ["Junior Sous Chef"],
    image: "/Asset/Team/Kadishe-Schnellmann.jpg"
  },
  {
    name: "Michael Weigand",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/Michael-Weigand.jpg"
  },
  {
    name: "Andrzej Kulig",
    roles: ["Buffet Staff"],
    image: "/Asset/Team/Andrzej-Kulig-1.jpg"
  },
  {
    name: "Dominik Vogl",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/Dominik-Vogl-1.jpg"
  },
  {
    name: "Sarra Luginbühl",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/Sarra-Luginbuehl_2-1.jpg"
  },
  {
    name: "Valentino Savarese",
    roles: ["Apprentice"],
    image: "/Asset/Team/Valentino-Savarese-1.jpg"
  },
  {
    name: "Lucas Becker",
    roles: ["Chef de Rang"],
    image: "/Asset/Team/platzhalter.jpg"
  },
  {
    name: "Leonardo Villa Medrano",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/platzhalter.jpg"
  },
  {
    name: "Luca Iuliano",
    roles: ["Chef de Partie"],
    image: "/Asset/Team/platzhalter.jpg"
  },
  {
    name: "José Imhof",
    roles: ["Buffet Staff"],
    image: "/Asset/Team/platzhalter.jpg"
  }
]

export function Team() {
  return (
    <section className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4 mb-32">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto text-center mb-32">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            HAUTE. Warm.
            <br />
            Genuine. Passionate.
          </h1>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Our team accompanies you with attentive and personal service – always one step ahead, so you can enjoy every moment without distraction. We create the perfect setting for relaxed conversations and delightful moments, ensuring with a fine sense of care that you feel at home at all times.
            </p>
            <div className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              <p className="mb-0">
                True hospitality reveals itself when it goes unnoticed yet leaves a lasting impression. That's why we do everything to make you feel not only welcome but truly understood.
              </p>
              <p>
                Your experience is always at the center – hospitality that connects: personal, effortless, and full of passion.
              </p>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="w-full">
          <div className="flex flex-col gap-24">
            {/* Group team members into rows of 3 */}
            {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, rowIndex) => {
              const rowMembers = teamMembers.slice(rowIndex * 3, (rowIndex + 1) * 3)
              return (
                <div key={rowIndex} className="flex flex-col md:flex-row items-start md:justify-between gap-8 md:gap-10">
                  {rowMembers.map((member, memberIndex) => (
                    <div key={memberIndex} className="flex gap-8 items-end flex-1 md:max-w-[33.333%]">
                      {/* Team member image - 97px x 97px */}
                      <div className="relative shrink-0 w-[97px] h-[97px] rounded-sm overflow-hidden">
                        <img 
                          src={member.image || "/Asset/Team/platzhalter.jpg"} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-[13px] items-start flex-1 min-w-0 max-w-[280px]">
                        <p className="text-[16px] leading-[1.2] text-black uppercase font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
                          {member.name}
                        </p>
                        <div className="flex flex-col gap-[2px] items-start">
                          {member.roles.map((role, roleIndex) => (
                            <p 
                              key={roleIndex}
                              className="text-[14px] leading-[1.2] text-black/40 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]"
                            >
                              {role}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Fill empty slots in last row if needed */}
                  {rowMembers.length < 3 && Array.from({ length: 3 - rowMembers.length }).map((_, emptyIndex) => (
                    <div key={`empty-${emptyIndex}`} className="hidden md:block flex-1" />
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

