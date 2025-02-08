"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Loading from "./components/Loading"
import Background from "./components/Background"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SkullModel from "./components/SkullModel"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000) // 3 second loading screen
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Background />
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-2 lg:py-4 relative">
              <SkullModel />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

