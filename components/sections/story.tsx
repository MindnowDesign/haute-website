"use client"

import { useState, useEffect, useRef } from "react"

interface HoverableWord {
  word: string
  imageId: string
}

export function Story() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isImageVisible, setIsImageVisible] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const currentPositionRef = useRef({ x: 0, y: 0 })
  const preferredSideRef = useRef<'right' | 'left' | null>(null)
  const animationLoopRef = useRef<number | null>(null)

  // Order matters - process longer phrases first to avoid partial matches
  const hoverableWords: HoverableWord[] = [
    { word: "breathtaking panoramic", imageId: "panoramic" },
    { word: "exclusive club", imageId: "exclusive" },
    { word: "Zurich", imageId: "zurich" },
    { word: "glass", imageId: "glass" },
    { word: "alps", imageId: "alps" },
  ]

  // Smooth interpolation function
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor
  }

  // Animation loop that smoothly interpolates position with ease-out effect
  const animatePosition = () => {
    const current = currentPositionRef.current
    const target = targetPositionRef.current
    
    // Calculate distance
    const dx = target.x - current.x
    const dy = target.y - current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // If we're close enough, snap to target
    if (distance < 1.5) {
      currentPositionRef.current = { ...target }
      setImagePosition({ ...target })
      animationLoopRef.current = null
      return
    }
    
    // More stable easing: less dramatic curve for smoother, more predictable movement
    const maxDistance = 200 // Reduced max distance for faster normalization
    const normalizedDistance = Math.min(distance / maxDistance, 1)
    
    // Use a gentler quadratic curve instead of cubic for more stability
    const easedDistance = normalizedDistance * normalizedDistance
    
    // Lerp factor: higher minimum (0.12) and lower maximum (0.35) for more stable, responsive movement
    // This creates a smoother, less "jittery" animation
    const lerpFactor = 0.12 + (easedDistance * 0.23) // Range: 0.12 to 0.35
    
    // Interpolate
    current.x = lerp(current.x, target.x, lerpFactor)
    current.y = lerp(current.y, target.y, lerpFactor)
    
    setImagePosition({ x: current.x, y: current.y })
    
    // Continue animation
    animationLoopRef.current = requestAnimationFrame(animatePosition)
  }

  const calculatePosition = (event: React.MouseEvent<HTMLSpanElement>) => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const imageWidth = 219
    const imageHeight = 294
    const offset = 20
    
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
    // Reset visibility state to trigger fade in
    setIsImageVisible(false)
    setHoveredImage(imageId)
    
    // Calculate and set initial position immediately (no movement, just appear in place)
    const initialPos = calculatePosition(event)
    currentPositionRef.current = { ...initialPos }
    targetPositionRef.current = { ...initialPos }
    setImagePosition(initialPos)
    
    // DON'T start animation loop yet - only when mouse moves
    // Animation smooth will start on first mouse move
    
    // Trigger fade in animation after a tiny delay to ensure DOM update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsImageVisible(true)
      })
    })
  }

  const handleMouseMove = (imageId: string, event: React.MouseEvent<HTMLSpanElement>) => {
    // Calculate new target position
    const newPos = calculatePosition(event)
    
    // Update target position (the image will smoothly interpolate to this)
    targetPositionRef.current = newPos
    
    // Start animation loop if not already running (this enables smooth following)
    if (!animationLoopRef.current) {
      animationLoopRef.current = requestAnimationFrame(animatePosition)
    }
  }

  const handleMouseLeave = () => {
    // Stop animation loop
    if (animationLoopRef.current) {
      cancelAnimationFrame(animationLoopRef.current)
      animationLoopRef.current = null
    }
    
    // Reset preferred side
    preferredSideRef.current = null
    
    // Trigger fade out animation
    setIsImageVisible(false)
    // Remove image after animation completes
    setTimeout(() => {
      setHoveredImage(null)
    }, 150) // Match transition duration
  }



  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationLoopRef.current) {
        cancelAnimationFrame(animationLoopRef.current)
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

        {/* Image placeholder that appears on hover */}
        {hoveredImage && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: `${imagePosition.x}px`,
              top: `${imagePosition.y}px`,
              opacity: isImageVisible ? 1 : 0,
              filter: isImageVisible ? 'blur(0px)' : 'blur(8px)',
              transition: 'opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1), filter 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)',
              transform: "translateY(0)",
              willChange: 'opacity, filter, transform',
            }}
          >
            <div 
              className="bg-gray-400 rounded-sm border border-gray-300"
              style={{
                width: '219px',
                height: '294px',
                aspectRatio: '219 / 294',
                flexShrink: 0,
                minWidth: '219px',
                minHeight: '294px',
                maxWidth: '219px',
                maxHeight: '294px',
              }}
            />
          </div>
        )}

        {/* Two paragraphs side by side */}
        <div className="mt-24 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
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

