'use client'

import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getAnalytics, Analytics } from '@/lib/api'
import Navbar from '@/components/Navbar'

// ── Design tokens ────────────────────────────────────────────────────────────
const URGENCY_COLORS: Record<number, string> = {
  1: '#22c55e',
  2: '#3b82f6',
  3: '#eab308',
  4: '#f97316',
  5: '#ef4444',
}

const ISSUE_TYPE_COLORS: Record<string, string> = {
  payment_failure: '#6366f1',
  p2p_dispute:     '#818cf8',
  kyc_query:       '#4f46e5',
  fraud_flag:      '#a5b4fc',
  withdrawal_issue:'#7c3aed',
  general_enquiry: '#4338ca',
}

const PROC_STATUS_COLORS: Record<string, string> = {
  pending:    '#64748b',
  processing: '#6366f1',
  completed:  '#22c55e',
  failed:     '#ef4444',
}

const TICKET_STATUS_COLORS: Record<string, string> = {
  open:        '#3b82f6',
  in_progress: '#eab308',
  resolved:    '#22c55e',
}

const ISSUE_LABEL: Record<string, string> = {
  payment_failure:  'Payment Failure',
  p2p_dispute:      'P2P Dispute',
  kyc_query:        'KYC Query',
  fraud_flag:       'Fraud Flag',
  withdrawal_issue: 'Withdrawal',
  general_enquiry:  'General',
}

// ── Recharts shared theme ────────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  contentStyle: { background: '#13131a', border: '1px solid #1e1e2e', borderRadius: '6px', fontSize: 12 },
  itemStyle:    { color: '#e2e8f0' },
  labelStyle:   { color: '#64748b' },
  cursor:       { fill: '#1e1e2e' },
}

const AXIS_PROPS = {
  tick:     { fill: '#64748b', fontSize: 11 },
  axisLine: { stroke: '#1e1e2e' },
  tickLine: { stroke: '#1e1e2e' },
}

// ── Sub-components ───────────────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#1e1e2e] bg-[#13131a] p-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#64748b] mb-4">
        {title}
      </p>
      {children}
    </div>
  )
}

function SummaryCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string | number
  sub?: string
  accent?: string
}) {
  return (
    <div className="rounded-lg border border-[#1e1e2e] bg-[#13131a] p-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#64748b] mb-3">
        {label}
      </p>
      <p
        className="text-3xl font-bold tabular-nums"
        style={{ color: accent ?? '#e2e8f0' }}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-[#64748b] mt-1">{sub}</p>}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[#1e1e2e] bg-[#13131a] p-5 space-y-3">
      <div className="h-3 w-24 rounded bg-[#1e1e2e] animate-pulse" />
      <div className="h-8 w-16 rounded bg-[#1e1e2e] animate-pulse" />
    </div>
  )
}

function SkeletonChart() {
  return (
    <div className="rounded-lg border border-[#1e1e2e] bg-[#13131a] p-5">
      <div className="h-3 w-32 rounded bg-[#1e1e2e] animate-pulse mb-4" />
      <div className="h-[200px] sm:h-64 rounded bg-[#0a0a0f] animate-pulse" />
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="flex h-[200px] sm:h-64 items-center justify-center rounded bg-[#0a0a0f]">
      <p className="text-xs text-[#64748b]">No data yet</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
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
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-base font-semibold text-[#e2e8f0]">Analytics</h1>
          <p className="text-xs text-[#64748b] mt-0.5">Aggregated from all ticket data · refreshes every 30 s</p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 mb-6">
            {error}
          </div>
        )}

        {noTickets && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-[#1e1e2e] bg-[#13131a] py-20">
            <p className="text-[#64748b] text-sm">No data yet.</p>
            <p className="text-xs text-[#64748b] mt-1">Submit your first ticket to see analytics.</p>
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
                  <SummaryCard
                    label="Total Tickets"
                    value={data!.total_tickets}
                  />
                  <SummaryCard
                    label="Avg Urgency"
                    value={data!.avg_urgency_score !== null ? data!.avg_urgency_score.toFixed(1) : 'N/A'}
                    sub="out of 5"
                  />
                  <SummaryCard
                    label="Completion Rate"
                    value={`${data!.completion_rate}%`}
                    sub="AI processed"
                    accent="#22c55e"
                  />
                  <SummaryCard
                    label="Failed"
                    value={data!.failed_count}
                    sub="AI pipeline errors"
                    accent={data!.failed_count > 0 ? '#ef4444' : undefined}
                  />
                </>
              )}
            </div>

            {/* Charts grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">
              {/* Tickets by issue type — horizontal bar */}
              {loading ? (
                <SkeletonChart />
              ) : (
                <Card title="Tickets by Issue Type">
                  {data!.by_issue_type.length === 0 ? (
                    <EmptyChart />
                  ) : (
                    <div className="h-[200px] sm:h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={data!.by_issue_type}
                        margin={{ left: 8, right: 16, top: 4, bottom: 4 }}
                      >
                        <CartesianGrid horizontal={false} stroke="#1e1e2e" />
                        <XAxis type="number" {...AXIS_PROPS} allowDecimals={false} />
                        <YAxis
                          type="category"
                          dataKey="issue_type"
                          width={102}
                          tickFormatter={(v) => ISSUE_LABEL[v] ?? v}
                          {...AXIS_PROPS}
                        />
                        <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [v, 'Tickets']} />
                        <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                          {data!.by_issue_type.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={ISSUE_TYPE_COLORS[entry.issue_type] ?? '#6366f1'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}

              {/* Tickets by urgency score */}
              {loading ? (
                <SkeletonChart />
              ) : (
                <Card title="Tickets by Urgency Score">
                  {data!.by_urgency.length === 0 ? (
                    <EmptyChart />
                  ) : (
                    <div className="h-[200px] sm:h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data!.by_urgency}
                        margin={{ left: -8, right: 16, top: 4, bottom: 4 }}
                      >
                        <CartesianGrid vertical={false} stroke="#1e1e2e" />
                        <XAxis dataKey="urgency_score" {...AXIS_PROPS} />
                        <YAxis {...AXIS_PROPS} allowDecimals={false} />
                        <Tooltip
                          {...TOOLTIP_STYLE}
                          formatter={(v) => [v, 'Tickets']}
                          labelFormatter={(l) => `Urgency ${l}`}
                        />
                        <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                          {data!.by_urgency.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={URGENCY_COLORS[entry.urgency_score] ?? '#64748b'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}

              {/* Processing status pie */}
              {loading ? (
                <SkeletonChart />
              ) : (
                <Card title="Processing Status Breakdown">
                  {data!.by_processing_status.length === 0 ? (
                    <EmptyChart />
                  ) : (
                    <div className="h-[200px] sm:h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data!.by_processing_status}
                          dataKey="count"
                          nameKey="processing_status"
                          cx="50%"
                          cy="45%"
                          outerRadius={90}
                          innerRadius={48}
                        >
                          {data!.by_processing_status.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={PROC_STATUS_COLORS[entry.processing_status] ?? '#64748b'}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          {...TOOLTIP_STYLE}
                          formatter={(v, name) => [v, name]}
                        />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          formatter={(value) => (
                            <span style={{ color: '#94a3b8', fontSize: 11 }}>{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}

              {/* Ticket status pie */}
              {loading ? (
                <SkeletonChart />
              ) : (
                <Card title="Ticket Status Breakdown">
                  {data!.by_status.length === 0 ? (
                    <EmptyChart />
                  ) : (
                    <div className="h-[200px] sm:h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data!.by_status}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="45%"
                          outerRadius={90}
                          innerRadius={48}
                        >
                          {data!.by_status.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={TICKET_STATUS_COLORS[entry.status] ?? '#64748b'}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          {...TOOLTIP_STYLE}
                          formatter={(v, name) => [v, name]}
                        />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          formatter={(value) => (
                            <span style={{ color: '#94a3b8', fontSize: 11 }}>
                              {value.replace('_', ' ')}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    </div>
                  )}
                </Card>
              )}
            </div>

            {/* Volume over time — full width */}
            {loading ? (
              <SkeletonChart />
            ) : (
              <Card title="Ticket Volume — Last 30 Days">
                {data!.volume_over_time.length === 0 ? (
                  <EmptyChart />
                ) : (
                  <div className="h-[200px] sm:h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data!.volume_over_time}
                      margin={{ left: -8, right: 16, top: 4, bottom: 4 }}
                    >
                      <CartesianGrid stroke="#1e1e2e" />
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
                      <Tooltip
                        {...TOOLTIP_STYLE}
                        formatter={(v) => [v, 'Tickets']}
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
                        activeDot={{ fill: '#818cf8', r: 5, strokeWidth: 0 }}
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
