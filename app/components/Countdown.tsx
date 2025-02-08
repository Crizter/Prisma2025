"use client"

import { motion } from "framer-motion"

export default function Countdown() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold glitch coming-soon"
          data-text="COMING SOON"
        >
          COMING SOON..
        </h2>
      </motion.div>
    </div>
  )
}

