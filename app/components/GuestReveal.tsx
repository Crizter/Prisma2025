"use client"
import { useState } from 'react'

export default function GuestReveal() {
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

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-12 h-full px-4 py-8 md:py-12 min-h-[500px] lg:min-h-[600px]">
        {artists.filter(a => !a.disabled).map((artist) => (
          <div 
            key={artist.id}
            className="relative group w-full aspect-square max-w-[300px] md:max-w-[400px] lg:max-w-[500px] mx-auto"
          >
            {/* Frame Container */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full border-4 md:border-6 lg:border-8 border-red-500/30 
                [box-shadow:0_0_60px_#ff000055,inset_0_0_40px_#8b0000]
                bg-[radial-gradient(circle_at_center,#8b000022_0%,transparent_60%)]">
                
                <div className="absolute inset-[3px] md:inset-[5px] rounded-full bg-[radial-gradient(circle_at_center,#ff000033_10%,transparent_60%)]" />
              </div>

              {/* Silhouette Image */}
              <div 
                className="absolute inset-3 md:inset-5 lg:inset-7 rounded-full bg-contain bg-no-repeat bg-center 
                  opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" 
                style={{ backgroundImage: `url('${artist.silhouette}')` }}
              />
            </div>

            {/* Artist Name - Adjusted positioning */}
            <div className="absolute -bottom-8 md:-bottom-6 left-1/2 -translate-x-1/2 w-full text-center">
              <span className="font-gothic text-red-500 text-base md:text-lg lg:text-xl 
                [text-shadow:_0_0_8px_#ff000055]">
                {artist.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}