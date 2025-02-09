"use client"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "../components/Loading"
import Background from "../components/Background"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

export default function Events() {
  const [isLoading, setIsLoading] = useState(false)

 

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading key="loading" />
      ) : (
        <>
          <Background />
          <Navigation />
          <main className="container mx-auto px-4 py-8 pt-40 bg-transparent relative min-h-screen">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-gothic text-red-500 mb-8 text-center
              [text-shadow:0_0_10px_rgba(255,0,0,0.5)]">
              Events
            </h1>
            {/* Add events content here */}
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  )
} 