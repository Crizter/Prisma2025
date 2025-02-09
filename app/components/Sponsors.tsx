"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

export default function Sponsors() {
  const sponsors = [
    { id: 1, name: "Phantom Records", logo: "/images/sponsors/phantom.png" },
    { id: 2, name: "Eclipse Brews", logo: "/images/sponsors/eclipse.png" },
    { id: 3, name: "Nightshade Apparel", logo: "/images/sponsors/nightshade.png" },
    { id: 4, name: "Obsidian Tech", logo: "/images/sponsors/obsidian.png" },
    // Add more sponsors as needed
  ];

  // Duplicate sponsors for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="relative w-full bg-black/80 py-20 px-4 overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl text-red-500 font-gothic mb-12
        [text-shadow:_0_0_10px_#ff0000,0_0_20px_#ff0000]">
        Our Coven Benefactors
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        speed={2000}
        freeMode={true}
        className="!overflow-visible"
      >
        {duplicatedSponsors.map((sponsor, index) => (
          <SwiperSlide 
            key={`${sponsor.id}-${index}`}
            className="!w-[250px] !h-[220px]"
          >
            <div className="image-envelope w-full h-full bg-black/50 rounded-lg
              border border-red-900/50 hover:border-red-600 transition-all
              hover:scale-105 hover:[box-shadow:0_0_30px_#ff000055]">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                className="h-full w-full object-contain p-4 filter brightness-125
                  hover:brightness-150 transition-all mix-blend-color-burn"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 