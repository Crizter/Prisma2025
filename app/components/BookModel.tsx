"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function BookModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Basic scene setup
    const scene = new THREE.Scene()
    scene.background = null

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 2, 5)

    // Renderer setup with specific WebGL parameters
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(0, 5, 10)
    scene.add(directionalLight)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI / 2

    // Load model
    const loader = new GLTFLoader()
    loader.load(
      '/Model/book.glb',
      (gltf) => {
        const model = gltf.scene

        // Ensure proper material setup
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            if (mesh.material) {
              // Ensure material is properly initialized
              const material = mesh.material as THREE.Material
              material.needsUpdate = true
            }
          }
        })

        // Reset and position model
        model.position.set(0, 0, 0)
        model.scale.set(1, 1, 1)

        scene.add(model)

        // Center model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        console.log('Model added successfully')
      },
      (progress) => {
        console.log(`Loading: ${(progress.loaded / progress.total * 100).toFixed(2)}%`)
      },
      (error) => {
        console.error('Error loading model:', error)
      }
    )

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    // Start animation after scene is set up
    animate()

    // Handle window resize
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      renderer.forceContextLoss()
      scene.clear()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}
    />
  )
} 