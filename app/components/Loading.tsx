"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-4xl sm:text-5xl md:text-6xl font-bold loading-text text-center w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          Summoning the Darkness
        </div>
      </motion.div>
    </motion.div>
  )
}

