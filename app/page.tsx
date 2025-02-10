"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "./components/Loading"
import Background from "./components/Background"
// import Countdown from "./components/Countdown"
import Footer from "./components/Footer"
import SkullModel from "./components/SkullModel"
import Navigation from "./components/Navigation"
import HauntedCountdown from './components/CountdownTimer'
import GuestReveal from './components/GuestReveal'
import SpecterReveal from './components/SpecterReveal'
import Sponsors from './components/Sponsors'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="min-h-screen bg-black/95 text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <>
            <Background />
            <Navigation />
            <main className="container mx-auto px-4 py-8 pt-40 bg-transparent">
              {/* Changed from min-h-[500vh] to allow normal scrolling */}
              <div className="relative">
                <div className="relative z-0 h-[60vh] sm:h-[70vh] md:h-[80vh] mt-20">
                  <SkullModel />
                </div>
                <div className="relative z-10 mt-8">
                  <HauntedCountdown />
                </div>
              </div>

              <div className="relative mt-20">
                <GuestReveal />
              </div>
              
              {/* Specter Reveal */}
              <div className="relative z-30 py-20">
                <SpecterReveal />
              </div>

              {/* Sponsors Section */}
              <div className="relative z-40">
                <Sponsors />
              </div>
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

