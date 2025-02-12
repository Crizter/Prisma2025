"use client"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import Loading from "../components/Loading"
import Background from "../components/Background"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

const contactMembers = [
  {
    id: 1,
    name: "Dipanshu",
    role: "Cultural Mentor",
    phone: "+91 7903418855"
  },
  {
    id: 2,
    name: "Yuvika",
    role: "Cultural President",
    phone: "+91 8800954260"
  },
  {
    id: 3,
    name: "Lakshay",
    role: "General Secretary",
    phone: "+91 9306023815"
  }
]

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false)
//     })
//   }, [])

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading key="loading" />
      ) : (
        <>
          <Background />
          <Navigation />
          <main className="container mx-auto px-4 py-8 pt-40 bg-transparent relative min-h-screen">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-gothic text-red-500 mb-8 text-center
                [text-shadow:0_0_10px_rgba(255,0,0,0.5)]"
            >
              Contact The Dark Council
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16"
            >
              {contactMembers.map((member) => (
                <div 
                  key={member.id}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-xl group-hover:bg-red-500/30 
                    transition-all duration-300"></div>
                  <div className="relative p-6 rounded-lg border border-red-500/30 backdrop-blur-sm
                    hover:border-red-500/50 transition-all duration-300">
                    <h3 className="text-2xl font-gothic text-red-500 mb-2
                      [text-shadow:0_0_10px_rgba(255,0,0,0.3)]">
                      {member.name}
                    </h3>
                    <p className="text-red-400/80 mb-4 text-sm">{member.role}</p>
                    <a 
                      href={`tel:${member.phone}`}
                      className="inline-flex items-center text-white/90 hover:text-red-400 transition-colors"
                    >
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </span>
                      {member.phone}
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  )
} 