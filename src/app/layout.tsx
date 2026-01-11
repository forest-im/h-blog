import { ThemeProvider } from '@/context/ThemeProvider'
import { setInitialTheme } from '@/lib/setInitialTheme'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hazel’s Blog',
  description: 'Building, Learning, Sharing',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {/* <Header /> */}
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
