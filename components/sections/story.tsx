"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "@/lib/gsap"

interface HoverableWord {
  word: string
  imageId: string
}

interface ImageConfig {
  src: string
  width: number
  height: number
}

const imageConfigs: Record<string, ImageConfig> = {
  panoramic: {
    src: '/Asset/Location Gallery/location-gallery-01.jpg',
    width: 400,
    height: 530, // Portrait 3:4 - larger
  },
  exclusive: {
    src: '/Asset/Location Gallery/location-gallery-02.jpg',
    width: 500,
    height: 500, // Square - larger
  },
  zurich: {
    src: '/Asset/Location Gallery/location-gallery-03.jpg',
    width: 450,
    height: 340, // Landscape 4:3 - larger
  },
  glass: {
    src: '/Asset/Location Gallery/location-gallery-04.jpg',
    width: 430,
    height: 650, // Portrait 2:3 - larger
  },
  alps: {
    src: '/Asset/Location Gallery/location-gallery-05.jpg',
    width: 540,
    height: 360, // Landscape 3:2 - larger
  },
}

export function Story() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [isImageVisible, setIsImageVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const preferredSideRef = useRef<'right' | 'left' | null>(null)
  const positionTweenRef = useRef<gsap.core.Tween | null>(null)

  // Order matters - process longer phrases first to avoid partial matches
  const hoverableWords: HoverableWord[] = [
    { word: "breathtaking panoramic", imageId: "panoramic" },
    { word: "exclusive club", imageId: "exclusive" },
    { word: "Zurich", imageId: "zurich" },
    { word: "glass", imageId: "glass" },
    { word: "alps", imageId: "alps" },
  ]

  // Update position using GSAP for smooth, stable animation
  const updatePosition = (x: number, y: number) => {
    if (!imageRef.current) return
    
    // Kill any existing tween
    if (positionTweenRef.current) {
      positionTweenRef.current.kill()
    }
    
    // Use GSAP for smooth interpolation with ease-out
    positionTweenRef.current = gsap.to(imageRef.current, {
      x: x,
      y: y,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    })
  }

  const calculatePosition = (event: React.MouseEvent<HTMLSpanElement>, imageId: string) => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const config = imageConfigs[imageId]
    if (!config) return { x: 0, y: 0 }
    
    const imageWidth = config.width
    const imageHeight = config.height
    const offset = 10 // Small offset to keep image close to cursor
    
    // Use preferred side if already set, otherwise determine it
    let preferredSide = preferredSideRef.current
    if (!preferredSide) {
      const testX = event.clientX + offset
      preferredSide = testX + imageWidth > viewportWidth - offset ? 'left' : 'right'
      preferredSideRef.current = preferredSide
    }
    
    // Position image relative to mouse cursor based on preferred side
    let x: number
    if (preferredSide === 'right') {
      x = event.clientX + offset
      // If it would go off screen, switch to left
      if (x + imageWidth > viewportWidth - offset) {
        x = event.clientX - imageWidth - offset
        preferredSideRef.current = 'left'
      }
    } else {
      x = event.clientX - imageWidth - offset
      // If it would go off screen, switch to right
      if (x < offset) {
        x = event.clientX + offset
        preferredSideRef.current = 'right'
      }
    }
    
    let y = event.clientY + offset
    
    // Adjust if image would go off the bottom edge
    if (y + imageHeight > viewportHeight - offset) {
      y = event.clientY - imageHeight - offset
    }
    
    // Ensure it doesn't go off the edges
    x = Math.max(offset, Math.min(x, viewportWidth - imageWidth - offset))
    y = Math.max(offset, Math.min(y, viewportHeight - imageHeight - offset))
    
    return { x, y }
  }

  const handleMouseEnter = (imageId: string, event: React.MouseEvent<HTMLSpanElement>) => {
    // Kill any existing tweens first to prevent conflicts
    if (positionTweenRef.current) {
      positionTweenRef.current.kill()
      positionTweenRef.current = null
    }
    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current)
    }
    
    // Reset visibility state to trigger fade in
    setIsImageVisible(false)
    setHoveredImage(imageId)
    
    // Calculate initial position
    const initialPos = calculatePosition(event, imageId)
    
    // Set initial position immediately - X is already correct, Y starts slightly below
    // Use requestAnimationFrame to ensure DOM is ready before setting position
    requestAnimationFrame(() => {
      if (imageRef.current) {
        // Start from slightly below (subtle entrance - 25px)
        const startY = initialPos.y + 25
        // Set both X and Y immediately with no animation, so X doesn't travel from left
        gsap.set(imageRef.current, { 
          x: initialPos.x, 
          y: startY,
        })
        
        // Only animate Y from below to final position (X stays in place, no horizontal movement)
        gsap.to(imageRef.current, {
          y: initialPos.y,
          duration: 0.5,
          ease: "power2.out",
        })
      }
    })
    
    // Trigger fade in animation after a tiny delay to ensure DOM update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsImageVisible(true)
      })
    })
  }

  const handleMouseMove = (imageId: string, event: React.MouseEvent<HTMLSpanElement>) => {
    // Calculate new target position
    const newPos = calculatePosition(event, imageId)
    
    // Update position smoothly with GSAP
    updatePosition(newPos.x, newPos.y)
  }

  const handleMouseLeave = () => {
    // Kill any running position tween
    if (positionTweenRef.current) {
      positionTweenRef.current.kill()
      positionTweenRef.current = null
    }
    
    // Reset preferred side
    preferredSideRef.current = null
    
    // Trigger fade out animation
    setIsImageVisible(false)
    // Remove image after animation completes
    setTimeout(() => {
      setHoveredImage(null)
    }, 200) // Match transition duration
  }



  // Cleanup on unmount
  useEffect(() => {
    const imageElement = imageRef.current
    return () => {
      if (positionTweenRef.current) {
        positionTweenRef.current.kill()
      }
      if (imageElement) {
        gsap.killTweensOf(imageElement)
      }
    }
  }, [])

  const text = `High above the rooftops of Zurich, HAUTE was established over twenty years ago an exclusive club restaurant where glass, light, and the breathtaking panoramic views over the city, lake, and alps merge into an elegant and relaxed atmosphere.`
  
  // Sort by length (longest first) to avoid partial matches
  const sortedWords = [...hoverableWords].sort((a, b) => b.word.length - a.word.length)

  // Split text and create elements
  const renderText = () => {
    const parts: React.ReactNode[] = []
    const matches: Array<{ index: number; word: HoverableWord; endIndex: number }> = []
    
    // Find all matches
    sortedWords.forEach((item) => {
      let searchIndex = 0
      while (true) {
        const index = text.indexOf(item.word, searchIndex)
        if (index === -1) break
        matches.push({
          index,
          word: item,
          endIndex: index + item.word.length,
        })
        searchIndex = index + 1
      }
    })
    
    // Sort matches by index
    matches.sort((a, b) => a.index - b.index)
    
    // Remove overlapping matches (keep first occurrence)
    const nonOverlapping: typeof matches = []
    matches.forEach((match) => {
      const overlaps = nonOverlapping.some(
        (existing) =>
          (match.index >= existing.index && match.index < existing.endIndex) ||
          (match.endIndex > existing.index && match.endIndex <= existing.endIndex) ||
          (match.index <= existing.index && match.endIndex >= existing.endIndex)
      )
      if (!overlaps) {
        nonOverlapping.push(match)
      }
    })
    
    // Build the parts array
    let lastIndex = 0
    let keyIndex = 0
    
    nonOverlapping.forEach((match) => {
      // Add text before the word
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${keyIndex++}`} className="text-[#8b8b8b]">
            {text.substring(lastIndex, match.index)}
          </span>
        )
      }

      // Add the hoverable word
      parts.push(
        <span
          key={`word-${keyIndex++}`}
          className="text-black italic cursor-pointer hover:text-black transition-colors"
          onMouseEnter={(e) => handleMouseEnter(match.word.imageId, e)}
          onMouseMove={(e) => handleMouseMove(match.word.imageId, e)}
          onMouseLeave={handleMouseLeave}
        >
          {match.word.word}
        </span>
      )

      lastIndex = match.endIndex
    })

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex)
      // Check if we need to add a <br /> after "merge"
      const mergeIndex = remainingText.indexOf(' merge')
      if (mergeIndex !== -1) {
        const mergeEndIndex = mergeIndex + 6 // " merge" is 6 characters (space + "merge")
        // Add text up to and including " merge"
        parts.push(
          <span key={`text-${keyIndex++}`} className="text-[#8b8b8b]">
            {remainingText.substring(0, mergeEndIndex)}
          </span>
        )
        // Add <br />
        parts.push(<br key={`br-${keyIndex++}`} />)
        // Add remaining text after "merge"
        if (mergeEndIndex < remainingText.length) {
          parts.push(
            <span key={`text-${keyIndex++}`} className="text-[#8b8b8b]">
              {remainingText.substring(mergeEndIndex)}
            </span>
          )
        }
      } else {
        parts.push(
          <span key={`text-${keyIndex++}`} className="text-[#8b8b8b]">
            {remainingText}
          </span>
        )
      }
    }

    return parts
  }

  return (
    <section id="story-section" className="relative py-32 bg-[#ECEBE8] min-h-[400px]">
      <div className="container mx-auto px-4">
        <p className="text-[68px] leading-[1.4] font-normal font-serif indent-[2.5em]">
          {renderText()}
        </p>

        {/* Image that appears on hover */}
        {hoveredImage && imageConfigs[hoveredImage] && (
          <div
            ref={imageRef}
            className="fixed pointer-events-none z-50"
            style={{
              left: 0,
              top: 0,
              opacity: isImageVisible ? 1 : 0,
              filter: isImageVisible ? 'blur(0px)' : 'blur(8px)',
              transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity, filter, transform',
              transform: 'translate(0, 0)', // Initial transform to prevent flash
            }}
          >
            <div 
              className="rounded-sm border border-gray-300 overflow-hidden shadow-lg"
              style={{
                width: `${imageConfigs[hoveredImage].width}px`,
                height: `${imageConfigs[hoveredImage].height}px`,
                flexShrink: 0,
              }}
            >
              <Image
                src={imageConfigs[hoveredImage].src}
                alt={hoveredImage}
                width={imageConfigs[hoveredImage].width}
                height={imageConfigs[hoveredImage].height}
                className="w-full h-full object-cover"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        )}

        {/* Two paragraphs side by side */}
        <div className="mt-16 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
          <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
            On the 13th floor, the glass-enclosed terrace and bar invite guests to begin the evening in style with an aperitif.
          </p>
          <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
            One floor higher, the club restaurant welcomes its guests with a sense of spaciousness, clean design, and fresh perspectives - offering first-class regional cuisine and sustainable indulgence.
          </p>
        </div>
      </div>
    </section>
  )
}

