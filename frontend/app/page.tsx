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
          <div className="h-4 rounded bg-[#1e1e2e] animate-pulse" style={{ width: `${w}px` }} />
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
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-base font-semibold text-[#e2e8f0]">Support Queue</h1>
            {!loading && (
              <p className="text-xs text-[#64748b] mt-0.5">
                {total} {total === 1 ? 'ticket' : 'tickets'}
              </p>
            )}
          </div>
          <Link
            href="/tickets/new"
            className="rounded bg-[#6366f1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4f46e5] transition-colors"
          >
            + New Ticket
          </Link>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 mb-4">
            {error}
          </div>
        )}

        <div className="rounded-lg border border-[#1e1e2e] bg-[#13131a] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                {['Urgency', 'Issue Type', 'Title', 'Status', 'AI', 'Created'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-[10px] font-semibold text-[#64748b] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <p className="text-[#64748b] text-sm mb-3">No tickets in the queue</p>
                    <Link href="/tickets/new" className="text-xs text-[#6366f1] hover:underline">
                      Create the first ticket →
                    </Link>
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => router.push(`/tickets/${ticket.id}`)}
                    className="hover:bg-[#1e1e2e]/40 cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3.5">
                      <UrgencyIndicator score={ticket.urgency_score} />
                    </td>
                    <td className="px-4 py-3.5">
                      <IssueTypeTag issueType={ticket.issue_type} />
                    </td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <span className="text-[#e2e8f0] font-medium truncate block group-hover:text-white transition-colors">
                        {ticket.title}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <ProcessingStatus status={ticket.processing_status} />
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#64748b]">
                      {timeAgo(ticket.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
