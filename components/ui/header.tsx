"use client"

import Link from "next/link"
import { Logo3D } from "./logo-3d"

export function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-[#ECEBE8] border-b border-black/10 transition-transform duration-300 translate-y-0"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Left: Login */}
        <Link
          href="/login"
          className="text-black text-xl font-sans tracking-tight hover:opacity-70 transition-opacity"
        >
          [ LOGIN ]
        </Link>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Logo3D />
        </Link>

        {/* Right: Menu */}
        <button
          className="flex flex-col gap-1.5 items-end justify-center w-[85px] h-7 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Menu"
        >
          <div className="bg-black h-1 w-[26px]" />
          <div className="bg-black h-1 w-[26px]" />
          <div className="bg-black h-1 w-[26px]" />
        </button>
      </div>
    </header>
  )
}

