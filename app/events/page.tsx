"use client"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "../components/Loading"
import Background from "../components/Background"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Image from "next/image"
import { motion } from "framer-motion"

const events = [
  {
    id: 1,
    name: "Fashion",
    image: "/eventsImages/fashion.jpg",
    description: "Fashion events feature stunning ramp walks, innovative themes, and bold fashion statements from aspiring designers and models.",
    subEvents: {
      solo: ["Mr & Miss Prisma (Only for SRM students)"],
      group: ["Fashion show (open to all universities and colleges)"]
    }
  },
  {
    id: 2,
    name: "Gaming",
    image: "/eventsImages/gaming.jpg",
    description: "Gaming events feature high-intensity esports tournaments for popular games like BGMI, Valorant, and FIFA, catering to both casual and competitive players.",
    subEvents: {
      mobile: ["BGMI", "Bullet Echo", "Cookie Run", "Road to Valor", "Real Cricket"],
      pc: ["Valorant", "Marvel Rivals", "The Finals"],
      console: ["Tekken 8", "FIFA 2024"]
    }
  },
  {
    id: 3,
    name: "Photography",
    image: "/eventsImages/photo.jpg",
    description: "Photography events challenge participants to capture the essence of Prisma through various photography challenges, testing their creativity, technical skills, and storytelling ability.",
    subEvents: {
      solo: ["Epix : The Street Portrait Photography", "Chitra Kala : The ON-Spot Photography"],
      group: ["Chalchitra", "Short Film Competition"]
    }
  },
  {
    id: 4,
    name: "Dance",
    image: "/eventsImages/dance.jpg",
    description: "Dance events feature high-energy performances in solo, duet, and group categories, spanning classical, contemporary, hip-hop, and freestyle styles.",
    subEvents: {
      solo: ["Fierce Feet", "Nrityanjali: Classical", "Street Battle : All Forms"],
      duo: ["Stellar Stomp"],
      group: ["Whimsical Walt : Western Group Dance", "Sanskriti : Folk Group Dance"]
    }
  },
  {
    id: 5,
    name: "Music",
    image: "/eventsImages/music.jpg",
    description: "Music events include solo and band performances, rap battles, and instrumental showcases across different genres.",
    subEvents: {
      solo: ["Instrumental", "Vocal", "Rap Battle", "Music Production Challenge"],
      group: ["Battle of Hands"]
    }
  },
  {
    id: 6,
    name: "Drama",
    image: "/eventsImages/drama.jpg",
    description: "Drama events showcase the power of storytelling through stage plays, street performances, and mono-acts, covering genres like comedy, tragedy, and social satire.",
    subEvents: {
      solo: ["Range Ae Aekal : Monoacting"],
      group: ["Samaaj ka Aaina : Nukkad Naatak"]
    }
  },
  {
    id: 7,
    name: "Literary",
    image: "/eventsImages/literary.jpg",
    description: "Literary events provide a platform for wordsmiths to showcase their skills through debates, poetry slams, extempore, and storytelling competitions.",
    subEvents: {
      solo: ["Poet's Ode", "Spell Bee", "Haiku Hoopla", "Pilot Twist Contest", "Kavi Kehte", "Slam Poetry"],
      group: ["Gaathaaven: The Epics Quiz"]
    }
  },
  {
    id: 8,
    name: "Anime",
    image: "/eventsImages/anime.jpg",
    description: "Anime events celebrate the anime culture, featuring cosplay competitions, anime quizzes, and fan art contests, enabling participants to step into the world of their favorite characters.",
    subEvents: {
      solo: ["Guess the Opening"],
      duo: ["Dub it Your Way"],
      group: ["Anime Quiz"]
    }
  },
  {
    id: 9,
    name: "Arts",
    image: "/eventsImages/arts.jpg",
    description: "Arts events allow participants to unleash their creativity through painting, sketching, digital art, and other visual expressions, with competitions to create stunning masterpieces.",
    subEvents: {
      solo: ["Tote Bag Painting", "T-Shirt Painting", "Still Life", "Card Making"],
      duo: ["Shoe Painting", "Face Painting", "Tattoo Painting"],
      group: ["Wall Painting"]
    }
  }
]

export default function Events() {
  const [isLoading, setIsLoading] = useState(false)

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
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-gothic text-red-500 mb-12 text-center
                [text-shadow:0_0_10px_rgba(255,0,0,0.5),0_0_20px_rgba(255,0,0,0.3)]
                animate-textFlicker"
            >
              Events
            </motion.h1>
            
            <div className="space-y-16 md:space-y-24">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id} 
                  className="relative group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Spooky Box with animated borders */}
                  <div className="absolute inset-0 -m-8">
                    {/* Animated gradient borders */}
                    <div className="absolute top-0 left-[5%] right-[5%] h-[2px] 
                      bg-gradient-to-r from-transparent via-orange-500 to-transparent
                      animate-borderPulse" />
                    
                    <div className="absolute bottom-0 left-[5%] right-[5%] h-[2px] 
                      bg-gradient-to-r from-transparent via-orange-500 to-transparent
                      animate-borderPulse" />
                    
                    <div className="absolute left-[5%] top-0 bottom-0 w-[2px]
                      bg-gradient-to-b from-transparent via-orange-500 to-transparent
                      animate-borderPulse" />
                    
                    <div className="absolute right-[5%] top-0 bottom-0 w-[2px]
                      bg-gradient-to-b from-transparent via-orange-500 to-transparent
                      animate-borderPulse" />

                    {/* Spooky corner effects */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-red-500/50
                      animate-cornerPulse" />
                    <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-red-500/50
                      animate-cornerPulse" />
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-red-500/50
                      animate-cornerPulse" />
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-red-500/50
                      animate-cornerPulse" />
                  </div>

                  {/* Content with hover effects */}
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-12
                    backdrop-blur-sm bg-black/20 rounded-lg transition-all duration-500
                    group-hover:bg-black/40 group-hover:shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                    {/* Image Container with spooky hover effect */}
                    <div className="w-full md:w-1/2 lg:w-2/5 relative group/image">
                      <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg
                        transition-all duration-500 group-hover/image:shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                        <Image
                          src={event.image}
                          alt={event.name}
                          fill
                          className="object-contain transition-all duration-500 
                            group-hover/image:scale-105 group-hover/image:filter-none"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                          opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Text content with enhanced spooky effects */}
                    <div className="w-full md:w-1/2 lg:w-3/5 space-y-6">
                      <motion.h2 
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-gothic text-orange-500
                          [text-shadow:0_0_10px_rgba(255,165,0,0.5),0_0_20px_rgba(255,165,0,0.3)]
                          transition-all duration-300 hover:text-orange-400
                          hover:[text-shadow:0_0_10px_#ff4d00,0_0_20px_#ff4d00,0_0_30px_#ff4d00]
                          animate-slowPulse"
                      >
                        {event.name}
                      </motion.h2>
                      <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90 
                        transition-all duration-300 hover:text-white">
                        {event.description}
                      </p>
                      
                      {/* Sub Events - Enhanced styling */}
                      <div className="mt-8 space-y-6">
                        {Object.entries(event.subEvents).map(([category, items]) => (
                          <div key={category} className="space-y-3">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-gothic text-orange-400 capitalize
                              [text-shadow:0_0_8px_rgba(255,165,0,0.4)]
                              transition-all duration-300 hover:text-orange-300
                              hover:[text-shadow:0_0_8px_#ff4d00,0_0_16px_#ff4d00]">
                              {category}
                            </h3>
                            <ul className="list-disc list-inside text-white/80 space-y-2">
                              {items.map((item, index) => (
                                <li key={index} className="text-base md:text-lg lg:text-xl
                                  transition-all duration-300 hover:text-white/100
                                  hover:[text-shadow:0_0_10px_rgba(255,255,255,0.3)]">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  )
} 