"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Add these shader constants at the top
const hologramVertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  }
`

const hologramFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform sampler2D uTexture;
  uniform float uIntensity;
  uniform float uLayer;
  varying vec2 vUv;
  
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    float strength = mod(vUv.y * 10.0 + uTime + uLayer * 3.14, 1.0);
    strength = pow(strength, 2.0);
    
    vec3 color = uColor * texColor.rgb * (uIntensity * 0.1);
    color += strength * 0.08;
    
    float depthGlow = sin(uLayer * 3.14) * 0.15 + 0.45;
    color *= depthGlow;
    
    float scanline = sin(vUv.y * 150.0 + uTime * 3.0) * 0.05 + 0.95;
    color *= scanline;
    
    float pulse = sin(uTime * 2.0 + uLayer * 2.0) * 0.05 + 0.95;
    color *= pulse;
    
    float alpha = texColor.a * (strength * 0.3 + 0.5) * pulse * (uIntensity * 0.2);
    
    gl_FragColor = vec4(color, alpha);
  }
`

// Add this new shader for light rays
const rayVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const rayFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    float strength = abs(vUv.y - 0.5);
    strength = 1.0 - strength;
    
    // Add glitch effect
    float glitch = step(0.9, sin(uTime * 10.0 + vUv.y * 30.0));
    strength *= 1.0 + glitch * 0.2;
    
    // Add flickering
    float flicker = sin(uTime * 5.0) * 0.1 + 0.9;
    
    vec3 color = vec3(0.0, 1.0, 0.6) * strength * flicker;
    float alpha = strength * 0.6;
    
    gl_FragColor = vec4(color, alpha);
  }
`

// Simple glitch vertex shader
const glitchVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Glitch fragment shader
const glitchFragmentShader = `
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uIntensity;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Glitch effect
    float glitchTime = uTime * 10.0;
    float glitchIntensity = 0.02 * uIntensity;
    
    // Horizontal glitch
    if (sin(glitchTime) > 0.95) {
      uv.x += sin(uv.y * 10.0 + glitchTime) * glitchIntensity;
    }
    
    // RGB split
    vec4 texColor = texture2D(uTexture, uv);
    float rOffset = sin(glitchTime * 0.5) * 0.003;
    float bOffset = sin(glitchTime * 0.5 + 1.0) * 0.003;
    
    float r = texture2D(uTexture, vec2(uv.x + rOffset, uv.y)).r;
    float g = texColor.g;
    float b = texture2D(uTexture, vec2(uv.x + bOffset, uv.y)).b;
    
    // Scanline effect
    float scanline = sin(uv.y * 200.0 + uTime * 5.0) * 0.02 + 0.98;
    
    vec3 color = vec3(r, g, b) * scanline;
    float alpha = texColor.a * uIntensity;
    
    gl_FragColor = vec4(color, alpha);
  }
`

export default function Model() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationCompleteTime = Date.now() * 0.001

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
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
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
          const sphereSize = isMobile ? 0.09 : 0.2  // Reduced from 0.1 to 0.05 for mobile
          const geometry = new THREE.SphereGeometry(sphereSize, 32, 32)
          const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1.0,
          })
          
          const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: new THREE.TextureLoader().load('/textures/glow.png'),
              color: color,
              transparent: true,
              blending: THREE.AdditiveBlending,
              opacity: 1.0,
            })
          )
          // Reduced sprite scale for mobile
          const spriteScale = isMobile ? 0.3 : 1.0  // Reduced from 0.6 to 0.3 for mobile
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

        // Update the logo creation function
        const createFloatingLogo = () => {
          const group = new THREE.Group()
          
          // Load logo texture
          const texture = new THREE.TextureLoader().load('/images/prisma-logo-hologram.png')
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          
          // Create main logo plane
          const scale = isMobile ? 0.8 : (isLargeScreen ? 2.0 : 1.5)
          const geometry = new THREE.PlaneGeometry(2 * scale, 2 * scale)
          
          const material = new THREE.ShaderMaterial({
            vertexShader: glitchVertexShader,
            fragmentShader: glitchFragmentShader,
            uniforms: {
              uTime: { value: 0 },
              uTexture: { value: texture },
              uIntensity: { value: 1.0 }
            },
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
          
          const logo = new THREE.Mesh(geometry, material)
          
          // Add glow sprite
          const glowTexture = new THREE.TextureLoader().load('/textures/glow.png')
          const glowSprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: glowTexture,
              color: 0x00ffaa,
              transparent: true,
              blending: THREE.AdditiveBlending,
              opacity: 0.3
            })
          )
          
          const glowScale = scale * 1.2
          glowSprite.scale.set(glowScale, glowScale, 1)
          glowSprite.position.z = -0.1
          
          group.add(glowSprite)
          group.add(logo)
          
          // Position the group
          const baseY = isMobile ? 1.0 : (isLargeScreen ? 1.5 : 1.3)
          group.position.y = baseY * scale
          group.userData.initialY = baseY * scale
          
          // Start hidden
          group.visible = false
          
          return group
        }

        const floatingLogo = createFloatingLogo()
        scene.add(floatingLogo)

        function animate() {
          requestAnimationFrame(animate)
          
          const currentTime = Date.now() * 0.001
          const deltaTime = currentTime - lastTime
          lastTime = currentTime

          if (currentRotation < targetRotation) {
            const rotationSpeed = 0.05;
            model.rotation.y += rotationSpeed;
            currentRotation += rotationSpeed;
          }

          magicalElements.forEach((element, index) => {
            const radius = isMobile ? 1.2 : (isLargeScreen ? 2.0 : 2.0)
            const speed = 0.5
            const angle = currentTime * speed + (index * (Math.PI / 2))
            
            element.position.x = Math.cos(angle) * radius
            element.position.y = Math.sin(angle) * radius
            
            const sprite = element.children[0]
            if (sprite && sprite instanceof THREE.Sprite) {
              const pulseBase = isMobile ? 0.3 : (isLargeScreen ? 1.5 : 1.0)
              const pulse = Math.sin(currentTime * 3 + index) * 0.2 + 1.0
              sprite.scale.set(pulseBase * pulse, pulseBase * pulse, 1)
            }
          });
          
          // Show and animate logo after book rotation
          if (currentRotation >= targetRotation && floatingLogo) {
            if (!floatingLogo.visible) {
              floatingLogo.visible = true
            }
            
            const emergenceProgress = Math.min(1, (currentTime - rotationCompleteTime) * 0.5)
            
            // Update shader uniforms
            floatingLogo.children.forEach((child) => {
              if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
                child.material.uniforms.uTime.value = currentTime
                child.material.uniforms.uIntensity.value = emergenceProgress
              }
            })
            
            // Floating animation
            const initialY = floatingLogo.userData.initialY
            floatingLogo.position.y = initialY + Math.sin(currentTime) * 0.05
            
            // Subtle rotation
            floatingLogo.rotation.z = Math.sin(currentTime * 0.5) * 0.03
          }

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
      className="w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[800px] xl:h-[900px] mb-4 sm:mb-6 lg:mb-8" 
    />
  )
}