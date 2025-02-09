"use client"

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  )
} 