"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { CTAButton } from "@/components/ui/cta-button"

export function MembershipIntro() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paragraph1Ref = useRef<HTMLParagraphElement>(null)
  const paragraph2Ref = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLParagraphElement | HTMLAnchorElement>(null)

  // Line-by-line mask animation for paragraphs
  useEffect(() => {
    if (!paragraph1Ref.current || !paragraph2Ref.current || !containerRef.current) return

    const paragraph1 = paragraph1Ref.current
    const paragraph2 = paragraph2Ref.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Function to wrap text into lines and create mask effect
            const animateLines = (element: HTMLElement) => {
              const text = element.textContent || ""
              const lines: HTMLElement[] = []
              
              // Create a temporary element to measure line breaks
              const tempDiv = document.createElement("div")
              tempDiv.style.position = "absolute"
              tempDiv.style.visibility = "hidden"
              tempDiv.style.width = `${element.offsetWidth}px`
              tempDiv.style.fontSize = window.getComputedStyle(element).fontSize
              tempDiv.style.fontFamily = window.getComputedStyle(element).fontFamily
              tempDiv.style.lineHeight = window.getComputedStyle(element).lineHeight
              tempDiv.style.padding = window.getComputedStyle(element).padding
              document.body.appendChild(tempDiv)
              
              const words = text.split(" ")
              let currentLine = ""
              let previousHeight = 0
              
              words.forEach((word, index) => {
                const testText = currentLine + (currentLine ? " " : "") + word
                tempDiv.textContent = testText
                const currentHeight = tempDiv.offsetHeight
                
                if (currentHeight > previousHeight && currentLine) {
                  // Line break occurred, create line wrapper
                  const lineWrapper = document.createElement("span")
                  lineWrapper.style.display = "block"
                  lineWrapper.style.overflow = "hidden"
                  lineWrapper.style.position = "relative"
                  
                  const lineText = document.createElement("span")
                  lineText.style.display = "block"
                  lineText.textContent = currentLine
                  lineText.style.transform = "translateY(-100%)"
                  
                  lineWrapper.appendChild(lineText)
                  lines.push(lineText)
                  
                  currentLine = word
                } else {
                  currentLine = testText
                }
                previousHeight = currentHeight
              })
              
              if (currentLine) {
                const lineWrapper = document.createElement("span")
                lineWrapper.style.display = "block"
                lineWrapper.style.overflow = "hidden"
                lineWrapper.style.position = "relative"
                
                const lineText = document.createElement("span")
                lineText.style.display = "block"
                lineText.textContent = currentLine
                lineText.style.transform = "translateY(-100%)"
                
                lineWrapper.appendChild(lineText)
                lines.push(lineText)
              }
              
              document.body.removeChild(tempDiv)
              
              // Clear and append line wrappers
              element.textContent = ""
              lines.forEach((lineText) => {
                const wrapper = lineText.parentElement as HTMLElement
                element.appendChild(wrapper)
              })
              
              return lines
            }

            const lines1 = animateLines(paragraph1)
            const lines2 = animateLines(paragraph2)

            // Animate paragraph 1 lines (slide down from top with smooth easing)
            // Delay to let title animate first
            gsap.to(lines1, {
              y: 0,
              duration: 1.0,
              stagger: 0.1,
              delay: 0.5,
              ease: "power2.out",
            })

            // Animate paragraph 2 lines with delay
            gsap.to(lines2, {
              y: 0,
              duration: 1.0,
              stagger: 0.1,
              delay: 0.8,
              ease: "power2.out",
            })

            // Unobserve after animation starts
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Title mask animation
  useEffect(() => {
    if (!titleRef.current) return

    const title = titleRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Function to wrap title into lines and create mask effect (preserving HTML)
            const animateTitleLines = (element: HTMLElement) => {
              const originalHTML = element.innerHTML
              const lines: HTMLElement[] = []
              
              // Create a temporary element to measure line breaks (with same HTML)
              const tempDiv = document.createElement("div")
              tempDiv.style.position = "absolute"
              tempDiv.style.visibility = "hidden"
              tempDiv.style.width = `${element.offsetWidth}px`
              tempDiv.style.fontSize = window.getComputedStyle(element).fontSize
              tempDiv.style.fontFamily = window.getComputedStyle(element).fontFamily
              tempDiv.style.lineHeight = window.getComputedStyle(element).lineHeight
              document.body.appendChild(tempDiv)
              
              // Split by words but preserve HTML structure
              const textNodes: string[] = []
              const words = originalHTML.split(/(\s+)/)
              
              let currentLineHTML = ""
              let previousHeight = 0
              
              words.forEach((word, index) => {
                const testHTML = currentLineHTML + word
                tempDiv.innerHTML = testHTML
                const currentHeight = tempDiv.offsetHeight
                
                if (currentHeight > previousHeight && currentLineHTML.trim()) {
                  // Line break occurred, create line wrapper
                  const lineWrapper = document.createElement("span")
                  lineWrapper.style.display = "block"
                  lineWrapper.style.overflow = "hidden"
                  lineWrapper.style.position = "relative"
                  
                  const lineText = document.createElement("span")
                  lineText.style.display = "block"
                  lineText.innerHTML = currentLineHTML.trim()
                  lineText.style.transform = "translateY(-100%)"
                  
                  lineWrapper.appendChild(lineText)
                  lines.push(lineText)
                  
                  currentLineHTML = word
                } else {
                  currentLineHTML = testHTML
                }
                previousHeight = currentHeight
              })
              
              if (currentLineHTML.trim()) {
                const lineWrapper = document.createElement("span")
                lineWrapper.style.display = "block"
                lineWrapper.style.overflow = "hidden"
                lineWrapper.style.position = "relative"
                
                const lineText = document.createElement("span")
                lineText.style.display = "block"
                lineText.innerHTML = currentLineHTML.trim()
                lineText.style.transform = "translateY(-100%)"
                
                lineWrapper.appendChild(lineText)
                lines.push(lineText)
              }
              
              document.body.removeChild(tempDiv)
              
              // Clear and append line wrappers
              element.innerHTML = ""
              lines.forEach((lineText) => {
                const wrapper = lineText.parentElement as HTMLElement
                element.appendChild(wrapper)
              })
              
              return lines
            }

            const titleLines = animateTitleLines(title)

            // Animate title lines (slide down from top with smooth easing)
            gsap.to(titleLines, {
              y: 0,
              duration: 1.0,
              stagger: 0.1,
              ease: "power2.out",
            })

            // Unobserve after animation starts
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    observer.observe(title)

    return () => {
      observer.disconnect()
    }
  }, [])

  // CTA button mask animation
  useEffect(() => {
    if (!ctaRef.current) return

    const cta = ctaRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Function to wrap CTA text into lines and create mask effect (preserving HTML structure)
            const animateCTALines = (element: HTMLElement) => {
              // Find the inner span that contains the actual text
              const innerSpan = element.querySelector('span[class*="mx-2"]') as HTMLElement
              if (!innerSpan) return []
              
              // Extract only the text content from the inner span
              const textContent = innerSpan.textContent || ""
              const lines: HTMLElement[] = []
              
              // Create a temporary element to measure line breaks with same structure
              const tempDiv = document.createElement("div")
              tempDiv.style.position = "absolute"
              tempDiv.style.visibility = "hidden"
              tempDiv.style.width = `${element.offsetWidth}px`
              tempDiv.style.fontSize = window.getComputedStyle(element).fontSize
              tempDiv.style.fontFamily = window.getComputedStyle(element).fontFamily
              tempDiv.style.lineHeight = window.getComputedStyle(element).lineHeight
              tempDiv.style.padding = window.getComputedStyle(element).padding
              document.body.appendChild(tempDiv)
              
              // Split text content by words
              const words = textContent.split(/\s+/).filter(w => w.length > 0)
              let currentLine = ""
              let previousHeight = 0
              
              words.forEach((word) => {
                const testText = currentLine + (currentLine ? " " : "") + word
                // Recreate the full HTML structure to measure accurately
                const testWrapper = document.createElement("span")
                testWrapper.className = "inline-block"
                const testInner = document.createElement("span")
                testInner.className = "inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4"
                testInner.textContent = testText
                testWrapper.appendChild(document.createTextNode("["))
                testWrapper.appendChild(testInner)
                testWrapper.appendChild(document.createTextNode("]"))
                
                tempDiv.innerHTML = ""
                tempDiv.appendChild(testWrapper)
                const currentHeight = tempDiv.offsetHeight
                
                if (currentHeight > previousHeight && currentLine) {
                  // Line break occurred, create line wrapper
                  const lineWrapper = document.createElement("span")
                  lineWrapper.style.display = "block"
                  lineWrapper.style.overflow = "hidden"
                  lineWrapper.style.position = "relative"
                  
                  const lineText = document.createElement("span")
                  lineText.style.display = "block"
                  // Reconstruct HTML structure for this line
                  const lineWrapperSpan = document.createElement("span")
                  lineWrapperSpan.className = "inline-block"
                  const lineInnerSpan = document.createElement("span")
                  lineInnerSpan.className = "inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4"
                  lineInnerSpan.textContent = currentLine
                  lineWrapperSpan.appendChild(document.createTextNode("["))
                  lineWrapperSpan.appendChild(lineInnerSpan)
                  lineWrapperSpan.appendChild(document.createTextNode("]"))
                  lineText.appendChild(lineWrapperSpan)
                  lineText.style.transform = "translateY(-100%)"
                  
                  lineWrapper.appendChild(lineText)
                  lines.push(lineText)
                  
                  currentLine = word
                } else {
                  currentLine = testText
                }
                previousHeight = currentHeight
              })
              
              if (currentLine) {
                const lineWrapper = document.createElement("span")
                lineWrapper.style.display = "block"
                lineWrapper.style.overflow = "hidden"
                lineWrapper.style.position = "relative"
                
                const lineText = document.createElement("span")
                lineText.style.display = "block"
                // Reconstruct HTML structure for this line
                const lineWrapperSpan = document.createElement("span")
                lineWrapperSpan.className = "inline-block"
                const lineInnerSpan = document.createElement("span")
                lineInnerSpan.className = "inline-block mx-2 transition-all duration-300 ease-out group-hover:mx-4"
                lineInnerSpan.textContent = currentLine
                lineWrapperSpan.appendChild(document.createTextNode("["))
                lineWrapperSpan.appendChild(lineInnerSpan)
                lineWrapperSpan.appendChild(document.createTextNode("]"))
                lineText.appendChild(lineWrapperSpan)
                lineText.style.transform = "translateY(-100%)"
                
                lineWrapper.appendChild(lineText)
                lines.push(lineText)
              }
              
              document.body.removeChild(tempDiv)
              
              // Clear and append line wrappers
              element.innerHTML = ""
              lines.forEach((lineText) => {
                const wrapper = lineText.parentElement as HTMLElement
                element.appendChild(wrapper)
              })
              
              return lines
            }

            const ctaLines = animateCTALines(cta)

            // Animate CTA lines (slide down from top with smooth easing)
            // Delay to let title animate first
            gsap.to(ctaLines, {
              y: 0,
              duration: 1.0,
              stagger: 0.1,
              delay: 0.3,
              ease: "power2.out",
            })

            // Unobserve after animation starts
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    observer.observe(cta)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="relative py-32 bg-[#ECEBE8]">
      <div 
        ref={containerRef}
        className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-24 md:gap-[98px] items-start"
      >
          {/* Left side - Title and CTA */}
          <div className="flex flex-col gap-12 flex-1">
            <h2 
              ref={titleRef}
              className="text-[76px] leading-tight font-serif text-black"
            >
              For members. Personal.{" "}
              <span className="italic">Exclusive</span>. Connected.
            </h2>
            <CTAButton ref={ctaRef}>Become a member</CTAButton>
          </div>

          {/* Right side - Description paragraphs */}
          <div className="flex flex-col gap-12 flex-1">
            <p 
              ref={paragraph1Ref}
              className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]"
            >
              HAUTE is a retreat for members – and their guests. It offers an ideal setting for both business and private encounters. Those who are here, belong here. People come together, cultivate valuable connections, and exchange ideas and inspiration in an elegant, relaxed atmosphere.
            </p>
            <p 
              ref={paragraph2Ref}
              className="text-[18px] leading-[1.5] text-black/60 font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif]"
            >
              Our team creates the perfect environment for engaging conversations and delightful moments, ensuring with great attention to detail that everyone feels welcome and at home at all times.
            </p>
          </div>
        </div>
    </section>
  )
}

