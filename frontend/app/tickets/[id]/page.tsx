'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getTicket, Ticket } from '@/lib/api'
import { timeAgo } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import StatusBadge from '@/components/StatusBadge'
import UrgencyIndicator from '@/components/UrgencyIndicator'
import IssueTypeTag from '@/components/IssueTypeTag'
import ExplanationPanel from '@/components/ExplanationPanel'
import ProcessingStatus from '@/components/ProcessingStatus'

const DONE_STATUSES = ['completed', 'failed']

function Shimmer({ width = 'full' }: { width?: string }) {
  return <div className={`h-4 rounded animate-pulse w-${width}`} style={{ backgroundColor: '#262626' }} />
}

function ShimmerBlock() {
  return (
    <div className="space-y-2.5">
      <Shimmer />
      <Shimmer />
      <div className="h-4 rounded w-3/4 animate-pulse" style={{ backgroundColor: '#262626' }} />
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded px-2.5 py-1 text-xs font-medium transition-all"
      style={copied
        ? { border: '1px solid rgba(74,158,107,0.35)', color: '#4a9e6b', backgroundColor: 'rgba(74,158,107,0.06)' }
        : { border: '1px solid #262626', color: '#888888' }
      }
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  )
}

function DocCard({ doc }: { doc: { title: string; content: string; category: string } }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded overflow-hidden" style={{ border: '1px solid #262626', backgroundColor: '#0c0c0c' }}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
        style={{ color: '#888888' }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider flex-shrink-0" style={{ color: '#555555' }}>
            {doc.category}
          </span>
          <span style={{ color: '#262626' }}>·</span>
          <span className="text-sm truncate" style={{ color: '#e8e8e8' }}>{doc.title}</span>
        </div>
        <span className="ml-3 flex-shrink-0 text-lg leading-none" style={{ color: '#888888' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3" style={{ borderTop: '1px solid #262626' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{doc.content}</p>
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#555555' }}>
      {children}
    </h2>
  )
}

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    let interval: ReturnType<typeof setInterval> | null = null

    const load = async () => {
      try {
        const data = await getTicket(id)
        if (cancelled) return
        setTicket(data)

        if (!DONE_STATUSES.includes(data.processing_status)) {
          interval = setInterval(async () => {
            try {
              const updated = await getTicket(id)
              if (cancelled) return
              setTicket(updated)
              if (DONE_STATUSES.includes(updated.processing_status) && interval) {
                clearInterval(interval)
              }
            } catch {
              if (interval) clearInterval(interval)
            }
          }, 3000)
        }
      } catch {
        if (!cancelled) setError('Ticket not found or unavailable.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
      if (interval) clearInterval(interval)
    }
  }, [id])

  const isProcessing = ticket && !DONE_STATUSES.includes(ticket.processing_status)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0c0c0c' }}>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Link
          href="/queue"
          className="inline-flex items-center gap-1.5 text-sm transition-colors mb-6"
          style={{ color: '#888888' }}
        >
          Back to Queue
        </Link>

        {loading && (
          <div className="space-y-4">
            <div className="h-7 w-72 rounded animate-pulse" style={{ backgroundColor: '#141414' }} />
            <div className="h-40 rounded animate-pulse" style={{ backgroundColor: '#141414' }} />
            <div className="h-32 rounded animate-pulse" style={{ backgroundColor: '#141414' }} />
          </div>
        )}

        {error && (
          <div className="rounded px-5 py-4 text-sm" style={{ border: '1px solid rgba(192,57,43,0.25)', backgroundColor: 'rgba(192,57,43,0.06)', color: '#c0392b' }}>
            {error}
          </div>
        )}

        {ticket && (
          <div className="space-y-6">
            {/* Ticket header */}
            <div className="rounded p-6" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-base font-semibold leading-snug" style={{ color: '#e8e8e8' }}>{ticket.title}</h1>
                <StatusBadge status={ticket.status} />
              </div>
              {ticket.description && (
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#888888' }}>{ticket.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-3" style={{ borderTop: '1px solid #262626' }}>
                <span className="font-mono text-[11px] select-all" style={{ color: '#555555' }}>{ticket.id}</span>
                <span className="text-xs" style={{ color: '#555555' }}>Created {timeAgo(ticket.created_at)}</span>
                <span className="text-xs" style={{ color: '#555555' }}>Updated {timeAgo(ticket.updated_at)}</span>
              </div>
            </div>

            {/* AI triage panel */}
            <div>
              <SectionLabel>AI Triage</SectionLabel>
              <div className="rounded p-6 space-y-6" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#555555' }}>Processing</p>
                    <ProcessingStatus status={ticket.processing_status} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#555555' }}>Issue Type</p>
                    {isProcessing ? <Shimmer width="24" /> : <IssueTypeTag issueType={ticket.issue_type} />}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#555555' }}>Urgency</p>
                    {isProcessing ? <Shimmer width="20" /> : <UrgencyIndicator score={ticket.urgency_score} />}
                  </div>
                </div>

                {ticket.processing_status === 'failed' && (
                  <div className="rounded px-3 py-2.5 text-xs" style={{ border: '1px solid rgba(192,57,43,0.25)', backgroundColor: 'rgba(192,57,43,0.06)', color: '#c0392b' }}>
                    AI processing failed for this ticket. You may resubmit or handle it manually.
                  </div>
                )}

                {isProcessing && <ShimmerBlock />}
                {!isProcessing && ticket.explanation && (
                  <ExplanationPanel explanation={ticket.explanation} />
                )}
              </div>
            </div>

            {/* Suggested reply */}
            {(isProcessing || ticket.suggested_reply) && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <SectionLabel>Suggested Reply</SectionLabel>
                  {!isProcessing && ticket.suggested_reply && (
                    <CopyButton text={ticket.suggested_reply} />
                  )}
                </div>
                <div className="rounded p-5" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
                  {isProcessing ? (
                    <ShimmerBlock />
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#888888' }}>
                      {ticket.suggested_reply}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Relevant docs */}
            {!isProcessing && ticket.relevant_docs && ticket.relevant_docs.length > 0 && (
              <div>
                <SectionLabel>
                  Relevant Policy Documents ({ticket.relevant_docs.length})
                </SectionLabel>
                <div className="space-y-2">
                  {ticket.relevant_docs.map((doc, i) => (
                    <DocCard key={i} doc={doc} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
