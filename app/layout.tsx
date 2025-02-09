import { ReactNode } from 'react'
import Background from './components/Background'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black/95 text-white overflow-x-hidden scroll-smooth snap-y snap-mandatory">
        <Background />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
