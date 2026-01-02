"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export function Gallery() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef(0)
  const targetPositionRef = useRef(0)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageInnerRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollVelocityRef = useRef(0)
  const lastPositionRef = useRef(0)
  const momentumRef = useRef(0)
  const lastTimeRef = useRef(0)

  // Generate 12 images with different heights and widths
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    width: [562, 552, 367, 552, 562, 552, 367, 552, 562, 552, 367, 552][i],
    height: [629, 358, 566, 449, 629, 358, 566, 449, 629, 358, 566, 449][i],
    text: `[ LOREM IPSUM ${i + 1} ]`,
  }))

  // Duplicate images for infinite scroll
  const duplicatedImages = [...images, ...images]

  // Calculate total width of one set
  const totalWidth = images.reduce((sum, img) => sum + img.width + 35, 0)

  // Smooth interpolation (lerp) with GSAP-style easing
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  useEffect(() => {
    if (!carouselRef.current || !containerRef.current) return

    const carousel = carouselRef.current
    const container = containerRef.current
    let momentumTween: gsap.core.Tween | null = null

    // Update carousel position with smooth interpolation and elastic bounds
    const updatePosition = () => {
      if (!carousel) return
      
      const now = performance.now()
      lastTimeRef.current = now
      
      // Calculate scroll velocity for momentum
      const currentPosition = positionRef.current
      const velocity = currentPosition - lastPositionRef.current
      scrollVelocityRef.current = lerp(scrollVelocityRef.current, velocity, 0.3)
      lastPositionRef.current = currentPosition
      
      // Apply momentum when not dragging
      if (!isDraggingRef.current && Math.abs(momentumRef.current) > 0.1) {
        targetPositionRef.current += momentumRef.current
        momentumRef.current *= 0.92 // Friction
      } else if (!isDraggingRef.current && Math.abs(momentumRef.current) <= 0.1) {
        momentumRef.current = 0
      }
      
      // Smooth interpolation to target position (no bounds - infinite scroll)
      positionRef.current = lerp(positionRef.current, targetPositionRef.current, 0.15)
      
      // Handle infinite scroll reset (seamless loop)
      if (!isDraggingRef.current) {
        // Reset when scrolling too far left (negative values)
        if (targetPositionRef.current <= -totalWidth) {
          targetPositionRef.current += totalWidth
          positionRef.current += totalWidth
        }
        // Reset when scrolling too far right (positive values)
        if (targetPositionRef.current > 0) {
          targetPositionRef.current -= totalWidth
          positionRef.current -= totalWidth
        }
      }

      // Apply transform directly for performance
      gsap.set(carousel, { x: positionRef.current })

      // Apply horizontal distortion only when scrolling/dragging (like shader distortion)
      const velocityMagnitude = Math.abs(scrollVelocityRef.current)
      const velocitySign = Math.sign(scrollVelocityRef.current)
      const isScrolling = velocityMagnitude > 0.5
      
      imageRefs.current.forEach((imageEl, index) => {
        if (!imageEl) return
        
        const innerEl = imageInnerRefs.current[index]
        if (!innerEl) return
        
        if (isScrolling) {
          // Create horizontal wave distortion based on scroll velocity
          // Similar to shader: sin(uv.y * PI) * velocity (but applied horizontally)
          // Max distortion based on velocity (capped at 90px for very visible effect)
          const maxDistortion = Math.min(velocityMagnitude * 2.0, 90)
          const distortionIntensity = maxDistortion * velocitySign
          
          // Create wave effect using clip-path polygon
          // Simulate sin wave across the image height (distorting left/right edges)
          const steps = 50
          const points: string[] = []
          const imageWidth = imageEl.offsetWidth || imageEl.getBoundingClientRect().width
          
          // Left edge with wave
          for (let i = 0; i <= steps; i++) {
            const y = i / steps
            const wave = Math.sin(y * Math.PI) * (distortionIntensity / imageWidth)
            const leftX = Math.max(0, Math.min(1, wave))
            points.push(`${leftX * 100}% ${y * 100}%`)
          }
          
          // Right edge with wave (inverted)
          for (let i = steps; i >= 0; i--) {
            const y = i / steps
            const wave = Math.sin(y * Math.PI) * (distortionIntensity / imageWidth)
            const rightX = Math.max(0, Math.min(1, 1 + wave))
            points.push(`${rightX * 100}% ${y * 100}%`)
          }
          
          // Apply clip-path for horizontal wave distortion
          imageEl.style.clipPath = `polygon(${points.join(', ')})`
          imageEl.style.transition = "none"
        } else {
          // Reset immediately when not scrolling (no animation)
          imageEl.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          imageEl.style.transition = "none"
        }
      })
    }

    // Animation loop for smooth updates
    const animate = () => {
      updatePosition()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    // Mouse drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      startXRef.current = e.pageX - container.offsetLeft
      scrollLeftRef.current = targetPositionRef.current
      momentumRef.current = 0 // Reset momentum on drag start
      container.style.cursor = "grabbing"
      e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startXRef.current) * 1.5 // Scroll speed multiplier
      const newTarget = scrollLeftRef.current + walk
      
      // Calculate momentum based on movement
      const prevTarget = targetPositionRef.current
      targetPositionRef.current = newTarget
      momentumRef.current = (newTarget - prevTarget) * 0.5
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      container.style.cursor = "grab"
      
      // Apply smooth easing to momentum when releasing drag
      if (Math.abs(momentumRef.current) > 0.1) {
        // Kill any existing momentum tween
        if (momentumTween) {
          momentumTween.kill()
        }
        
        // Animate momentum to 0 with smooth easing
        const startMomentum = momentumRef.current
        momentumTween = gsap.to(momentumRef, {
          current: 0,
          duration: 1.2,
          ease: "power2.out",
          overwrite: true,
        })
      }
    }

    const handleMouseLeave = () => {
      isDraggingRef.current = false
      container.style.cursor = "grab"
      
      // Apply smooth easing to momentum when leaving drag area
      if (Math.abs(momentumRef.current) > 0.1) {
        // Kill any existing momentum tween
        if (momentumTween) {
          momentumTween.kill()
        }
        
        // Animate momentum to 0 with smooth easing
        momentumTween = gsap.to(momentumRef, {
          current: 0,
          duration: 1.2,
          ease: "power2.out",
          overwrite: true,
        })
      }
    }

    // Horizontal scroll with trackpad/wheel (only horizontal, not vertical)
    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll (deltaX), ignore vertical scroll (deltaY)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        const delta = e.deltaX * 0.5
        targetPositionRef.current -= delta
        
        // Update momentum for smooth scrolling
        momentumRef.current = -delta * 0.3
      }
      // If it's vertical scroll, don't prevent default and don't move carousel
    }

    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseup", handleMouseUp)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      // Kill any running GSAP animations
      if (momentumTween) {
        momentumTween.kill()
      }
      gsap.killTweensOf(momentumRef)
      gsap.killTweensOf(carousel)
      
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseup", handleMouseUp)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("wheel", handleWheel)
    }
  }, [totalWidth])

  return (
    <section className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4 mb-32 text-center">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-12 text-black">
          The <span className="italic">location</span> gallery
        </h2>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
          <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>
          <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing"
        style={{ userSelect: "none" }}
      >
        <div
          ref={carouselRef}
          className="flex gap-[35px] items-start"
          style={{ willChange: "transform" }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="flex flex-col gap-6 shrink-0"
              style={{ width: `${image.width}px` }}
            >
              <div
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                className="shrink-0 overflow-hidden"
                style={{
                  width: `${image.width}px`,
                  height: `${image.height}px`,
                }}
              >
                <div
                  ref={(el) => {
                    imageInnerRefs.current[index] = el
                  }}
                  className="bg-gray-300 w-full h-full"
                  style={{
                    width: `${image.width}px`,
                    height: `${image.height}px`,
                  }}
                />
              </div>
              <p className="text-[16px] leading-[1.2] text-black font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]">
                {image.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

