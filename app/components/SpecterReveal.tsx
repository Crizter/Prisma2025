"use client"

import { useEffect, useRef, useState } from 'react';

const stories = [
  {
    id: 1,
    name: "Nikhita Gandhi & MD Desi",
    story: "Nikhita’s soulful Bollywood melodies and MD Desi’s energetic folk beats, like Desi Desi Na Bolya Kar, created Prisma 2024’s unique magic.",
    image: "/images/specter-1.png"
  },
  {
    id: 2,
    name: "Jordan Sandhu & Ajay Hooda",
    story: "Jordan’s peppy beats and Ajay’s raw energy, blending Punjabi and Haryanvi music, kept Prisma 2023’s audience dancing all night.",
    image: "/images/specter-2.png"
  },
  {
    id: 3,
    name: " Parmish Verma",
    story: "Parmish’s powerful vocals and high-energy stage presence, with hits like Aam Jahe Munde, made Prisma 2022 truly iconic.",
    image: "/images/specter-3.png"
  },
  {
    id: 4,
    name: "Landers:",
    story: "Landers’ fusion of pop, hip-hop, and Punjabi beats, including Gustakhiya, brought a high-energy, fresh, and unforgettable experience to Prisma 2020.",
    image: "/images/specter-1.png"
  },
  {
    id: 5,
    name: "Jassi Gill & Babbal Rai",
    story: "Jassi’s melodious charm and Babbal’s energetic vibes, with hits like Nikle Current, made Prisma 2019 an electrifying musical night.",
    image: "/images/specter-2.png"
  },
  {
    id: 6,
    name: "Akhil",
    story: "Akhil’s soulful voice and romantic hits like Khaab and duniya created a mesmerizing atmosphere, leaving Prisma 2018’s audience enchanted and emotional.",
    image: "/images/specter-3.png"
  }
];

export default function SpecterReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = window.scrollY;
      const startPosition = window.innerHeight; // Adjust as needed
      const endPosition = startPosition + 500; // Adjust for the height of the section

      if (scrollPosition >= startPosition && scrollPosition <= endPosition) {
        const progress = (scrollPosition - startPosition) / (endPosition - startPosition);
        setScale(Math.min(1, progress));
        setOpacity(Math.min(1, progress * 1.5));
      } else if (scrollPosition < startPosition) {
        setScale(0);
        setOpacity(0);
      } else {
        setScale(1);
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-transparent py-20">
      <h2 className="text-center text-3xl md:text-4xl text-red-500 font-gothic mb-8 
        [text-shadow:_0_0_10px_#ff0000,0_0_20px_#ff0000]  animate-creepy-float">
        Summon the specters of past performers.
      </h2>
      <p className="text-center text-lg text-white mb-12">
        Let their spectral images emerge from the abyss, bathed in a dim, eldritch glow. Each face flickers as if trapped between realms.
      </p>
      <div className="flex flex-col items-center">
        {stories.map((story) => (
          <div key={story.id} className="group relative bg-transparent p-4 mb-8 md:mb-12 w-full px-4 md:px-0 md:w-3/4">
            {/* Spectral Frame - Circle Enforcement */}
            <div className="absolute left-4 md:-left-20 top-1/2 -translate-y-1/2 
              w-24 h-24 md:w-48 md:h-48
              rounded-full border-4 border-red-500/30 
              overflow-hidden aspect-square  // Critical circle enforcement
              [box-shadow:0_0_40px_#ff000055,inset_0_0_20px_#8b0000]
              bg-[radial-gradient(circle_at_center,#8b000022_0%,transparent_60%)]">
              
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70
                rounded-full overflow-hidden"  // Double rounded clip
                style={{ backgroundImage: `url('${story.image}')` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff000033_10%,transparent_60%)]
                  rounded-full" />
                </div>
            </div>

            {/* Text Container */}
            <div className="ml-28 md:ml-40 bg-black/50 p-4 rounded-lg
              [text-shadow:_0_0_10px_#ff0000,0_0_20px_#ff0000] animate-flicker
              min-h-[120px] md:min-h-[160px] flex items-center">
              
              <div className="space-y-2">
                <div className="text-red-400 font-gothic text-lg md:text-xl 
                  [text-shadow:_0_0_8px_#ff0000]">
                  {story.name}
                </div>
                <p className="text-white text-sm md:text-base opacity-90">
                  {story.story}
                </p>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 