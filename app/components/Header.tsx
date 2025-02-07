"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Header() {
  return (
    <header className="py-2 sm:py-4 lg:py-6">
      <nav className="container mx-auto">
        <motion.div
          className="relative w-80 h-24 sm:w-96 sm:h-28 md:w-[450px] md:h-32 lg:w-[500px] lg:h-36"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Image
            src="/logo.png"
            alt="Prisma Logo"
            fill
            className="object-contain object-left"
            style={{ 
              objectFit: 'contain',
              objectPosition: '0% center'
            }}
            priority
          />
        </motion.div>
      </nav>
    </header>
  )
}

