import type { Metadata } from 'next'
import './globals.css'
<<<<<<< HEAD
=======
import Background from './components/Background'
import { Crimson_Text } from 'next/font/google'

const crimsonText = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
})
>>>>>>> frontend-harsh

export const metadata: Metadata = {
  title: 'Prisma',
  description: 'Created By Prisma',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body>{children}</body>
=======
    <html lang="en" className={crimsonText.variable}>
      <body suppressHydrationWarning={true}>
        <Background />
        {children}
      </body>
>>>>>>> frontend-harsh
    </html>
  )
}
