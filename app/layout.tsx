import { Crimson_Text } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'

const crimsonText = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'Prisma 2025 | SRM University Delhi-NCR | Techno-Cultural Fest',
  description: 'Official website for SRM University Delhi-NCR\'s Prisma 2025 -Techno-cultural fest from February 28 to March 1. Featuring competitions, performances & technical events.',
  keywords: [
    'Prisma',
    'Prisma-SRMUH',
    'Prisma 2025',
    'SRM Delhi-NCR fest',
    'College fest Haryana',
    'College fest Delhi-NCR',
    'College fest NCR',
    'College fest Delhi',
    'Technical events Sonepat',
    'Horror theme festival',
    'SRM University cultural fest'
  ],
  openGraph: {
    images: '/prisma-2025-og.jpg',
  },
}

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
