import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-[#1e1e2e] bg-[#13131a] px-6 py-3">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-5 w-5 rounded bg-[#6366f1] flex items-center justify-center">
              <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                <path d="M3 8h10M8 3v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-semibold text-[#e2e8f0] tracking-tight text-sm">Triax</span>
          </Link>
          <div className="flex items-center gap-0.5">
            <Link
              href="/"
              className="rounded px-3 py-1.5 text-sm text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e1e2e] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/queue"
              className="rounded px-3 py-1.5 text-sm text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e1e2e] transition-colors"
            >
              Queue
            </Link>
            <Link
              href="/tickets/new"
              className="rounded px-3 py-1.5 text-sm text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e1e2e] transition-colors"
            >
              New Ticket
            </Link>
            <Link
              href="/analytics"
              className="rounded px-3 py-1.5 text-sm text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e1e2e] transition-colors"
            >
              Analytics
            </Link>
          </div>
        </div>
        <Link
          href="/tickets/new"
          className="rounded bg-[#6366f1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4f46e5] transition-colors"
        >
          + New Ticket
        </Link>
      </div>
    </nav>
  )
}
