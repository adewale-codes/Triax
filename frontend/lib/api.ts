const API_BASE = ''

export interface Ticket {
  id: string
  title: string
  description: string | null
  status: 'open' | 'in_progress' | 'resolved'
  issue_type: string | null
  urgency_score: number | null
  suggested_reply: string | null
  explanation: string | null
  relevant_docs: any[] | null
  processing_status: string
  created_at: string
  updated_at: string
}

export interface TicketCreate {
  title: string
  description?: string
}

export async function getTickets(): Promise<{ tickets: Ticket[]; total: number }> {
  const res = await fetch(`${API_BASE}/api/v1/tickets`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch tickets')
  return res.json()
}

export async function getTicket(id: string): Promise<Ticket> {
  const res = await fetch(`${API_BASE}/api/v1/tickets/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch ticket')
  return res.json()
}

export interface Analytics {
  total_tickets: number
  avg_urgency_score: number | null
  completion_rate: number
  failed_count: number
  by_issue_type: { issue_type: string; count: number }[]
  by_urgency: { urgency_score: number; count: number }[]
  by_processing_status: { processing_status: string; count: number }[]
  by_status: { status: string; count: number }[]
  volume_over_time: { date: string; count: number }[]
}

export async function getAnalytics(): Promise<Analytics> {
  const res = await fetch(`${API_BASE}/api/v1/analytics`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch analytics')
  return res.json()
}

export async function createTicket(data: TicketCreate): Promise<Ticket> {
  const res = await fetch(`${API_BASE}/api/v1/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to create ticket')
  return res.json()
}
