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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="min-h-screen bg-black/95 text-white overflow-x-hidden scroll-smooth snap-y snap-mandatory">
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <>
            <Background />
            <Navigation />
            <main className="container mx-auto px-4 py-8 pt-40 bg-transparent relative min-h-[500vh]">
              {/* First snap point */}
              <div className="h-screen snap-start">
                <div className="relative z-0 h-[60vh] sm:h-[70vh] md:h-[80vh] mt-20 sticky top-40">
                  <SkullModel />
                </div>
                <div className="fixed inset-x-0 top-[85vh] sm:top-[80vh] md:top-[75vh] z-10 pointer-events-none">
                  <HauntedCountdown />
                </div>
              </div>
              {/* Second snap point */}
              <div className="h-screen snap-start" />
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

