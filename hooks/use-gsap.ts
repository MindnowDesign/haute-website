"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export function useGSAP() {
  const scopeRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!scopeRef.current) return

    const ctx = gsap.context(() => {
      // GSAP animations can be added here
    }, scopeRef)

    return () => ctx.revert()
  }, [])

  return scopeRef
}


