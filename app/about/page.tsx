"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Loading from "../components/Loading"
import Background from "../components/Background"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

const prismaEvents = [
  {
    year: "2K25",
    title: "The Grand Techno-Cultural Extravaganza",
    image: "/images/prisma2k25.jpg",
    videoUrl: "#",
    description: `Welcome to Prisma 2K25, the 7th edition of SRM University Delhi NCR, Sonepat's most spectacular techno-cultural fest! A celebration of talent, creativity, and innovation, Prisma brings together students from across the country for an unforgettable experience filled with exhilarating performances, thrilling competitions, and vibrant celebrations.

    From electrifying dance battles and captivating theatrical performances to high-fashion showcases, soul-stirring music, and intense gaming competitions, Prisma has something for everyone. Literature lovers can dive into thought-provoking debates and poetry slams, while photography and art enthusiasts can capture and create mesmerizing visuals. Anime fans can immerse themselves in a world of cosplay and fandom culture, making Prisma a dynamic melting pot of diverse interests and artistic expressions.

    With its legacy of fostering creativity and excellence, Prisma continues to evolve each year, bringing bigger stages, grander performances, and an unmatched festive atmosphere. Whether you're a performer, competitor, or spectator, Prisma 2K25 promises an experience that will leave you inspired and entertained.

    Come, be a part of the legacy. Experience Prisma 2K25!`,
    isUpcoming: true
  },
  {
    year: "2K24",
    title: "Coming Soon",
    image: "/images/prisma2k24.jpg",
    videoUrl: "#",
    description: "The next chapter of our legacy is being written. Stay tuned for an unforgettable experience that will redefine cultural celebrations.",
    isUpcoming: true
  },
  {
    year: "2K23",
    title: "A Trip Down Memory Lane",
    image: "/images/prisma2k23.jpg",
    videoUrl: "#",
    description: `A trip down the memory lane, infused with the meticulous planning by the organizing committee and the spirited participation of students in various competitions and performances, every aspect of PRISMA 2k23 radiated with vibrancy. An interesting plethora of 25+ events curated by our 8 cultural societies. These events witnessed participation of 50+ universities and 200+ participants.

    The diverse array of talents showcased, be it in music, dance, art, or literature, highlighted the rich tapestry of skills within our college community. The infectious energy and positive vibes. Everyone had put in their heart and soul May it be the student council, organising committee, faculty convenors, administration or the participants.

    It's only fair to mention that everyone was awestruck by the show put up by Jordan Sandhu the first day. He urged all of us to leave our seats and throw our best moves. The second day was marked by a great hardship but the determination of the organising committee did wonders and upheld the notion of "the show must go on". Ajay Hooda, a Haryanvi sensation especially amongst the youth took the stage by storm that his energy was felt by every single soul.

    PRISMA takes pride in its network that has been nurtured by SRM University, Sonepat to the extent that we were able to invite Shri. IPS B. Satish Balan and The Tree man of Haryana, Devender Sura for the accolades ceremony. Their worlds imparted unforgettable wisdom and motivated all the aspiring change makers. PRISMA 2k23 was about the friendships formed, the memories created, and the sense of pride in being part of such a dynamic and thriving college community. The success is not merely measured in numbers; it is etched in the smiles, laughter, and shared experiences that will linger in our hearts for years to come.`
  },
  {
    year: "2K22",
    title: "Spirit of Creativity and Innovation",
    image: "/images/prisma2k22.jpg",
    videoUrl: "#",
    description: `Spirit of creativity, collaboration, and innovation that defined PRISMA 2k22, The Techno-Cultural Fest has become a cornerstone of our college experience, that unites students, faculty, and staff in a celebration of talent, diversity, and camaraderie.

    PRISMA 2k22 was bigger, better, and more exhilarating, with a dynamic lineup of events, performances and competitions tailored to ignite passions imagination. 35+ events were successfully conducted covering the ambit of Drama, Dance, Music, Fashion, Literary, E-Gaming, Arts and Photography.

    The highlight of the festival was the star night an unforgettable evening of Music, glamour, fun excitement, and entertainment. Dressed in his signature style, Parmish Verma commanded the stage with confidence and charisma. His powerful vocals resonated throughout the venue, drawing listeners in with every note. Backed by a talented band, he effortlessly transitioned between high-energy tracks and heartfelt ballads, showcasing the versatility of his musical repertoire.

    The contributions of the event organizing team were essential to the success of the festival, as they work tirelessly behind the scenes to create an engaging, enjoyable, and memorable experience for everyone involved. The willingness of the participants to share their talents, skills, and enthusiasm with our college community. Their contributions helped create memorable moments, fostered connections, and inspired others to explore their own creative potential.`
  },
  {
    year: "2K20",
    title: "A Cherished Tradition",
    image: "/images/prisma2k20.jpg",
    videoUrl: "#",
    description: `Our annual Technical-Cultural College Festival has become a cherished tradition, a time when our campus comes alive with creativity, innovation, and camaraderie. From thrilling competitions to captivating performances, each event has offered a diverse range of activities and experiences that showcase the rich tapestry of college community.

    The Landers, a dynamic Indian band, took the stage by storm with their electrifying performance, blending traditional Punjabi folk music with contemporary sounds to create a unique and captivating musical experience. As they performed their hit songs, The Landers' energy was palpable, igniting the crowd and inspiring spontaneous bursts of dancing and singing along.

    From Bollywood hits to chart-topping remixes, DJ Uplift's set was as diverse as it was magnificent, blending traditional Indian melodies with modern electronic sounds to create a one-of-a-kind musical experience.`
  },
  {
    year: "2K19",
    title: "Where Creativity Knows No Bounds",
    image: "/images/prisma2k19.jpg",
    videoUrl: "#",
    description: `PRISMA 2k19 curated a world where creativity knew no bounds, and possibilities were endless. It served as a platform for students to explore their interests, collaborate with peers, and engage in a wide range of activities that span through the realms of technology, arts, and culture.

    From the mesmerizing displays of technological prowess to the captivating showcases of artistic brilliance, our festival offered a kaleidoscope of experiences that cater to every interest and inclination. 40+ events were successfully organised by the joined efforts of the cultural council and cultural societies where we saw their willingness to step out of their comfort zones and embrace new experiences embodying the true essence of what our festival stands for - unity, diversity, and the pursuit of excellence.

    Regardless of the outcomes, their efforts have not gone unnoticed but left an indelible mark on our hearts and minds. Jassi Gill and Babbal Rai, two of Punjab's most dynamic and beloved singers, took the stage by storm. Whether it were the rhythms of "Lancer" or the heartfelt emotions of "Ik Saal," each song resonates deeply with the audience, leaving them spellbound and yearning for more especially Babbal Rai's energetic delivery ignited the crowd with excitement.`
  },
  {
    year: "2K18",
    title: "The First Chapter",
    image: "/images/prisma2k18.jpg",
    videoUrl: "#",
    description: `PRISMA 2K18 wasn't just an event; it was a celebration of the vibrant tapestry of talents and passions, it provided a forum where technology met art, and tradition merged with innovation to create an unforgettable experience for everyone involved.

    It served as more than just a showcase of talent; it became a platform for collaboration, learning, and growth. It was the first attempt to celebrate the diversity of talents and perspectives that make our campus such a dynamic and enriching place to be and since it's first edition PRISMA has been monumental in the trajectory of SRM University, Sonepat.

    20+ events were conducted successfully in the realm of dance, drama, Music, Literary, gaming, fashion and gaming. Akhil's music performance at PRISMA 2018 was nothing short of spectacular. His mastery of Punjabi singing combined with his passionate delivery created an unforgettable experience for everyone present.

    The organizing team, management, faculty, and student volunteers put in tireless efforts to make the college festival a resounding success. The organizing team's dedication to detail, the management's support and guidance, the faculty's expertise, and the enthusiasm of the student volunteers all came together to create a vibrant and dynamic event that showcased the best of the college community.`
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
            <div className="space-y-24">
              {prismaEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  {/* Decorative Box */}
                  <div className="absolute inset-0 -m-8">
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
        </>
      )}
    </AnimatePresence>
  )
} 