"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GlideOverButton } from "@/components/ui/glide-over-button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function MembershipAdmission() {
  const heroImageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Parallax effect per l'hero image
      if (heroImageRef.current) {
        const imageContainer = heroImageRef.current
        const container = imageContainer.parentElement
        if (container) {
          const containerHeight = container.offsetHeight
          const maxMovement = containerHeight * 0.06
          
          gsap.fromTo(
            imageContainer,
            {
              y: 0,
            },
            {
              y: -maxMovement,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.membershipType) {
      newErrors.membershipType = "Please select a membership type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)
    
    setIsSubmitting(false)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      membershipType: "",
      message: "",
    })
    
    alert("Thank you for your application. We will contact you soon.")
  }

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#ECEBE8] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
            Admission procedure
          </h1>
        </div>

        {/* Two paragraphs side by side */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-left">
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Membership at HAUTE is granted through a carefully curated process based on personal recommendation. Each prospective member requires two references from existing members, ensuring our community maintains its exclusive character.
            </p>
            <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
              Memberships operate on an annual cycle from January to December, with automatic renewal unless termination is requested by the end of October. New memberships are allocated at the beginning of each year, and we maintain a waiting list throughout the year.
            </p>
          </div>
        </div>

        {/* Hero Image and Membership Tiers */}
        <div className="mb-48">
          {/* Hero Image - aspect ratio 1145:545 */}
          <div 
            className="w-full bg-gray-400 relative overflow-hidden mb-48"
            style={{
              aspectRatio: '1145 / 545',
            }}
          >
            <div
              ref={heroImageRef}
              className="absolute inset-0 bg-gray-400"
              style={{
                backgroundImage: `url(https://i.pinimg.com/1200x/5e/7c/84/5e7c84f026dd7f46140495a42a99f35a.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '110%',
                top: '-5%',
              }}
            />
          </div>

          {/* Membership Tiers Section */}
          <div className="container mx-auto px-4 my-20">
            <div className="max-w-6xl mx-auto text-left">
              {/* Title */}
              <h2 className="text-[64px] leading-tight font-serif text-black mb-12 text-center">
                Membership tiers
              </h2>
              
              {/* Membership Tiers Cards */}
              <div className="flex flex-col md:flex-row gap-6">
                  {/* Individual Card */}
                  <div 
                    className="flex-1 bg-[#ECEBE8] cursor-pointer transition-all duration-500 ease-out"
                    onClick={() => setExpandedCard(expandedCard === 'individual' ? null : 'individual')}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '552 / 300' }}>
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out"
                        style={{
                          backgroundImage: `url(https://i.pinimg.com/736x/ee/6a/c4/ee6ac47e6d4b713b20c361e34defac12.jpg)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          transform: expandedCard === 'individual' ? 'scale(1.1)' : 'scale(1)',
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-serif mb-4 text-black italic flex items-center justify-between">
                        <span>Individual</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${expandedCard === 'individual' ? 'rotate-180' : ''}`} />
                      </h3>
                      <div 
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: expandedCard === 'individual' ? '500px' : '0',
                          opacity: expandedCard === 'individual' ? 1 : 0,
                        }}
                      >
                        <p className="text-[18px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] !text-[#8b8b8b]">
                          The Individual membership, priced at CHF 2,000.00 annually, is personal and non-transferable.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Partner Card */}
                  <div 
                    className="flex-1 bg-[#ECEBE8] cursor-pointer transition-all duration-500 ease-out"
                    onClick={() => setExpandedCard(expandedCard === 'partner' ? null : 'partner')}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '552 / 300' }}>
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out"
                        style={{
                          backgroundImage: `url(https://i.pinimg.com/736x/91/45/f2/9145f2ad97120c7e8f16dd2503976716.jpg)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          transform: expandedCard === 'partner' ? 'scale(1.1)' : 'scale(1)',
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-serif mb-4 text-black italic flex items-center justify-between">
                        <span>Partner</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${expandedCard === 'partner' ? 'rotate-180' : ''}`} />
                      </h3>
                      <div 
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: expandedCard === 'partner' ? '500px' : '0',
                          opacity: expandedCard === 'partner' ? 1 : 0,
                        }}
                      >
                        <p className="text-[18px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] !text-[#8b8b8b]">
                          The Partner membership, at CHF 2,400.00 per year, includes a second card for a spouse or life partner residing at the same address.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corporate Card */}
                  <div 
                    className="flex-1 bg-[#ECEBE8] cursor-pointer transition-all duration-500 ease-out"
                    onClick={() => setExpandedCard(expandedCard === 'corporate' ? null : 'corporate')}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '552 / 300' }}>
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out"
                        style={{
                          backgroundImage: `url(https://i.pinimg.com/1200x/d3/0a/f5/d30af5bbcd44551c15d32380934d61f9.jpg)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          transform: expandedCard === 'corporate' ? 'scale(1.1)' : 'scale(1)',
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-serif mb-4 text-black italic flex items-center justify-between">
                        <span>Corporate</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${expandedCard === 'corporate' ? 'rotate-180' : ''}`} />
                      </h3>
                      <div 
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: expandedCard === 'corporate' ? '500px' : '0',
                          opacity: expandedCard === 'corporate' ? 1 : 0,
                        }}
                      >
                        <p className="text-[18px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] !text-[#8b8b8b]">
                          For corporate clients, our Corporate membership is available at CHF 6,000.00 per year for five individuals, with the flexibility to extend to a maximum of eight persons at an additional CHF 1,200.00 per person.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Membership Application Form */}
        <div className="container mx-auto px-4 mt-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[64px] leading-tight font-serif mb-12 text-black text-center">
              Membership application
            </h2>
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-black text-base">
                    First Name<span className="text-black ml-1">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-black text-base">
                    Last Name<span className="text-black ml-1">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-black text-base">
                    Email<span className="text-black ml-1">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-black text-base">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Membership Type */}
              <div>
                <Label htmlFor="membershipType" className="text-black text-base">
                  Membership Type<span className="text-black ml-1">*</span>
                </Label>
                <Select
                  value={formData.membershipType}
                  onValueChange={(value) => handleChange("membershipType", value)}
                >
                  <SelectTrigger
                    id="membershipType"
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                  >
                    <SelectValue placeholder="Select membership type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ECEBE8] border-black">
                    <SelectItem value="individual">Individual (CHF 2,000.00/year)</SelectItem>
                    <SelectItem value="partner">Partner (CHF 2,400.00/year)</SelectItem>
                    <SelectItem value="corporate">Corporate (CHF 6,000.00/year)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.membershipType && (
                  <p className="text-sm text-red-600 mt-1">{errors.membershipType}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-black text-base">
                  Message / Additional Information
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="mt-3 text-base px-4 py-3 border-black bg-[#ECEBE8] text-black"
                  placeholder="Please include information about your references or any additional details..."
                  rows={6}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <GlideOverButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 px-4 py-2 bg-black text-[#ECEBE8] rounded-none text-base"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </GlideOverButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

