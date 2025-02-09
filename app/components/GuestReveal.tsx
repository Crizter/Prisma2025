"use client"
import { useEffect, useState, useRef } from 'react'

export default function GuestReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Disabled parallax states (set to 1 to show content without effects)
  const [scale, setScale] = useState(1)  // Changed from 0 to 1
  const [opacity, setOpacity] = useState(1)  // Changed from 0 to 1

  const artists = [
    { 
      id: 1,
      name: "Benny Dayal",
      phrase: "Crafts reality from the void's fabric",
      silhouette: "/images/silhouette-1.png",
      disabled: false
    },
    {
      id: 2,
      name: "Khasa Aala Chahar", 
      phrase: "Songs that unravel time",
      silhouette: "/images/silhouette-2.png",
      disabled: false
    },
    {
      id: 3,
      name: "Hidden Oracle",
      phrase: "???",
      silhouette: "/images/silhouette-3.png",
      disabled: true // This artist will be hidden
    }
  ]

  // Comment out parallax effect
  /*
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = window.scrollY
      const startPosition = 3355
      const endPosition = 5000
      
      if (scrollPosition >= startPosition && scrollPosition <= endPosition) {
        const progress = (scrollPosition - startPosition) / (endPosition - startPosition)
        setScale(Math.min(1, progress))
        setOpacity(Math.min(1, progress * 1.5))
      } else if (scrollPosition < startPosition) {
        setScale(0)
        setOpacity(0)
      } else {
        setScale(1)
        setOpacity(1)
      }
    }

    const scrollListener = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])
  */

  return (
    <div 
      ref={containerRef}
      className="w-full"
      style={{
        // transform: `scale(${scale})`, // Disabled scale transform
        // opacity: opacity,  // Disabled opacity animation
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      <div className="relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 h-full px-4 py-8 md:py-12 min-h-[500px] lg:min-h-[600px]">
          {artists.filter(a => !a.disabled).map((artist) => (
            <div 
              key={artist.id}
              className="relative group w-full aspect-square max-w-[400px] md:max-w-[400px] lg:max-w-[500px] mx-auto"
            >
              {/* Frame Container */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 rounded-full border-6 md:border-6 lg:border-8 border-red-500/30 
                  [box-shadow:0_0_60px_#ff000055,inset_0_0_40px_#8b0000]
                  bg-[radial-gradient(circle_at_center,#8b000022_0%,transparent_60%)]">
                  
                  <div className="absolute inset-[4px] md:inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,#ff000033_10%,transparent_60%)]" />
                </div>

                {/* Silhouette Image */}
                <div 
                  className="absolute inset-4 md:inset-5 lg:inset-7 rounded-full bg-contain bg-no-repeat bg-center 
                    opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" 
                  style={{ backgroundImage: `url('${artist.silhouette}')` }}
                />
              </div>

              {/* Artist Name - Adjusted positioning */}
              <div className="absolute -bottom-10 md:-bottom-6 left-1/2 -translate-x-1/2 w-full text-center">
                <span className="font-gothic text-red-500 text-lg md:text-lg lg:text-xl 
                  [text-shadow:_0_0_8px_#ff000055]">
                  {artist.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}