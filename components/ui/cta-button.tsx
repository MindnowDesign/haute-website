"use client"

import { ReactNode, forwardRef } from "react"
import Link from "next/link"

interface CTAButtonProps {
  children: ReactNode
  className?: string
  href?: string
}

export const CTAButton = forwardRef<HTMLParagraphElement | HTMLAnchorElement, CTAButtonProps>(
  ({ children, className = "", href }, ref) => {
    const content = (
      <span className="inline-block">
        [
        <span className="inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4">
          {children}
        </span>
        ]
      </span>
    )

    const baseClasses = `text-[20px] leading-[1.5] uppercase text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] cursor-pointer transition-opacity duration-300 ease-out hover:opacity-60 group ${className}`

    if (href) {
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={baseClasses}>
          {content}
        </Link>
      )
    }

    return (
      <p ref={ref as React.Ref<HTMLParagraphElement>} className={baseClasses}>
        {content}
      </p>
    )
  }
)

CTAButton.displayName = "CTAButton"

