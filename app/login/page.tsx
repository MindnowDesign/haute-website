"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GlideOverButton } from "@/components/ui/glide-over-button"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    firstNameSurname: "",
    memberNo: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Mouse movement effect for image
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const currentPositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  // Smooth interpolation function with more gentle easing
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor
  }

  // Animation loop for smooth movement
  useEffect(() => {
    const animate = () => {
      if (!imageRef.current || !imageContainerRef.current) return

      const currentX = currentPositionRef.current.x
      const currentY = currentPositionRef.current.y
      const targetX = targetPositionRef.current.x
      const targetY = targetPositionRef.current.y

      // Very smooth interpolation with gentle easing factor (lower = smoother)
      const easingFactor = 0.05
      const newX = lerp(currentX, targetX, easingFactor)
      const newY = lerp(currentY, targetY, easingFactor)

      currentPositionRef.current = { x: newX, y: newY }

      // Apply transform to image with 5% zoom (scale 1.05) and translation
      imageRef.current.style.transform = `scale(1.05) translate(${newX}px, ${newY}px)`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Mouse move handler - tracks mouse anywhere on the page
  useEffect(() => {
    const container = imageContainerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!container || !imageRef.current) return

      const rect = container.getBoundingClientRect()
      
      // Get mouse position relative to container center
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Calculate center of container
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate offset from center (normalized to -1 to 1)
      const offsetX = (mouseX - centerX) / centerX
      const offsetY = (mouseY - centerY) / centerY

      // Image is zoomed 5% (scale 1.05), so it's 5% larger than container
      // Maximum movement is limited to 2% of container size for very subtle effect
      // This ensures the image never shows edges (we have 5% zoom, so 2% movement is safe)
      const containerWidth = rect.width
      const containerHeight = rect.height
      
      // Maximum movement: 2% of container for very subtle effect
      const maxMovementPercentage = 0.02 // 2%
      const maxMovementX = containerWidth * maxMovementPercentage
      const maxMovementY = containerHeight * maxMovementPercentage

      // Clamp the movement to ensure image never goes outside bounds
      const targetX = Math.max(-maxMovementX, Math.min(maxMovementX, offsetX * maxMovementX))
      const targetY = Math.max(-maxMovementY, Math.min(maxMovementY, offsetY * maxMovementY))

      targetPositionRef.current = {
        x: targetX,
        y: targetY,
      }
    }

    // Listen to mouse movement on entire window
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstNameSurname.trim()) {
      newErrors.firstNameSurname = "First Name Surname is required"
    }
    if (!formData.memberNo.trim()) {
      newErrors.memberNo = "Member No is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission here
      console.log("Form submitted:", formData)
      // You can add API call here
    }
  }

  return (
    <main className="min-h-screen pt-16 bg-[#ECEBE8]">
      <section className="min-h-[calc(100vh-5rem)] py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Form */}
            <div>
              <div className="w-full max-w-md">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal font-serif mb-16 text-black">
                  Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* First Name Surname */}
                  <div>
                    <Label htmlFor="firstNameSurname" className="text-black text-base">
                      First Name Surname<span className="text-black ml-1">(Required)</span>
                    </Label>
                    <Input
                      id="firstNameSurname"
                      type="text"
                      value={formData.firstNameSurname}
                      onChange={(e) => handleChange("firstNameSurname", e.target.value)}
                      className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                      placeholder="Enter first name and surname"
                    />
                    {errors.firstNameSurname && (
                      <p className="text-sm text-red-600 mt-1">{errors.firstNameSurname}</p>
                    )}
                  </div>

                  {/* Member No */}
                  <div>
                    <Label htmlFor="memberNo" className="text-black text-base">
                      Member No<span className="text-black ml-1">(Required)</span>
                    </Label>
                    <Input
                      id="memberNo"
                      type="text"
                      value={formData.memberNo}
                      onChange={(e) => handleChange("memberNo", e.target.value)}
                      className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                      placeholder="Enter member number"
                    />
                    {errors.memberNo && (
                      <p className="text-sm text-red-600 mt-1">{errors.memberNo}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <GlideOverButton
                      type="submit"
                      className="w-full h-12 px-4 py-2 bg-black text-[#ECEBE8] rounded-none text-base"
                    >
                      Login
                    </GlideOverButton>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right: Image */}
            <div className="hidden lg:block">
              <div 
                ref={imageContainerRef}
                className="relative w-full h-[700px] bg-gray-200 overflow-hidden"
              >
                <div 
                  ref={imageRef}
                  className="absolute inset-0 w-full h-full transition-transform duration-0"
                  style={{ willChange: "transform" }}
                >
                  <Image
                    src="/Asset/Login/Login.jpg"
                    alt="Login"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

