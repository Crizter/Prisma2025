"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "./components/Loading"
import Background from "./components/Background"
import SkullModel from "./components/SkullModel"
import Navigation from "./components/Navigation"
import HauntedCountdown from './components/CountdownTimer'
import GuestReveal from './components/GuestReveal'
import SpecterReveal from './components/SpecterReveal'
import Sponsors from './components/Sponsors'
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-black/95 text-white overflow-x-hidden scroll-smooth">
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <>
            <Background />
            <Navigation />
            <main className="container mx-auto px-4 py-8 pt-16 sm:pt-20 md:pt-24 lg:pt-24 xl:pt-15 2xl:pt-32 bg-transparent">
              <div className="relative">
                <div className="relative z-0 h-[60vh] sm:h-[70vh] md:h-[85vh] mt-4 sm:mt-4 md:mt-6 lg:mt-6">
                  <SkullModel />
                </div>
                
                <div className="relative z-10 flex justify-center gap-4 mt-8 mb-4">
                  <button 
                    onClick={() => window.open('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdVFINZo4urlwMtVla7aILJJjCY_uTI4RjSixEk30IGtecHHA/viewform?usp=preview&pli=1', '_blank')}
                    className="px-8 py-3 bg-gradient-to-br from-red-900/30 to-transparent border-2 border-red-800/40
                      rounded-md hover:border-red-600/60 hover:from-red-900/40 hover:to-red-900/20 transition-all
                      font-gothic [text-shadow:_0_0_8px_#ff000040] shadow-[0_0_15px_#ff000020]
                      hover:[text-shadow:_0_0_12px_#ff000060] hover:shadow-[0_0_25px_#ff000030]"
                  >
                    Register
                  </button>
                  
                  <button 
                    onClick={() => window.open('https://purchase-pass.vercel.app/', '_blank')}
                    className="px-8 py-3 bg-black/40 border-2 border-red-600/20 rounded-md relative 
                      overflow-hidden hover:border-red-600/40 transition-all font-gothic
                      [text-shadow:_0_0_8px_#ff000040] hover:[text-shadow:_0_0_12px_#ff000060]
                      before:absolute before:inset-0 before:border-2 before:border-red-600/10
                      before:rounded-md before:-m-[2px] hover:before:animate-pulse"
                  >
                    Buy Pass
                  </button>
                </div>

                <div className="relative z-10 mt-8 xl:mt-30">
                  <HauntedCountdown />
                </div>
              </div>

              <div className="relative mt-10">
                <GuestReveal />
              </div>
              
              <div className="relative z-30 py-20">
                <SpecterReveal />
              </div>

              <div className="relative z-40">
                <Sponsors />
              </div>
            </main>
            <Footer />
            <ScrollToTop />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

