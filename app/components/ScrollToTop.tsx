"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 200)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <motion.button
      className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50 p-2.5 rounded-full 
        bg-red-500/20 backdrop-blur-sm border border-red-500/40 hover:bg-red-500/30 
        transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={scrollToTop}
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-400/80 hover:text-red-300 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </motion.button>
  )
} 