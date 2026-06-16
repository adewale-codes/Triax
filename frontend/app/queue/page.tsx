'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTickets, Ticket } from '@/lib/api'
import { timeAgo } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import StatusBadge from '@/components/StatusBadge'
import UrgencyIndicator from '@/components/UrgencyIndicator'
import IssueTypeTag from '@/components/IssueTypeTag'
import ProcessingStatus from '@/components/ProcessingStatus'

function SkeletonRow() {
  return (
    <tr>
      {[40, 80, 160, 56, 72, 48].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-4 rounded animate-pulse" style={{ width: `${w}px`, backgroundColor: '#262626' }} />
        </td>
      ))}
    </tr>
  )
}

export default function QueuePage() {
  const router = useRouter()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data.tickets)
      setTotal(data.total)
    } catch {
      setError('Unable to reach the API. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
    const interval = setInterval(fetchTickets, 10_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0c0c0c' }}>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-base font-semibold" style={{ color: '#e8e8e8' }}>Support Queue</h1>
            {!loading && (
              <p className="text-xs mt-0.5" style={{ color: '#888888' }}>
                {total} {total === 1 ? 'ticket' : 'tickets'}
              </p>
            )}
          </div>
          <Link
            href="/tickets/new"
            className="rounded px-3 py-1.5 text-xs font-medium transition-colors"
            style={{ backgroundColor: '#d4a853', color: '#0c0c0c' }}
          >
            + New Ticket
          </Link>
        </div>

        {error && (
          <div className="rounded mb-4 px-4 py-3 text-sm" style={{ border: '1px solid rgba(192,57,43,0.3)', backgroundColor: 'rgba(192,57,43,0.06)', color: '#c0392b' }}>
            {error}
          </div>
        )}

        {/* Desktop table */}
        <div className="hidden md:block rounded overflow-hidden" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #262626' }}>
                {['Urgency', 'Issue Type', 'Title', 'Status', 'AI', 'Created'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: '#555555' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <p className="text-sm mb-3" style={{ color: '#888888' }}>No tickets in the queue</p>
                    <Link href="/tickets/new" className="text-xs" style={{ color: '#d4a853' }}>
                      Create the first ticket
                    </Link>
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => router.push(`/tickets/${ticket.id}`)}
                    className="cursor-pointer transition-colors group"
                    style={{ borderTop: '1px solid #262626' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
                  >
                    <td className="px-4 py-3.5"><UrgencyIndicator score={ticket.urgency_score} /></td>
                    <td className="px-4 py-3.5"><IssueTypeTag issueType={ticket.issue_type} /></td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <span className="font-medium truncate block" style={{ color: '#e8e8e8' }}>{ticket.title}</span>
                    </td>
                    <td className="px-4 py-3.5"><StatusBadge status={ticket.status} /></td>
                    <td className="px-4 py-3.5"><ProcessingStatus status={ticket.processing_status} /></td>
                    <td className="px-4 py-3.5 font-mono text-xs" style={{ color: '#555555' }}>{timeAgo(ticket.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden space-y-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded p-4 space-y-2.5" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
                <div className="h-4 w-3/4 rounded animate-pulse" style={{ backgroundColor: '#262626' }} />
                <div className="h-3 w-1/2 rounded animate-pulse" style={{ backgroundColor: '#262626' }} />
              </div>
            ))
          ) : tickets.length === 0 ? (
            <div className="rounded px-4 py-16 text-center" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
              <p className="text-sm mb-3" style={{ color: '#888888' }}>No tickets in the queue</p>
              <Link href="/tickets/new" className="text-xs" style={{ color: '#d4a853' }}>
                Create the first ticket
              </Link>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => router.push(`/tickets/${ticket.id}`)}
                className="rounded p-4 cursor-pointer transition-colors"
                style={{ border: '1px solid #262626', backgroundColor: '#141414' }}
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <UrgencyIndicator score={ticket.urgency_score} />
                  <span className="font-medium text-sm leading-snug flex-1" style={{ color: '#e8e8e8' }}>
                    {ticket.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <IssueTypeTag issueType={ticket.issue_type} />
                  <StatusBadge status={ticket.status} />
                  <ProcessingStatus status={ticket.processing_status} />
                  <span className="font-mono text-xs ml-auto" style={{ color: '#555555' }}>
                    {timeAgo(ticket.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
