"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "./components/Loading"
import Background from "./components/Background"
// import Countdown from "./components/Countdown"
import Footer from "./components/Footer"
import SkullModel from "./components/SkullModel"
import Navigation from "./components/Navigation"
import HauntedCountdown from './components/CountdownTimer'
import GuestReveal from './components/GuestReveal'
import SpecterReveal from './components/SpecterReveal'
import Sponsors from './components/Sponsors'
import ScrollToTop from "./components/ScrollToTop"

// Auth constants
const TEMP_USERNAME = "prisma2025"
const TEMP_PASSWORD = "beta@access"
const IS_AUTH_ENABLED = true

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    const authStatus = localStorage.getItem('prismaAuth')
    if (authStatus === 'authenticated' || !IS_AUTH_ENABLED) {
      setIsAuthenticated(true)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === TEMP_USERNAME && credentials.password === TEMP_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('prismaAuth', 'authenticated')
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated && IS_AUTH_ENABLED) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Background />
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-gothic text-red-500 mb-2
              [text-shadow:_0_0_10px_#ff0000,0_0_20px_#ff0000] animate-creepy-float">
              PRISMA 2025
            </h2>
            <p className="text-red-400/80 text-sm">Beta Access Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 bg-black/50 border border-red-500/30 text-white rounded-md
                  focus:outline-none focus:border-red-500 transition-all"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 bg-black/50 border border-red-500/30 text-white rounded-md
                  focus:outline-none focus:border-red-500 transition-all"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-md
                transition-all border border-red-500/50 font-gothic
                [text-shadow:_0_0_10px_#ff0000]"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
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
                    className="px-8 py-3 bg-transparent border border-red-500/30 text-red-400/80 
                      rounded-md hover:border-red-500/50 transition-all
                      font-gothic [text-shadow:_0_0_10px_#ff0000]"
                  >
                    Register
                  </button>
                  
                  <button 
                    disabled
                    className="px-8 py-3 bg-transparent border border-red-500/30 text-red-400/80 
                      rounded-md cursor-not-allowed hover:border-red-500/50 transition-all
                      font-gothic [text-shadow:_0_0_10px_#ff0000] relative overflow-hidden
                      group"
                  >
                    Buy Pass
                    <span className="absolute inset-0 flex items-center justify-center bg-black/80
                      text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Coming Soon
                    </span>
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

