"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Loading from "../components/Loading"
import Background from "../components/Background"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

const prismaEvents = [
  {
    year: "2K25",
    title: "The Grand Techno-Cultural Extravaganza",
    image: "/logo.png",
    videoUrl: "#",
    description: `Welcome to Prisma 2K25, the 7th edition of SRM University Delhi NCR, Sonepat's premier techno-cultural fest! Celebrating talent, creativity, and innovation, Prisma offers exhilarating performances, thrilling competitions, and vibrant celebrations. Enjoy dance battles, theatrical acts, music, fashion, gaming, debates, poetry slams, photography, art, and cosplay. A hub of diverse interests, Prisma fosters creativity and excellence, growing bigger each year. Whether a performer, competitor, or spectator, experience the excitement and legacy of Prisma 2K25!`,
    isUpcoming: true
  },
  {
    year: "2K24",
    title: "Vibrant Fusion of Talent and Celebration",
    image: "/logo.png",
    videoUrl: "#",
    description: "PRISMA 2k24 was a vibrant fusion of talent, passion, and celebration. With 80+ performances, 1300+ participants, and 7000+ attendees, it was an unforgettable spectacle. Electrifying DJ nights with MD Desi Rockstar and Nikhita Gandhi made it magical. Until next time—bigger, brighter, and even more extraordinary!",
    isUpcoming: false
  },
  {
    year: "2K23",
    title: "A Trip Down Memory Lane",
    image: "/logo.png",
    videoUrl: "#",
    description: `PRISMA 2k23 was a vibrant fest with 25+ events by 8 cultural societies, 200+ participants from 50+ universities, and electrifying performances by Jordan Sandhu and Ajay Hooda. Despite challenges, the organizing team ensured success. Special guests IPS B. Satish Balan and Devender Sura inspired all, making unforgettable memories.`
  },
  {
    year: "2K22",
    title: "Spirit of Creativity and Innovation",
    image: "/logo.png",
    videoUrl: "#",
    description: `PRISMA 2k22 celebrated creativity with 35+ events in drama, dance, music, fashion, literature, e-gaming, arts, and photography. The star night featured Parmish Verma's electrifying performance. The organizing team's dedication and participants' enthusiasm made it an unforgettable fest, fostering connections and inspiring creativity within the college community.`
  },
  {
    year: "2K20",
    title: "A Cherished Tradition",
    image: "/logo.png",
    videoUrl: "#",
    description: `PRISMA 2k20 brought innovation and camaraderie through diverse events and thrilling performances. The Landers energized the crowd with their Punjabi folk fusion, while DJ Uplift's dynamic set blended traditional melodies with electronic beats. The festival created lasting memories, uniting students in celebration of technology, arts, and culture.`
  },
  {
    year: "2K19",
    title: "Where Creativity Knows No Bounds",
    image: "/logo.png",
    videoUrl: "#",
    description: `PRISMA 2k19 was a grand showcase of creativity and talent, with 40+ events organized by cultural societies. Jassi Gill and Babbal Rai captivated audiences with their electrifying performances. The festival embodied unity, diversity, and excellence, leaving an indelible mark on everyone through its technological and artistic brilliance.`
  },
  {
    year: "2K18",
    title: "The First Chapter",
    image: "/logo.png",
    videoUrl: "#",
    description: `PRISMA 2k18 marked the festival's beginning, blending technology, art, and tradition. With 20+ events in dance, drama, music, literature, gaming, and fashion, it set a high standard. Akhil's soulful Punjabi performance enthralled the audience, while the dedicated organizing team ensured a successful and dynamic first edition.`
  }
]

export default function About() {
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)
  // }, [])

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading key="loading" />
      ) : (
        <>
          <Background />
          <Navigation />
          <main className="container mx-auto px-4 py-8 pt-40 bg-transparent relative min-h-screen">
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-gothic text-red-500 mb-12 text-center
                [text-shadow:0_0_10px_rgba(255,0,0,0.5),0_0_20px_rgba(255,0,0,0.3)]
                animate-textFlicker"
            >
              About Prisma
            </motion.h1>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-16 text-center max-w-4xl mx-auto"
            >
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                Prisma 2K25 – The Grand Techno-Cultural Extravaganza of SRM University Delhi NCR, Sonepat
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-24 overflow-x-hidden">
              {prismaEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group overflow-hidden"
                >
                  {/* Decorative Box */}
                  <div className="absolute inset-0 -m-4">
                    {/* Animated borders */}
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
                  </div>

                  {/* Content */}
                  <div className="p-12 backdrop-blur-sm bg-black/20 rounded-lg
                    transition-all duration-500 group-hover:bg-black/40 
                    group-hover:shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Image Section */}
                      <div className="w-full lg:w-1/3">
                        <Link href={event.videoUrl} target="_blank" className="block relative">
                          <div className="relative h-[300px] overflow-hidden rounded-lg
                            transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                            <Image
                              src={event.image}
                              alt={`Prisma ${event.year}`}
                              fill
                              className="object-cover transition-all duration-500 
                                group-hover:scale-105"
                            />
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center
                              bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-white text-lg">Watch Highlights</span>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Text Content */}
                      <div className="w-full lg:w-2/3 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-gothic text-orange-500
                          [text-shadow:0_0_10px_rgba(255,165,0,0.5)]
                          group-hover:[text-shadow:0_0_10px_#ff4d00,0_0_20px_#ff4d00]">
                          Prisma {event.year}
                          {event.isUpcoming && (
                            <span className="ml-4 text-sm text-red-500 animate-pulse">
                              Upcoming
                            </span>
                          )}
                        </h2>
                        <h3 className="text-xl text-orange-400">{event.title}</h3>
                        <p className="text-white/80 text-lg leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </AnimatePresence>
  )
} 