"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const Navigation = () => {
  const [currentLogo, setCurrentLogo] = useState(0)
  const logos = ["/srm.png", "/naac.png"] // Use your two logo variants
  const navItems = ['Home', 'Events', 'About', 'Contact']
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo(prev => (prev + 1) % logos.length)
    }, 4000) // 4 seconds per full cycle
    return () => clearInterval(interval)
  }, [])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  if (!mounted) {
    return null
  }
  
  return (
    <nav className="fixed top-0 w-full z-50 p-4 ">
      {/* Responsive Logo Container */}
      <div className="absolute left-4 top-4 z-50 
        w-[100px] h-[45px]   top-8  // Mobile
        sm:w-[150px] sm:h-[50px]   // Small tablets
        md:w-[200px] md:h-[65px]   // Tablets
        lg:w-[250px] lg:h-[80px]"> 
        
        <motion.div
          className="relative w-full h-full"
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
                alt="Prisma Logo"
                fill
                sizes="(max-width: 640px) 100px, 
                       (max-width: 768px) 150px, 
                       (max-width: 1024px) 200px, 
                       250px"
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
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center relative">
        {/* Mobile Menu Button - visible on small screens */}
        <button 
          ref={buttonRef}
          className="md:hidden absolute right-4 top-4 text-white/70 hover:text-orange-500 z-50 
            w-10 h-10 flex items-center justify-center bg-black/50 rounded-full"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="transition-transform duration-300"
          >
            {isMenuOpen ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            )}
          </svg>
        </button>

        {/* Navigation Items */}
        <div 
          ref={menuRef}
          className={`
            md:block fixed md:relative top-0 left-0 right-0 mt-16 md:mt-0
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0 bg-black/10 backdrop-blur-sm' : 'opacity-0 -translate-y-full md:opacity-100 md:translate-y-0'}
            w-full
          `}
        >
          <ul className={`
            flex flex-col md:flex-row items-center justify-center
            space-y-4 md:space-y-0 md:space-x-12
            w-full md:w-auto
            px-4 md:px-8 py-8 md:py-4
            bg-transparent md:bg-transparent
            
            rounded-lg
            transition-all duration-300
            md:translate-x-8
          `}>
            {navItems.map((item) => (
              <li key={item} className="relative group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-base sm:text-lg font-gothic tracking-wider text-white/70 
                      transition-all duration-300
                      px-2 sm:px-4 py-1 sm:py-2 rounded-sm whitespace-nowrap
                      spooky-text group-hover:text-orange-500
                      group-hover:animate-textFlicker
                      [text-shadow:0_0_10px_rgba(255,165,0,0.5),0_0_20px_rgba(255,165,0,0.3)]
                      group-hover:[text-shadow:0_0_10px_#ff4d00,0_0_20px_#ff4d00,0_0_30px_#ff4d00]
                    "
                    onClick={handleNavClick}
                  >
                    {item}
                  </Link>

                  {/* Fire particles - hidden on mobile */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-1 
                    opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                    <div className="particles-fire" />
                  </div>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Underline with skull - only visible on desktop */}
        <div className="relative w-[90%] sm:w-[80%] mt-2 hidden md:block translate-x-8">
          {/* Left line */}
          <div className="absolute left-0 right-[52%] h-[1px] sm:h-[2px] 
            bg-gradient-to-r from-transparent via-orange-500 to-orange-600" />
          
          {/* Right line */}
          <div className="absolute left-[52%] right-0 h-[1px] sm:h-[2px] 
            bg-gradient-to-r from-orange-600 via-orange-500 to-transparent" />
          
          {/* Center skull */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image 
              src="/icons8-skull-100.png"
              alt="Skull"
              width={28}
              height={28}
              className="animate-float w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]
                brightness-[1.2] hover:brightness-[1.4] transition-all duration-300
                drop-shadow-[0_0_8px_rgba(255,77,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 