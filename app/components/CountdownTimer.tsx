"use client"
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, RenderPass } from 'three/examples/jsm/Addons.js'

export default function HauntedCountdown() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [yOffset, setYOffset] = useState(0)
  const [step, setStep] = useState(0)
  
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-02-28T00:00:00')
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  // Comment out scroll effect
  /*
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const scrollPosition = window.scrollY
      const scaleStartPosition = 278
      const scaleEndPosition = 3000
      const fadeLength = 2000
      
      if (scrollPosition < scaleStartPosition) {
        setScale(1)
        setYOffset(0)
      } 
      else if (scrollPosition >= scaleStartPosition && scrollPosition <= scaleEndPosition) {
        const scaleProgress = Math.min(1, (scrollPosition - scaleStartPosition) / 200)
        const newScale = 1 + (scaleProgress * 0.8)
        setScale(Math.min(1.8, newScale))
        setYOffset(0)
      }
      else {
        const moveProgress = (scrollPosition - scaleEndPosition) / fadeLength
        const moveDistance = -moveProgress * window.innerHeight * 2
        setScale(1.8)
        setYOffset(moveDistance)
      }
    }

    const scrollListener = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])
  */

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simplified Three.js setup without background effects
  // useEffect(() => {
  //   if (!containerRef.current) return

  //   const scene = new THREE.Scene()
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
  //   const renderer = new THREE.WebGLRenderer({ 
  //     alpha: true,
  //     antialias: true
  //   })
    
  //   renderer.setSize(window.innerWidth, window.innerHeight)
  //   containerRef.current.appendChild(renderer.domElement)

  //   // Simple post-processing without glitch
  //   const composer = new EffectComposer(renderer)
  //   composer.addPass(new RenderPass(scene, camera))

  //   const animate = () => {
  //     requestAnimationFrame(animate)
  //     composer.render()
  //   }
    
  //   animate()

  //   return () => {
  //     containerRef.current?.removeChild(renderer.domElement)
  //     renderer.dispose()
  //   }
  // }, [])

  const triggerApocalypse = () => {
    // Add explosion animation here
    document.body.style.animation = 'darkExplosion 1s forwards'
    setTimeout(() => {
      document.body.style.animation = ''
    }, 1000)
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{
        // transform: `scale(${scale}) translateY(${yOffset}px)`, // Disabled transform
        // transformOrigin: 'center center',
        // opacity: Math.max(0, 1 - (Math.abs(yOffset) / (window.innerHeight * 0.8))),
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out'
      }}
    >
      <div className="absolute inset-0 z-0">
        <canvas ref={containerRef} />
      </div>
      
      <div className="flex items-center justify-center z-10">
        <div className="font-runic flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 px-2 sm:px-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center mx-2 sm:mx-4">
              <span className="text-red-500 block" style={{
                textShadow: `0 0 10px #ff0000, 0 0 20px #ff0000`,
                fontSize: `clamp(2rem, ${window.innerWidth < 640 ? '5vw' : '4vw'}, 6rem)`
              }}>
                {String(value).padStart(2, '0')}
              </span>
              <div className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2 uppercase font-gothic tracking-wider text-white/70 
                transition-all duration-300 hover:text-orange-500
                [text-shadow:0_0_10px_rgba(255,165,0,0.5),0_0_20px_rgba(255,165,0,0.3)]
                hover:[text-shadow:0_0_10px_#ff4d00,0_0_20px_#ff4d00,0_0_30px_#ff4d00]"
              >
                {unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'Runic';
          src: url('/fonts/Ancient Runes_1_1.ttf') format('truetype');
        }

        @keyframes flicker {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }

        @keyframes colorPulse {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes darkExplosion {
          0% { 
            filter: brightness(1) blur(0);
            transform: scale(1);
          }
          50% { 
            filter: brightness(0.5) blur(10px);
            transform: scale(1.2);
          }
          100% { 
            filter: brightness(1) blur(0);
            transform: scale(1);
          }
        }

        .font-runic {
          font-family: 'Runic', sans-serif;
          color: #ff0000;
        }
      `}</style>
    </div>
  )
} 