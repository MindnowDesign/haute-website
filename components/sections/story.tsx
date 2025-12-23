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
    { word: "Alps", imageId: "alps" },
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
    if (distance < 0.5) {
      currentPositionRef.current = { ...target }
      setImagePosition({ ...target })
      animationLoopRef.current = null
      return
    }
    
    // Ease-out: faster when far, slower when close
    // Use a higher lerp factor when far, lower when close
    // This creates the ease-out effect (starts fast, slows down)
    const maxDistance = 300 // Maximum distance for normalization
    const normalizedDistance = Math.min(distance / maxDistance, 1)
    
    // Apply cubic curve to make the effect even more pronounced
    // Cube the normalized distance to create a very dramatic ease-out
    const easedDistance = normalizedDistance * normalizedDistance * normalizedDistance
    
    // Lerp factor: higher when far (0.55), lower when close (0.04)
    // This makes it start very fast and slow down significantly as it approaches - very pronounced
    const lerpFactor = 0.04 + (easedDistance * 0.51) // Range: 0.04 to 0.55
    
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

  const text = `High above the rooftops of Zurich, HAUTE was established over twenty years ago an exclusive club restaurant where glass, light, and the breathtaking panoramic views over the city, lake, and Alps merge into an elegant and relaxed atmosphere.`
  
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
          className="text-black underline cursor-pointer hover:text-black transition-colors"
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
      parts.push(
        <span key={`text-${keyIndex++}`} className="text-[#8b8b8b]">
          {text.substring(lastIndex)}
        </span>
      )
    }

    return parts
  }

  return (
    <section className="relative py-24 bg-[#ECEBE8] min-h-[400px]">
      <div className="container mx-auto px-4">
        <p className="text-[58px] leading-[1.4] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] indent-[3em]">
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
      </div>
    </section>
  )
}

