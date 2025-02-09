import type { Metadata } from 'next'
import './globals.css'
import { Crimson_Text } from 'next/font/google'

const crimsonText = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
})

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
    <html lang="en" className={crimsonText.variable}>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
