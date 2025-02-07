"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0) // Make background transparent

    // Create particles with fire colors
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 8000
    const posArray = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10
      posArray[i + 1] = (Math.random() - 0.5) * 10
      posArray[i + 2] = (Math.random() - 0.5) * 10

      // Colors - mix of red, orange, and yellow
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        // Red
        colors[i] = 1
        colors[i + 1] = 0.2
        colors[i + 2] = 0
      } else if (colorChoice < 0.7) {
        // Orange
        colors[i] = 1
        colors[i + 1] = 0.5
        colors[i + 2] = 0
      } else {
        // Yellow
        colors[i] = 1
        colors[i + 1] = 0.8
        colors[i + 2] = 0
      }
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true, // Enable vertex colors
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending // Add glow effect
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      particlesMesh.rotation.y += 0.002
      particlesMesh.rotation.x += 0.0005 // Slight vertical rotation for more dynamic effect
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" /> {/* Updated z-index */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-black to-gray-900 opacity-90" />
    </>
  )
}

