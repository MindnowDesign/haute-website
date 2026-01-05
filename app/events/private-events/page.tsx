import { EventDetail } from "@/components/sections/event-detail"

export default function PrivateEventsPage() {
  return (
    <main className="min-h-screen pt-16">
      <EventDetail
        title="HAUTE exclusively at the weekend"
        paragraph1="Book perhaps the most stunning location in Zurich exclusively for your event! Whether it's a corporate celebration, birthday, or wedding, we stage your occasion in a unique atmosphere with the utmost professionalism. Welcome your guests with ice-cold champagne and exquisite canapés on the 13th-floor terrace, high above the city. After sunset, enjoy an exclusive location change to the 14th floor."
        paragraph2="We tailor HAUTE entirely to your wishes, from your dream color scheme to every décor detail, brought to life by the designers of GAMMA Design, while our head chef creates your favorite menu. Afterwards, you can either let the evening wind down in style or take the party to its peak with the most sought-after DJs and bands in Switzerland. A midnight snack ensures the celebration remains unforgettable well into the early hours."
        currentEventSlug="private-events"
      />
    </main>
  )
}

