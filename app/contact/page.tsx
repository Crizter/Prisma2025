"use client"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "../components/Loading"

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false)
//     })
//   }, [])

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading key="loading" />
      ) : (
        <main className="container mx-auto px-4 py-8 pt-40 bg-transparent relative min-h-screen">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-gothic text-red-500 mb-8 text-center
            [text-shadow:0_0_10px_rgba(255,0,0,0.5)]">
            Contact
          </h1>
          {/* Add contact content here */}
        </main>
      )}
    </AnimatePresence>
  )
} 