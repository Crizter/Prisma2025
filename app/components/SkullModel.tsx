"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Simplified state variables
    let currentRotation = 0;
    const targetRotation = Math.PI * 2;
    const rotationSpeed = 0.5;
    let lastTime = Date.now() * 0.001;
    let lastAngles = [0, Math.PI/2, Math.PI, 3*Math.PI/2];

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
      '/model/book.glb', // Is this your current path?
      (gltf) => {
        const model = gltf.scene
        
        const scale = isMobile ? 0.8 : (isLargeScreen ? 2.5 : 2.0)
        model.scale.set(scale, scale, scale)
        
        const yPosition = isMobile ? -0.5 : 0
        const zPosition = isMobile ? 0 : 0
        model.position.set(0, yPosition, zPosition)
        
        scene.add(model)
        
        // After scene setup, add these magical elements
        const createMagicalElement = (color: string) => {
          // Reduced sphere size for mobile
          const sphereSize = isMobile ? 0.08 : 0.2  // Reduced from 0.1 to 0.05 for mobile
          const geometry = new THREE.SphereGeometry(sphereSize, 32, 32)
          const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
          })
          
          const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: new THREE.TextureLoader().load('/textures/glow.png'),
              color: color,
              transparent: true,
              blending: THREE.AdditiveBlending,
              opacity: 0.7,
            })
          )
          // Reduced sprite scale for mobile
          const spriteScale = isMobile ? 0.3 : 1.2  // Reduced from 0.6 to 0.3 for mobile
          sprite.scale.set(spriteScale, spriteScale, 1)
          
          const element = new THREE.Mesh(geometry, material)
          element.add(sprite)
          return element
        }

        // Create 4 magical elements with spooky colors
        const magicalElements = [
          createMagicalElement('#FF4500'),
          createMagicalElement('#9400D3'),
          createMagicalElement('#00FF7F'),
          createMagicalElement('#4169E1'),
        ]

        // Add elements to the scene
        magicalElements.forEach((element, index) => {
          scene.add(element)
        });

        function animate() {
          requestAnimationFrame(animate);
          
          const currentTime = Date.now() * 0.001;
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;

          if (currentRotation < targetRotation) {
            const rotationSpeed = 0.05;
            model.rotation.y += rotationSpeed;
            currentRotation += rotationSpeed;
          }

          magicalElements.forEach((element, index) => {
            lastAngles[index] = (lastAngles[index] + deltaTime * rotationSpeed) % (2 * Math.PI);
            
            const radius = isMobile ? 0.8 : 2;  // Reduced radius from 1 to 0.8 for mobile
            const yOffset = isMobile ? 0.1 : 0.5;  // Reduced offset from 0.2 to 0.1 for mobile
            
            element.position.x = Math.cos(lastAngles[index]) * radius;
            element.position.y = Math.sin(lastAngles[index]) * radius + yOffset;
            
            const pulseBase = isMobile ? 0.4 : 1.5;  // Reduced pulse from 0.8 to 0.4 for mobile
            const pulse = Math.sin(currentTime * 3 + index) * 0.3 + 1.2;
            if (element.children[0]) {
              element.children[0].scale.set(pulseBase * pulse, pulseBase * pulse, 1);
            }
          });
          
          renderer.render(scene, camera);
        }

        animate();
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