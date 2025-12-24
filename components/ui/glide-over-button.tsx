"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlideOverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const GlideOverButton = React.forwardRef<HTMLButtonElement, GlideOverButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "button-glide-over relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
          className
        )}
        {...props}
      >
        <span className="button-glide-over__text-wrapper relative inline-block overflow-hidden">
          <span className="button-glide-over__text button-glide-over__text--initial inline-block">
            {children}
          </span>
          <span className="button-glide-over__text button-glide-over__text--hover absolute left-0 top-0 inline-block">
            {children}
          </span>
        </span>
      </button>
    )
  }
)
GlideOverButton.displayName = "GlideOverButton"

export { GlideOverButton }

