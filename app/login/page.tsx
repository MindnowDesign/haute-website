"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GlideOverButton } from "@/components/ui/glide-over-button"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    firstNameSurname: "",
    memberNo: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

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
    <main className="min-h-screen pt-20 bg-[#ECEBE8]">
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
              <div className="relative w-full h-[700px] bg-gray-200">
                {/* Placeholder for image - replace with Next.js Image component when image is available */}
                {/* Example:
                <Image
                  src="/path-to-image.jpg"
                  alt="Login"
                  fill
                  className="object-cover"
                  priority
                />
                */}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

