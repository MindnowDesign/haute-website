import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"]
})

export const metadata: Metadata = {
  title: "Haute Club Zurich",
  description: "Exclusive Club in Zurich",
  icons: {
    icon: "/Favicon/icon.png",
  },
  other: {
    "format-detection": "telephone=no",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} font-sans`}>
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}


