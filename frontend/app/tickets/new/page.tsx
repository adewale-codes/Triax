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
    <div className="min-h-screen" style={{ backgroundColor: '#0c0c0c' }}>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/queue" className="text-sm transition-colors" style={{ color: '#888888' }}>
            Queue
          </Link>
          <span style={{ color: '#333333' }}>/</span>
          <span className="text-sm" style={{ color: '#e8e8e8' }}>New Ticket</span>
        </div>

        <div className="mb-6">
          <h1 className="text-base font-semibold" style={{ color: '#e8e8e8' }}>Submit a ticket</h1>
          <p className="text-xs mt-1" style={{ color: '#888888' }}>
            Tickets are automatically triaged by the AI pipeline after submission.
          </p>
        </div>

        <div className="rounded p-6" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#e8e8e8' }}>
                  Title <span className="ml-0.5" style={{ color: '#c0392b' }}>*</span>
                </label>
                <span className="text-xs tabular-nums" style={{ color: titleOverLimit ? '#c0392b' : '#555555' }}>
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
                className="w-full min-h-[44px] rounded px-3 py-2.5 text-sm outline-none transition-all"
                style={{
                  backgroundColor: '#0c0c0c',
                  border: `1px solid ${titleError ? 'rgba(192,57,43,0.5)' : '#333333'}`,
                  color: '#e8e8e8',
                }}
                autoFocus
              />
              {titleError && (
                <p className="mt-1.5 text-xs" style={{ color: '#c0392b' }}>{titleError}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#e8e8e8' }}>
                Description{' '}
                <span className="font-normal normal-case" style={{ color: '#555555' }}>optional</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Additional context, transaction IDs, or steps to reproduce..."
                rows={6}
                className="w-full rounded px-3 py-2.5 text-sm outline-none transition-all resize-none"
                style={{ backgroundColor: '#0c0c0c', border: '1px solid #333333', color: '#e8e8e8' }}
              />
            </div>

            {error && (
              <div className="rounded px-3 py-2.5 text-xs" style={{ border: '1px solid rgba(192,57,43,0.25)', backgroundColor: 'rgba(192,57,43,0.06)', color: '#c0392b' }}>
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-[44px] items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#d4a853', color: '#0c0c0c' }}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting
                  </span>
                ) : (
                  'Submit Ticket'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex min-h-[44px] items-center justify-center rounded px-4 py-2 text-sm transition-colors w-full sm:w-auto"
                style={{ color: '#888888' }}
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
