'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/queue', label: 'Queue' },
  { href: '/tickets/new', label: 'New Ticket' },
  { href: '/analytics', label: 'Analytics' },
]

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ borderBottom: '1px solid #262626', backgroundColor: '#141414' }} className="px-6 py-3">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <div className="h-5 w-5 rounded flex items-center justify-center" style={{ backgroundColor: '#d4a853' }}>
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                  <path d="M3 8h10M8 3v10" stroke="#0c0c0c" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-sm" style={{ color: '#e8e8e8' }}>Triax</span>
            </Link>
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded px-3 py-1.5 text-sm transition-colors"
                  style={{ color: '#888888' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888888')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tickets/new"
              className="hidden md:inline-flex rounded px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ backgroundColor: '#d4a853', color: '#0c0c0c' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e0b96a')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#d4a853')}
            >
              + New Ticket
            </Link>
            <button
              type="button"
              onClick={() => setOpen((p) => !p)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded transition-colors md:hidden"
              style={{ color: '#888888' }}
            >
              {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 flex flex-col gap-1 pt-3 md:hidden" style={{ borderTop: '1px solid #262626' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center rounded px-3 py-3 text-sm transition-colors min-h-[44px]"
                style={{ color: '#888888' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/tickets/new"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center rounded px-3 py-3 text-sm font-medium transition-colors min-h-[44px]"
              style={{ backgroundColor: '#d4a853', color: '#0c0c0c' }}
            >
              + New Ticket
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
