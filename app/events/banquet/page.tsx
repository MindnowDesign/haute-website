import { EventDetail } from "@/components/sections/event-detail"

export default function BanquetPage() {
  return (
    <main className="min-h-screen pt-16">
      <EventDetail
        title="HAUTE Banquet"
        paragraph1="If availability allows, you can also book larger tables at HAUTE in the evening. For reservations of eight or more guests, we recommend a set menu for organizational reasons – ensuring your evening is relaxed and stylish."
        paragraph2="We are happy to create a personalized offer with menu and wine suggestions tailored to your preferences. Whether it's menu cards, floral arrangements, or a special birthday cake, we will design your dinner exclusively according to your wishes."
        currentEventSlug="banquet"
      />
    </main>
  )
}

