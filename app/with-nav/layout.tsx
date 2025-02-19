"use client"
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-24">
      <Navigation />
      <main className="px-4 sm:px-6 md:px-8">
        {children}
      </main>
    </div>
  )
} 