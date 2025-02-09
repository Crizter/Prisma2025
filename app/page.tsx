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
              <SkullModel />
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

