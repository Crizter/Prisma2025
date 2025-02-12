import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// These could be moved to environment variables later
const TEMP_USERNAME = "prisma2024"
const TEMP_PASSWORD = "beta@access"
const IS_AUTH_ENABLED = true // Toggle to enable/disable authentication

export default function Auth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem('prismaAuth')
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === TEMP_USERNAME && credentials.password === TEMP_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('prismaAuth', 'authenticated')
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  if (!IS_AUTH_ENABLED) return <>{children}</>
  if (isAuthenticated) return <>{children}</>

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-gothic text-red-500 mb-2
            [text-shadow:_0_0_10px_#ff0000,0_0_20px_#ff0000] animate-creepy-float">
            PRISMA 2024
          </h2>
          <p className="text-red-400/80 text-sm">Beta Access Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-black/50 border border-red-500/30 text-white rounded-md
                focus:outline-none focus:border-red-500 transition-all"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-black/50 border border-red-500/30 text-white rounded-md
                focus:outline-none focus:border-red-500 transition-all"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-md
              transition-all border border-red-500/50 font-gothic
              [text-shadow:_0_0_10px_#ff0000]"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
} 