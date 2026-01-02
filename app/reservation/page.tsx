"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GlideOverButton } from "@/components/ui/glide-over-button"

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    memberNumber: "",
    name: "",
    surname: "",
    email: "",
    confirmEmail: "",
    date: "",
    mealType: "",
    time: "",
    numberOfPeople: "",
    comments: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const lunchTimes = [
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
  ]

  const dinnerTimes = [
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
  ]

  const availableTimes = formData.mealType === "Lunch" ? lunchTimes : dinnerTimes

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    // Reset time when meal type changes
    if (field === "mealType") {
      setFormData((prev) => ({ ...prev, time: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.memberNumber.trim()) {
      newErrors.memberNumber = "Member number is required"
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = "Please confirm your email"
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    if (!formData.mealType) {
      newErrors.mealType = "Please select Lunch or Dinner"
    }
    if (!formData.time) {
      newErrors.time = "Time is required"
    }
    if (!formData.numberOfPeople) {
      newErrors.numberOfPeople = "Number of people is required"
    } else {
      const num = parseInt(formData.numberOfPeople)
      if (isNaN(num) || num < 1 || num > 7) {
        newErrors.numberOfPeople = "Please enter a number between 1 and 7"
      }
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
      <section className="relative py-32 bg-[#ECEBE8] overflow-hidden">
        <div className="container mx-auto px-4 mb-32">
          {/* Header */}
          <div className="max-w-6xl mx-auto text-center mb-32">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-20 text-black">
              Online-Reservations
            </h1>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-left">
              <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
                Dear Member, We are always pleased to receive your requests online. Our team carefully reviews each reservation to ensure we can provide you with the exceptional experience you expect.
              </p>
              <p className="text-[20px] leading-relaxed text-[#8b8b8b] font-normal font-['Helvetica Neue', Helvetica, Arial, sans-serif] flex-1">
                Please note that we can only deal with requests at short notice (less than 24 hours in advance) by telephone. Please call{" "}
                <a href="tel:+41433447272" className="underline hover:opacity-70 transition-opacity text-black/70">
                  +41 43 344 72 72
                </a>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Member Number */}
              <div>
                <Label htmlFor="memberNumber" className="text-black text-base">
                  Member N°<span className="text-black ml-1">*</span>
                </Label>
                <Input
                  id="memberNumber"
                  type="text"
                  value={formData.memberNumber}
                  onChange={(e) => handleChange("memberNumber", e.target.value)}
                  className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                  placeholder="Enter member number"
                />
                {errors.memberNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.memberNumber}</p>
                )}
              </div>

              {/* Name and Surname */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-black text-base">
                    Name<span className="text-black ml-1">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="surname" className="text-black text-base">
                    Surname<span className="text-black ml-1">*</span>
                  </Label>
                  <Input
                    id="surname"
                    type="text"
                    value={formData.surname}
                    onChange={(e) => handleChange("surname", e.target.value)}
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    placeholder="Surname"
                  />
                  {errors.surname && (
                    <p className="text-sm text-red-600 mt-1">{errors.surname}</p>
                  )}
                </div>
              </div>

              {/* Email and Confirm Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-black text-base">
                    email<span className="text-black ml-1">*</span>
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
                  <Label htmlFor="confirmEmail" className="text-black text-base">
                    Confirm email<span className="text-black ml-1">*</span>
                  </Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    value={formData.confirmEmail}
                    onChange={(e) => handleChange("confirmEmail", e.target.value)}
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    placeholder="Confirm email"
                  />
                  {errors.confirmEmail && (
                    <p className="text-sm text-red-600 mt-1">{errors.confirmEmail}</p>
                  )}
                </div>
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="date" className="text-black text-base">
                  Date<span className="text-black ml-1">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                />
                {errors.date && (
                  <p className="text-sm text-red-600 mt-1">{errors.date}</p>
                )}
              </div>

              {/* Lunch / Dinner */}
              <div>
                <Label htmlFor="mealType" className="text-black text-base">
                  Lunch / Dinner<span className="text-black ml-1">*</span>
                </Label>
                <Select
                  value={formData.mealType}
                  onValueChange={(value) => handleChange("mealType", value)}
                >
                  <SelectTrigger
                    id="mealType"
                    className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                  >
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ECEBE8] border-black">
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
                {errors.mealType && (
                  <p className="text-sm text-red-600 mt-1">{errors.mealType}</p>
                )}
              </div>

              {/* Time */}
              {formData.mealType && (
                <div>
                  <Label htmlFor="time" className="text-black text-base">
                    Time
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => handleChange("time", value)}
                  >
                    <SelectTrigger
                      id="time"
                      className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                    >
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ECEBE8] border-black">
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-sm text-red-600 mt-1">{errors.time}</p>
                  )}
                </div>
              )}

              {/* Number of people */}
              <div>
                <Label htmlFor="numberOfPeople" className="text-black text-base">
                  Number of people<span className="text-black ml-1">*</span>
                </Label>
                <Input
                  id="numberOfPeople"
                  type="number"
                  min="1"
                  max="7"
                  value={formData.numberOfPeople}
                  onChange={(e) => handleChange("numberOfPeople", e.target.value)}
                  className="mt-3 h-12 text-base px-4 border-black bg-[#ECEBE8] text-black"
                  placeholder="1-7"
                />
                {errors.numberOfPeople && (
                  <p className="text-sm text-red-600 mt-1">{errors.numberOfPeople}</p>
                )}
                <p className="text-sm text-black/70 mt-2">
                  Please enter a number from <strong>1</strong> to <strong>7</strong>.
                </p>
                <p className="text-sm text-black/70 mt-1">
                  Please contact us by phone for reservations for 8 or more people.{" "}
                  <a href="tel:+41433447272" className="underline hover:opacity-70 transition-opacity">
                    +41 43 344 72 72
                  </a>
                </p>
              </div>

              {/* Comments */}
              <div>
                <Label htmlFor="comments" className="text-black text-base">
                  Comments
                </Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleChange("comments", e.target.value)}
                  className="mt-3 text-base px-4 py-3 border-black bg-[#ECEBE8] text-black"
                  placeholder="Do you have any comments or special requests?"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <GlideOverButton
                  type="submit"
                  className="w-full h-10 px-4 py-2 bg-black text-[#ECEBE8] rounded-none"
                >
                  Submit Reservation
                </GlideOverButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

