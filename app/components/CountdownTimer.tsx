"use client"
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, RenderPass } from 'three/examples/jsm/Addons.js'

export default function HauntedCountdown() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-02-28T00:00:00')
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simplified Three.js setup without background effects
  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Simple post-processing without glitch
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const animate = () => {
      requestAnimationFrame(animate)
      composer.render()
    }
    
    animate()

    return () => {
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  const triggerApocalypse = () => {
    // Add explosion animation here
    document.body.style.animation = 'darkExplosion 1s forwards'
    setTimeout(() => {
      document.body.style.animation = ''
    }, 1000)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        ref={containerRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Adjusted positioning with responsive padding */}
      <div className="absolute inset-0 flex items-start justify-center z-10 pt-[20vh] sm:pt-[25vh] md:pt-[30vh]">
        <div className="font-runic flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 px-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center mx-2 sm:mx-4">
              <span className="text-red-500 block" style={{
                textShadow: `0 0 10px #ff0000, 0 0 20px #ff0000`,
                fontSize: 'clamp(1.5rem, 8vw, 6rem)'
              }}>
                {String(value).padStart(2, '0')}
              </span>
              <div className="text-xs sm:text-lg md:text-xl mt-1 sm:mt-2 uppercase text-cyan-400">
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