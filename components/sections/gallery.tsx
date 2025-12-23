"use client"

import { useEffect, useRef } from "react"

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

  // Generate 12 images with different heights and widths
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    width: [401, 394, 262, 394, 401, 394, 262, 394, 401, 394, 262, 394][i],
    height: [449, 256, 404, 321, 449, 256, 404, 321, 449, 256, 404, 321][i],
    text: `[ LOREM IPSUM ${i + 1} ]`,
  }))

  // Duplicate images for infinite scroll
  const duplicatedImages = [...images, ...images]

  // Calculate total width of one set
  const totalWidth = images.reduce((sum, img) => sum + img.width + 35, 0)

  // Smooth interpolation (lerp)
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  useEffect(() => {
    if (!carouselRef.current || !containerRef.current) return

    const carousel = carouselRef.current
    const container = containerRef.current

    // Update carousel position with smooth interpolation
    const updatePosition = () => {
      if (!carousel) return
      
      // Calculate scroll velocity
      const currentPosition = positionRef.current
      const velocity = currentPosition - lastPositionRef.current
      scrollVelocityRef.current = lerp(scrollVelocityRef.current, velocity, 0.3)
      lastPositionRef.current = currentPosition
      
      // Smooth interpolation to target position
      positionRef.current = lerp(positionRef.current, targetPositionRef.current, 0.1)
      
      // Handle infinite scroll reset
      if (Math.abs(targetPositionRef.current) >= totalWidth) {
        targetPositionRef.current = 0
        positionRef.current = 0
      } else if (targetPositionRef.current > 0) {
        targetPositionRef.current = -totalWidth
        positionRef.current = -totalWidth
      }

      carousel.style.transform = `translateX(${positionRef.current}px)`

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
          // Reset when not scrolling with smooth easing
          imageEl.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          imageEl.style.transition = "clip-path 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)"
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
      container.style.cursor = "grabbing"
      e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startXRef.current) * 1.5 // Scroll speed multiplier
      targetPositionRef.current = scrollLeftRef.current + walk // Inverted for mouse drag
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      container.style.cursor = "grab"
    }

    const handleMouseLeave = () => {
      isDraggingRef.current = false
      container.style.cursor = "grab"
    }

    // Horizontal scroll with trackpad/wheel (only horizontal, not vertical)
    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll (deltaX), ignore vertical scroll (deltaY)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        targetPositionRef.current -= e.deltaX * 0.5 // Correct direction
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
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseup", handleMouseUp)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("wheel", handleWheel)
    }
  }, [totalWidth])

  return (
    <section className="relative py-24 bg-[#ECEBE8] overflow-hidden">
      <div 
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing"
        style={{ userSelect: "none" }}
      >
        <div
          ref={carouselRef}
          className="flex gap-[35px] items-end"
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

