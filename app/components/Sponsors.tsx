"use client"

import { useRef, useEffect } from 'react'

export default function Sponsors() {
  const sponsorsRow1 = [
    { id: 1, name: "3D Engineering", logo: "/images/sponsors/3d-engi-removebg-preview.png" },
    { id: 2, name: "Adobe", logo: "/images/sponsors/adobe-removebg-preview.png" },
    { id: 3, name: "Balaji", logo: "/images/sponsors/balaji-removebg-preview.png" },
    { id: 4, name: "BigWig", logo: "/images/sponsors/bigwig-removebg-preview.png" },
    { id: 5, name: "Caterman", logo: "/images/sponsors/caterman-removebg-preview.png" },
    { id: 6, name: "Clovia", logo: "/images/sponsors/clovia-removebg-preview.png" },
    { id: 7, name: "Coolberg", logo: "/images/sponsors/coolberg-removebg-preview.png" },
    { id: 8, name: "F9Kart", logo: "/images/sponsors/f9kart-removebg-preview.png" },
  ];

  const sponsorsRow2 = [
    { id: 9, name: "Federal", logo: "/images/sponsors/federal-removebg-preview.png" },
    { id: 10, name: "Incredible", logo: "/images/sponsors/incredible-removebg-preview (1).png" },
    { id: 11, name: "Insight", logo: "/images/sponsors/insight-removebg-preview (1).png" },
    { id: 12, name: "Mac-V", logo: "/images/sponsors/mac-V-removebg-preview (2).png" },
    { id: 13, name: "Mojo", logo: "/images/sponsors/mojo-removebg-preview (1).png" },
    { id: 14, name: "Panchwati", logo: "/images/sponsors/panchwati-removebg-preview.png" },
    { id: 15, name: "Pardesi", logo: "/images/sponsors/pardesi-removebg-preview.png" },
    { id: 16, name: "Playerone", logo: "/images/sponsors/playerone-removebg-preview.png" },
  ];

  const sponsorsRow3 = [
    { id: 17, name: "Red-Bull", logo: "/images/sponsors/red-bull-removebg-preview.png" },
    { id: 18, name: "Security", logo: "/images/sponsors/security-removebg-preview.png" },
    { id: 19, name: "Siemens", logo: "/images/sponsors/siemens-removebg-preview (1).png" },
    { id: 20, name: "Sipp", logo: "/images/sponsors/sipp-removebg-preview.png" },
    { id: 21, name: "Skivia", logo: "/images/sponsors/skivia-removebg-preview.png" },
    { id: 22, name: "Svva", logo: "/images/sponsors/svva-removebg-preview.png" },
    { id: 23, name: "Timex", logo: "/images/sponsors/timex-removebg-preview.png" },
    { id: 24, name: "Vfission", logo: "/images/sponsors/vfission-removebg-preview.png" },
  ];

  // Triple each array for smoother infinite scroll
  const tripleSponsors1 = [...sponsorsRow1, ...sponsorsRow1, ...sponsorsRow1];
  const tripleSponsors2 = [...sponsorsRow2, ...sponsorsRow2, ...sponsorsRow2];
  const tripleSponsors3 = [...sponsorsRow3, ...sponsorsRow3, ...sponsorsRow3];

  return (
    <div className="relative w-full bg-transparent py-16 px-4 overflow-hidden min-h-screen">
      <h2 className="text-center text-3xl md:text-4xl text-red-500 font-gothic mb-8
        [text-shadow:_0_0_10px_#ff0000,0_0_20px_#ff0000]">
        Our Coven Benefactors
      </h2>

      <div className="container-slider mx-auto relative h-[85vh] overflow-hidden">
        {/* First Row - Left to Right */}
        <div className="slide-container flex h-[25vh] mb-8 w-[calc(300px*18)] animate-scroll-left">
          {tripleSponsors1.map((sponsor, index) => (
            <div key={`row1-${sponsor.id}-${index}`} 
              className="image-envelope backdrop-blur-xl bg-white/30 
                hover:bg-white/20 transition-all">
              <div className="slide-image">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="w-[90%] aspect-[3/2] object-contain mix-blend-multiply
                    hover:brightness-150 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Right to Left */}
        <div className="slide-container flex h-[25vh] mb-8 w-[calc(300px*18)] animate-scroll-right">
          {tripleSponsors2.map((sponsor, index) => (
            <div key={`row2-${sponsor.id}-${index}`} 
              className="image-envelope backdrop-blur-xl bg-white/30 
                hover:bg-white/20 transition-all">
              <div className="slide-image">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="w-[90%] aspect-[3/2] object-contain mix-blend-multiply
                    hover:brightness-150 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Third Row - Left to Right */}
        <div className="slide-container flex h-[25vh] w-[calc(300px*18)] animate-scroll-left">
          {tripleSponsors3.map((sponsor, index) => (
            <div key={`row3-${sponsor.id}-${index}`} 
              className="image-envelope backdrop-blur-xl bg-white/30 
                hover:bg-white/20 transition-all">
              <div className="slide-image">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="w-[90%] aspect-[3/2] object-contain mix-blend-multiply
                    hover:brightness-150 transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 