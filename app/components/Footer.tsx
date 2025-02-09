"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 sm:py-6 px-4 text-center bg-black/50 backdrop-blur-sm">
      <motion.p
        className="text-xs sm:text-sm text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
<<<<<<< HEAD
        © 2025 Prisma. All rights reserved.
=======
        © 2024 Future Tech. All rights reserved.
>>>>>>> frontend-harsh
      </motion.p>
    </footer>
  )
}

