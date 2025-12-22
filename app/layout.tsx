import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Haute Club Zurich",
  description: "Exclusive Club in Zurich",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

