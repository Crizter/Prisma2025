"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Header() {
  const [currentLogo, setCurrentLogo] = useState(0)
  const logos = ["/srm.png", "/naac.png"] // Verify these paths exist in public folder

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo(prev => (prev + 1) % logos.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="py-2 sm:py-4 lg:py-6">
      <nav className="container mx-auto">
        <motion.div
          className="relative w-80 h-24 sm:w-96 sm:h-28 md:w-[450px] md:h-32 lg:w-[500px] lg:h-36"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentLogo === index ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            >
              <Image
                src={logo}
                alt="Institution Logo"
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain object-left"
                style={{ 
                  objectFit: 'contain',
                  objectPosition: '0% center'
                }}
                priority
              />
            </motion.div>
          ))}
        </motion.div>
      </nav>
    </header>
  )
}

