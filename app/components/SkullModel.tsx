"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 1, 2)
    scene.add(directionalLight)

    const isMobile = window.innerWidth < 768
    const isLargeScreen = window.innerWidth >= 1024
    
    // Adjust camera position based on screen size
    camera.position.z = isMobile ? 4 : (isLargeScreen ? 5 : 3)

    // Load the model with progress tracking
    const loader = new GLTFLoader()
    loader.load(
      '/Model/Skull_hanged.glb', // Update this to match your file name
      (gltf) => {
        const model = gltf.scene
        // Adjust scale based on screen size
        const scale = isMobile ? 3.5 : (isLargeScreen ? 3 : 3.0)
        model.scale.set(scale, scale, scale)
        
        // Adjust Y position based on screen size
        const yPosition = isMobile ? -0.2 : 1.7
        model.position.set(0, yPosition, 0)
        
        scene.add(model)
        
        // Auto-rotate animation
        function animate() {
          requestAnimationFrame(animate)
          model.rotation.y += 0.005
          renderer.render(scene, camera)
        }
        animate()
      },
      // Progress callback
      (progress) => {
        const percentComplete = (progress.loaded / progress.total) * 100
        console.log(`Loading: ${percentComplete}%`)
      },
      // Error callback
      (error) => {
        console.error('Error loading model:', error)
      }
    )

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newIsMobile = window.innerWidth < 768
      const newIsLargeScreen = window.innerWidth >= 1024
      const containerAspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.aspect = containerAspect
      camera.position.z = newIsMobile ? 4 : (newIsLargeScreen ? 5 : 3)
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      
      // Update model position on resize if it exists
      const model = scene.getObjectByProperty('type', 'Group')
      if (model) {
        const yPosition = newIsMobile ? -0.2 : -0.5
        model.position.setY(yPosition)
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] sm:h-[550px] md:h-[500px] lg:h-[500px] xl:h-[550px] mb-4 sm:mb-6 lg:mb-8" 
    />
  )
}