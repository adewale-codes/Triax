import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Triax',
  description: 'AI-powered fintech support ticket triage',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0c0c0c] text-[#e8e8e8] font-sans antialiased flex flex-col min-h-screen">
        <div className="flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #262626', padding: '24px', color: '#555555', fontSize: '13px', textAlign: 'center' }}>
          Triax&nbsp;&nbsp;·&nbsp;&nbsp;AI-powered fintech support triage&nbsp;&nbsp;·&nbsp;&nbsp;Built by Adewale Sulaiman&nbsp;&nbsp;·&nbsp;&nbsp;
          <a
            href="https://github.com/adewale-codes/triax"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#888888', textDecoration: 'none' }}
          >
            GitHub
          </a>
        </footer>

        {/* Floating LinkedIn pill */}
        <a
          href="https://uk.linkedin.com/in/adewale-sulaiman-5ba149172"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: '#141414',
            border: '1px solid #262626',
            color: '#e8e8e8',
            fontSize: '13px',
            textDecoration: 'none',
          }}
        >
          <span style={{ color: '#0077b5', fontWeight: 600 }}>in</span>
          Built by Adewale
        </a>

        <Analytics />
      </body>
    </html>
  )
}
