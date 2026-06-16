'use client'

import { useEffect, useState } from 'react'
import {
  Bar, BarChart, CartesianGrid, Cell, Legend,
  Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { getAnalytics, Analytics } from '@/lib/api'
import Navbar from '@/components/Navbar'

// ── Design tokens ─────────────────────────────────────────────────────────────
const URGENCY_COLORS: Record<number, string> = {
  1: '#4a9e6b',
  2: '#4a7fa5',
  3: '#e0b96a',
  4: '#d4a853',
  5: '#c0392b',
}

const ISSUE_TYPE_COLORS: Record<string, string> = {
  payment_failure:  '#d4a853',
  p2p_dispute:      '#4a7fa5',
  kyc_query:        '#888888',
  fraud_flag:       '#c0392b',
  withdrawal_issue: '#4a9e6b',
  general_enquiry:  '#555555',
}

const PROC_STATUS_COLORS: Record<string, string> = {
  pending:    '#555555',
  processing: '#d4a853',
  completed:  '#4a9e6b',
  failed:     '#c0392b',
}

const TICKET_STATUS_COLORS: Record<string, string> = {
  open:        '#4a7fa5',
  in_progress: '#d4a853',
  resolved:    '#4a9e6b',
}

const ISSUE_LABEL: Record<string, string> = {
  payment_failure:  'Payment Failure',
  p2p_dispute:      'P2P Dispute',
  kyc_query:        'KYC Query',
  fraud_flag:       'Fraud Flag',
  withdrawal_issue: 'Withdrawal',
  general_enquiry:  'General',
}

// ── Recharts shared theme ─────────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  contentStyle: { background: '#141414', border: '1px solid #262626', borderRadius: '6px', fontSize: 12 },
  itemStyle:    { color: '#e8e8e8' },
  labelStyle:   { color: '#888888' },
  cursor:       { fill: 'rgba(255,255,255,0.03)' },
}

const AXIS_PROPS = {
  tick:     { fill: '#555555', fontSize: 11 },
  axisLine: { stroke: '#262626' },
  tickLine: { stroke: '#262626' },
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded p-5" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#555555' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function SummaryCard({ label, value, sub, accent }: {
  label: string; value: string | number; sub?: string; accent?: string
}) {
  return (
    <div className="rounded p-5" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#555555' }}>
        {label}
      </p>
      <p className="text-3xl font-bold tabular-nums" style={{ color: accent ?? '#e8e8e8' }}>
        {value}
      </p>
      {sub && <p className="text-xs mt-1" style={{ color: '#888888' }}>{sub}</p>}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded p-5 space-y-3" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
      <div className="h-3 w-24 rounded animate-pulse" style={{ backgroundColor: '#262626' }} />
      <div className="h-8 w-16 rounded animate-pulse" style={{ backgroundColor: '#262626' }} />
    </div>
  )
}

function SkeletonChart() {
  return (
    <div className="rounded p-5" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
      <div className="h-3 w-32 rounded animate-pulse mb-4" style={{ backgroundColor: '#262626' }} />
      <div className="h-[200px] sm:h-64 rounded animate-pulse" style={{ backgroundColor: '#0c0c0c' }} />
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="flex h-[200px] sm:h-64 items-center justify-center rounded" style={{ backgroundColor: '#0c0c0c' }}>
      <p className="text-xs" style={{ color: '#555555' }}>No data yet</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const result = await getAnalytics()
      setData(result)
    } catch {
      setError('Failed to load analytics.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30_000)
    return () => clearInterval(interval)
  }, [])

  const noTickets = !loading && data?.total_tickets === 0

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0c0c0c' }}>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-base font-semibold" style={{ color: '#e8e8e8' }}>Analytics</h1>
          <p className="text-xs mt-0.5" style={{ color: '#888888' }}>
            Aggregated from all ticket data · refreshes every 30 s
          </p>
        </div>

        {error && (
          <div className="rounded px-4 py-3 text-sm mb-6" style={{ border: '1px solid rgba(192,57,43,0.25)', backgroundColor: 'rgba(192,57,43,0.06)', color: '#c0392b' }}>
            {error}
          </div>
        )}

        {noTickets && (
          <div className="flex flex-col items-center justify-center rounded py-20" style={{ border: '1px solid #262626', backgroundColor: '#141414' }}>
            <p className="text-sm" style={{ color: '#888888' }}>No data yet.</p>
            <p className="text-xs mt-1" style={{ color: '#555555' }}>Submit your first ticket to see analytics.</p>
          </div>
        )}

        {!noTickets && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              ) : (
                <>
                  <SummaryCard label="Total Tickets" value={data!.total_tickets} />
                  <SummaryCard
                    label="Avg Urgency"
                    value={data!.avg_urgency_score !== null ? data!.avg_urgency_score.toFixed(1) : 'N/A'}
                    sub="out of 5"
                  />
                  <SummaryCard
                    label="Completion Rate"
                    value={`${data!.completion_rate}%`}
                    sub="AI processed"
                    accent="#4a9e6b"
                  />
                  <SummaryCard
                    label="Failed"
                    value={data!.failed_count}
                    sub="AI pipeline errors"
                    accent={data!.failed_count > 0 ? '#c0392b' : undefined}
                  />
                </>
              )}
            </div>

            {/* Charts grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">
              {/* Tickets by issue type */}
              {loading ? <SkeletonChart /> : (
                <Card title="Tickets by Issue Type">
                  {data!.by_issue_type.length === 0 ? <EmptyChart /> : (
                    <div className="h-[200px] sm:h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={data!.by_issue_type} margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                          <CartesianGrid horizontal={false} stroke="#262626" />
                          <XAxis type="number" {...AXIS_PROPS} allowDecimals={false} />
                          <YAxis type="category" dataKey="issue_type" width={102} tickFormatter={(v) => ISSUE_LABEL[v] ?? v} {...AXIS_PROPS} />
                          <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [v, 'Tickets']} />
                          <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                            {data!.by_issue_type.map((entry, i) => (
                              <Cell key={i} fill={ISSUE_TYPE_COLORS[entry.issue_type] ?? '#888888'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}

              {/* Tickets by urgency score */}
              {loading ? <SkeletonChart /> : (
                <Card title="Tickets by Urgency Score">
                  {data!.by_urgency.length === 0 ? <EmptyChart /> : (
                    <div className="h-[200px] sm:h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data!.by_urgency} margin={{ left: -8, right: 16, top: 4, bottom: 4 }}>
                          <CartesianGrid vertical={false} stroke="#262626" />
                          <XAxis dataKey="urgency_score" {...AXIS_PROPS} />
                          <YAxis {...AXIS_PROPS} allowDecimals={false} />
                          <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [v, 'Tickets']} labelFormatter={(l) => `Urgency ${l}`} />
                          <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                            {data!.by_urgency.map((entry, i) => (
                              <Cell key={i} fill={URGENCY_COLORS[entry.urgency_score] ?? '#888888'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}

              {/* Processing status pie */}
              {loading ? <SkeletonChart /> : (
                <Card title="Processing Status Breakdown">
                  {data!.by_processing_status.length === 0 ? <EmptyChart /> : (
                    <div className="h-[200px] sm:h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={data!.by_processing_status} dataKey="count" nameKey="processing_status" cx="50%" cy="45%" outerRadius={90} innerRadius={48}>
                            {data!.by_processing_status.map((entry, i) => (
                              <Cell key={i} fill={PROC_STATUS_COLORS[entry.processing_status] ?? '#888888'} />
                            ))}
                          </Pie>
                          <Tooltip {...TOOLTIP_STYLE} formatter={(v, name) => [v, name]} />
                          <Legend iconType="circle" iconSize={8} formatter={(value) => (
                            <span style={{ color: '#888888', fontSize: 11 }}>{value}</span>
                          )} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}

              {/* Ticket status pie */}
              {loading ? <SkeletonChart /> : (
                <Card title="Ticket Status Breakdown">
                  {data!.by_status.length === 0 ? <EmptyChart /> : (
                    <div className="h-[200px] sm:h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={data!.by_status} dataKey="count" nameKey="status" cx="50%" cy="45%" outerRadius={90} innerRadius={48}>
                            {data!.by_status.map((entry, i) => (
                              <Cell key={i} fill={TICKET_STATUS_COLORS[entry.status] ?? '#888888'} />
                            ))}
                          </Pie>
                          <Tooltip {...TOOLTIP_STYLE} formatter={(v, name) => [v, name]} />
                          <Legend iconType="circle" iconSize={8} formatter={(value) => (
                            <span style={{ color: '#888888', fontSize: 11 }}>{value.replace('_', ' ')}</span>
                          )} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}
            </div>

            {/* Volume over time — full width */}
            {loading ? <SkeletonChart /> : (
              <Card title="Ticket Volume — Last 30 Days">
                {data!.volume_over_time.length === 0 ? <EmptyChart /> : (
                  <div className="h-[200px] sm:h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data!.volume_over_time} margin={{ left: -8, right: 16, top: 4, bottom: 4 }}>
                        <CartesianGrid stroke="#262626" />
                        <XAxis
                          dataKey="date"
                          {...AXIS_PROPS}
                          tickFormatter={(d: string) => {
                            const [, m, day] = d.split('-')
                            return `${m}/${day}`
                          }}
                          interval="preserveStartEnd"
                        />
                        <YAxis {...AXIS_PROPS} allowDecimals={false} />
                        <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [v, 'Tickets']} />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#d4a853"
                          strokeWidth={2}
                          dot={{ fill: '#d4a853', r: 3, strokeWidth: 0 }}
                          activeDot={{ fill: '#e0b96a', r: 5, strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  )
}
