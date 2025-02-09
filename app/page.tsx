"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "./components/Loading"
import Background from "./components/Background"
import Header from "./components/Header"
import Countdown from "./components/Countdown"
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-24">
              <Countdown />
              <div className="relative z-0 h-[60vh] sm:h-[70vh] md:h-[80vh]">
                <SkullModel />
              </div>
              <div className="absolute inset-x-0 top-[40vh] sm:top-[35vh] md:top-[30vh] z-10 pointer-events-none">
                <HauntedCountdown />
              </div>
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

