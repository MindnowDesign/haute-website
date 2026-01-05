import { EventDetail } from "@/components/sections/event-detail"

export default function FingerFoodPage() {
  return (
    <main className="min-h-screen pt-16">
      <EventDetail
        title="HAUTE Aperitif"
        paragraph1="Enjoy an exclusive aperitif high above the rooftops of Zurich – a moment that inspires and connects. Treat your guests to seasonal finger food and their favorite champagne or wine, while engaging conversations unfold in the unique HAUTE atmosphere."
        paragraph2="Extend the evening with a dinner in the restaurant or let it unwind leisurely on perhaps the most beautiful terrace in Zurich. Instead of a classic menu, we can also serve a stylish flying buffet on request – relaxed, elegant, and perfect for unforgettable moments. Thanks to the terrace glazing, we can comfortably accommodate up to 30 guests even in rainy weather."
        currentEventSlug="finger-food"
      />
    </main>
  )
}

