'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createTicket } from '@/lib/api'

const MAX_TITLE = 255

export default function NewTicketPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [titleError, setTitleError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setTitleError(null)

    if (!title.trim()) {
      setTitleError('Title is required')
      return
    }
    if (title.length > MAX_TITLE) {
      setTitleError(`Title must be ${MAX_TITLE} characters or fewer`)
      return
    }

    setSubmitting(true)
    try {
      const ticket = await createTicket({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      router.push(`/tickets/${ticket.id}`)
    } catch {
      setError('Failed to create ticket. Please try again.')
      setSubmitting(false)
    }
  }

  const titleRemaining = MAX_TITLE - title.length
  const titleOverLimit = title.length > MAX_TITLE

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/queue"
            className="text-sm text-[#64748b] hover:text-[#e2e8f0] transition-colors"
          >
            ← Queue
          </Link>
          <span className="text-[#1e1e2e]">/</span>
          <span className="text-sm text-[#e2e8f0]">New Ticket</span>
        </div>

        <div className="mb-6">
          <h1 className="text-base font-semibold text-[#e2e8f0]">Submit a ticket</h1>
          <p className="text-xs text-[#64748b] mt-1">
            Tickets are automatically triaged by the AI pipeline after submission.
          </p>
        </div>

        <div className="rounded-lg border border-[#1e1e2e] bg-[#13131a] p-6">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="title" className="text-xs font-semibold text-[#e2e8f0] uppercase tracking-wide">
                  Title <span className="text-red-500 ml-0.5">*</span>
                </label>
                <span className={`text-xs tabular-nums ${titleOverLimit ? 'text-red-400' : 'text-[#64748b]'}`}>
                  {titleRemaining} left
                </span>
              </div>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (titleError) setTitleError(null)
                }}
                placeholder="Brief summary of the issue"
                className={`w-full rounded bg-[#0a0a0f] border px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none focus:ring-1 focus:ring-[#6366f1] transition-all ${
                  titleError ? 'border-red-500/50' : 'border-[#1e1e2e] focus:border-[#6366f1]'
                }`}
                autoFocus
              />
              {titleError && (
                <p className="mt-1.5 text-xs text-red-400">{titleError}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-semibold text-[#e2e8f0] uppercase tracking-wide mb-1.5">
                Description{' '}
                <span className="text-[#64748b] font-normal normal-case">— optional</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any additional context, transaction IDs, or steps to reproduce..."
                rows={6}
                className="w-full rounded bg-[#0a0a0f] border border-[#1e1e2e] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all resize-none"
              />
            </div>

            {error && (
              <div className="rounded border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs text-red-400">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="rounded bg-[#6366f1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </span>
                ) : (
                  'Submit Ticket'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded px-4 py-2 text-sm text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e1e2e] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
