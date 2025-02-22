"use client"
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, LoadingManager, OrbitControls } from '@react-three/drei'

// Create a loading manager
const loadingManager = new LoadingManager()

// Skull Model Component
function SkullModel({ onLoad }: { onLoad: () => void }) {
  const { scene } = useGLTF('/path-to-your-skull.glb', loadingManager)
  
  useEffect(() => {
    loadingManager.onLoad = () => {
      onLoad()
    }
  }, [onLoad])

  return <primitive object={scene} />
}

export function Loader() {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [showText, setShowText] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      setProgress((itemsLoaded / itemsTotal) * 100)
    }
  }, [])

  const handleModelLoad = () => {
    setModelLoaded(true)
    setTimeout(() => {
      setShowText(true)
    }, 500)
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
      {!modelLoaded && (
        <div className="text-white mb-4">
          Loading... {Math.round(progress)}%
        </div>
      )}

      <div className={`w-[200px] h-[200px] transition-opacity duration-1000 ${modelLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <OrbitControls enableZoom={false} autoRotate />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <SkullModel onLoad={handleModelLoad} />
        </Canvas>
      </div>

      {showText && (
        <div className="text-white mt-4 animate-fade-in">
          Summoning the darkness...
        </div>
      )}
    </div>
  )
} 