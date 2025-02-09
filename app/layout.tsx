import { Crimson_Text } from 'next/font/google'
import './globals.css'

const crimsonText = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={crimsonText.variable}>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
