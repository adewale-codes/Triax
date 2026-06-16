'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getTickets, getAnalytics } from '@/lib/api'

const GITHUB_URL = 'https://github.com/adewale-codes/triax'

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView] as const
}

// ── Icons ─────────────────────────────────────────────────────────────────
function IconTag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 3h-2a2 2 0 0 0 -2 2v2a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l5 -5a2 2 0 0 0 0 -2.828l-8 -8a2 2 0 0 0 -1.414 -.586z" />
      <path d="M6 6h.01" />
    </svg>
  )
}

function IconGauge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14m1.41 -1.41l2.59 -2.59" />
      <path d="M11 4.055a9 9 0 1 0 9.876 11.945" />
      <path d="M16 19c.5 -1.5 1 -2.5 1 -4a5 5 0 1 0 -10 0c0 1.5 .5 2.5 1 4" />
      <path d="M12 4v2" />
      <path d="M4.5 9l1.5 .8" />
      <path d="M19.5 9l-1.5 .8" />
    </svg>
  )
}

function IconStack(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
      <path d="M4 12l8 4l8 -4" />
      <path d="M4 16l8 4l8 -4" />
    </svg>
  )
}

function IconSend(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14l11 -11" />
      <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
    </svg>
  )
}

function IconBulb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17l4.6 0" />
    </svg>
  )
}

function IconChartBar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M13 9a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M3 19h18" />
    </svg>
  )
}

function IconInbox(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4m0 4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1l-2.515 5.272a1 1 0 0 0 -.085 .608c.183 1.06 .6 2.394 -.4 3.12a1 1 0 0 1 -.633 .218h-7.733a1 1 0 0 1 -.633 -.218c-1 -.726 -.583 -2.06 -.4 -3.12a1 1 0 0 0 -.085 -.608z" />
      <path d="M3 4l1 1m17 -1l-1 1" />
    </svg>
  )
}

function IconCpu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M9 9h6v6h-6z" />
      <path d="M3 10h2" /><path d="M3 14h2" />
      <path d="M10 3v2" /><path d="M14 3v2" />
      <path d="M21 10h-2" /><path d="M21 14h-2" />
      <path d="M14 21v-2" /><path d="M10 21v-2" />
    </svg>
  )
}

function IconUserCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
      <path d="M15 19l2 2l4 -4" />
    </svg>
  )
}

// ── Content ───────────────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    icon: IconInbox,
    title: 'Ticket submitted',
    description: 'A support ticket arrives via the web interface or API.',
  },
  {
    number: '02',
    icon: IconCpu,
    title: 'AI pipeline runs',
    description:
      'The system classifies the issue, scores urgency, retrieves relevant policy documents, and drafts a reply.',
  },
  {
    number: '03',
    icon: IconUserCheck,
    title: 'Agent reviews output',
    description:
      'The support agent reviews the AI output, edits the suggested reply, and resolves the ticket.',
  },
]

const features = [
  {
    icon: IconTag,
    title: 'Issue Classification',
    description:
      'Automatically categorises tickets into payment failures, P2P disputes, KYC queries, fraud flags, withdrawal issues, and general enquiries.',
    variant: 'top-border' as const,
    span: 'lg:col-span-3',
  },
  {
    icon: IconGauge,
    title: 'Urgency Scoring',
    description:
      'Scores every ticket 1-5 based on language, financial risk signals, and time sensitivity so critical cases surface first.',
    variant: 'corner-accent' as const,
    span: 'lg:col-span-3',
  },
  {
    icon: IconStack,
    title: 'RAG-powered Context',
    description:
      'Retrieves the most relevant policy documents for each ticket using vector similarity search.',
    variant: 'plain' as const,
    span: 'lg:col-span-2',
  },
  {
    icon: IconSend,
    title: 'Suggested Replies',
    description:
      'Generates a professional, empathetic first response the agent can edit and send.',
    variant: 'top-border' as const,
    span: 'lg:col-span-2',
  },
  {
    icon: IconBulb,
    title: 'AI Reasoning',
    description:
      'Explains every classification and urgency decision in plain English so agents understand and trust the output.',
    variant: 'corner-accent' as const,
    span: 'lg:col-span-2',
  },
  {
    icon: IconChartBar,
    title: 'Analytics Dashboard',
    description:
      'Tracks ticket volume, issue distribution, urgency trends, and resolution patterns over time.',
    variant: 'plain' as const,
    span: 'sm:col-span-2 lg:col-span-6',
  },
]

const techStack = [
  'Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'pgvector',
  'Redis', 'Celery', 'OpenAI', 'Docker', 'GitHub Actions',
]

// ── System flow diagram data ─────────────────────────────────────────────
const diagramBoxes = [
  { title: 'Ticket Submitted', tech: 'Web or API', x: 40, y: 60 },
  { title: 'FastAPI', tech: 'REST endpoint', x: 215, y: 60 },
  { title: 'Celery Queue', tech: 'Redis broker', x: 390, y: 60 },
  { title: 'AI Pipeline', tech: 'worker.py', x: 565, y: 60 },
  { title: 'GPT-4o-mini', tech: 'OpenAI API', x: 740, y: 60 },
  { title: 'Agent Interface', tech: 'Next.js UI', x: 40, y: 200 },
  { title: 'PostgreSQL', tech: 'tickets table', x: 215, y: 200 },
  { title: 'Results Written', tech: 'DB commit', x: 390, y: 200 },
  { title: 'pgvector RAG', tech: 'similarity search', x: 565, y: 200 },
]

const diagramArrows = [
  { d: 'M190,60 L215,60', length: 25, delay: 0 },
  { d: 'M365,60 L390,60', length: 25, delay: 100 },
  { d: 'M540,60 L565,60', length: 25, delay: 200 },
  { d: 'M715,60 L740,60', length: 25, delay: 300 },
  { d: 'M815,92 L815,124 L420,124 L420,168', length: 471, delay: 400 },
  { d: 'M565,200 L540,200', length: 25, delay: 500 },
  { d: 'M390,200 L365,200', length: 25, delay: 600 },
  { d: 'M215,200 L190,200', length: 25, delay: 700 },
  { d: 'M510,92 L510,148 L640,148 L640,168', length: 206, delay: 800 },
]

// ── Mini dashboard stat card ─────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80px] p-4" style={{ backgroundColor: '#141414' }}>
      <div className="font-mono text-3xl font-bold tabular-nums" style={{ color: '#e8e8e8', letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div className="mt-1 text-xs text-center uppercase tracking-widest" style={{ color: '#555555' }}>
        {label}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [stepsRef, stepsInView] = useInView<HTMLDivElement>()
  const [techRef, techInView] = useInView<HTMLDivElement>()
  const [diagramRef, diagramInView] = useInView<HTMLDivElement>(0.1)

  const [stats, setStats] = useState<{
    total: string
    completed: string
    avgUrgency: string
    failed: string
  } | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [ticketsData, analyticsData] = await Promise.all([
          getTickets(),
          getAnalytics(),
        ])
        const completedEntry = analyticsData.by_processing_status.find(
          (e) => e.processing_status === 'completed'
        )
        setStats({
          total: String(ticketsData.total),
          completed: String(completedEntry?.count ?? 0),
          avgUrgency:
            analyticsData.avg_urgency_score !== null
              ? analyticsData.avg_urgency_score.toFixed(1)
              : '—',
          failed: String(analyticsData.failed_count),
        })
      } catch {
        setStats({ total: '—', completed: '—', avgUrgency: '—', failed: '—' })
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0c0c0c' }}>
      {/* Hero */}
      <section className="relative isolate overflow-hidden mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <svg
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.03]"
          aria-hidden="true"
        >
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <div
          className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-lg fade-up"
          style={{ backgroundColor: '#d4a853', animationDelay: '0ms' }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
            <path d="M3 8h10M8 3v10" stroke="#0c0c0c" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1
          className="text-3xl leading-tight tracking-tight md:text-5xl fade-up"
          style={{ color: '#e8e8e8', animationDelay: '0ms' }}
        >
          <span className="font-bold">Fintech support triage,</span>{' '}
          <span className="font-light">automated</span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg fade-up"
          style={{ color: '#888888', animationDelay: '150ms' }}
        >
          Triax classifies incoming support tickets, scores urgency, retrieves relevant policy
          documents, and drafts a suggested reply. Your support team sees the analysis, edits the
          response, and resolves the ticket.
        </p>

        <div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row fade-up"
          style={{ animationDelay: '300ms' }}
        >
          <Link
            href="/queue"
            className="cta-pulse flex h-12 w-full items-center justify-center rounded-lg px-8 text-sm font-semibold transition-colors sm:w-auto"
            style={{ backgroundColor: '#d4a853', color: '#0c0c0c' }}
          >
            Open App
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center rounded-lg px-8 text-sm font-semibold transition-colors sm:w-auto"
            style={{ border: '1px solid #262626', color: '#e8e8e8' }}
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Live stats mini dashboard */}
      <section className="mx-auto max-w-5xl px-6 pb-16 sm:pb-24">
        <div className="mb-4 text-xs uppercase tracking-widest" style={{ color: '#555555' }}>
          Live from the system
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded overflow-hidden gap-px"
          style={{ backgroundColor: '#262626', border: '1px solid #262626' }}
        >
          <StatCard value={stats?.total ?? '...'} label="Tickets" />
          <StatCard value={stats?.completed ?? '...'} label="Completed" />
          <StatCard value={stats?.avgUrgency ?? '...'} label="Avg Urgency" />
          <StatCard value={stats?.failed ?? '...'} label="Failed" />
        </div>
        <div className="mt-4 text-right">
          <Link
            href="/analytics"
            className="text-xs transition-colors"
            style={{ color: '#888888' }}
          >
            View analytics
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: '#e8e8e8' }}>
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm" style={{ color: '#888888' }}>
          Every ticket follows the same automated pipeline from submission to resolution.
        </p>

        <div ref={stepsRef} className="relative mt-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className={`step-item relative flex flex-col flex-1 ${stepsInView ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div
                    className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold mb-4"
                    style={{ border: '1px solid #d4a853', backgroundColor: '#0c0c0c', color: '#d4a853' }}
                  >
                    {step.number}
                  </div>
                  <div
                    className="rounded-lg p-5"
                    style={{ border: '1px solid #262626', backgroundColor: '#141414' }}
                  >
                    <Icon className="h-5 w-5 mb-3" style={{ color: '#d4a853' } as React.CSSProperties} />
                    <h3 className="text-base font-semibold" style={{ color: '#e8e8e8' }}>{step.title}</h3>
                    <p className="mt-2 text-sm" style={{ color: '#888888' }}>{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How the AI works */}
      <section id="how-the-ai-works" className="w-full px-8 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: '#e8e8e8' }}>
          How the AI works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm" style={{ color: '#888888' }}>
          A ticket moves through a queue, an AI pipeline, and back to the agent with policy
          context retrieved along the way.
        </p>

        <div ref={diagramRef} className="mt-12">
          <div className="w-full overflow-x-auto">
            <div style={{ minWidth: '800px' }}>
              <svg
                viewBox="0 0 1100 340"
                width="100%"
                className="mx-auto block"
                style={{ display: 'block', margin: '0 auto' }}
                role="img"
                aria-label="Diagram showing a ticket flowing from submission through FastAPI, a Celery queue, the AI pipeline, GPT-4o-mini with pgvector RAG, and back to the agent via PostgreSQL"
              >
                <defs>
                  <marker id="diagram-arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 z" fill="#d4a853" />
                  </marker>
                </defs>

                {diagramArrows.map((arrow, i) => (
                  <path
                    key={i}
                    d={arrow.d}
                    stroke="#d4a853"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#diagram-arrowhead)"
                    className="diagram-arrow"
                    style={{
                      strokeDasharray: arrow.length,
                      strokeDashoffset: diagramInView ? 0 : arrow.length,
                      transitionDelay: `${arrow.delay}ms`,
                    }}
                  />
                ))}

                {diagramBoxes.map((box) => (
                  <g key={box.title}>
                    <rect
                      x={box.x}
                      y={box.y - 32}
                      width={150}
                      height={64}
                      rx={8}
                      fill="#141414"
                      stroke="#262626"
                    />
                    <text x={box.x + 75} y={box.y - 6} textAnchor="middle" fill="#e8e8e8" fontSize="13">
                      {box.title}
                    </text>
                    <text x={box.x + 75} y={box.y + 14} textAnchor="middle" fill="#555555" fontSize="11" fontFamily="monospace">
                      {box.tech}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
          <p className="mt-2 text-center text-xs md:hidden" style={{ color: '#555555' }}>
            Scroll to see full diagram
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: '#e8e8e8' }}>
          Features
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm" style={{ color: '#888888' }}>
          Everything a support team needs to triage fintech tickets quickly and consistently.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`feature-card relative overflow-hidden rounded-lg p-6 ${
                  feature.variant === 'top-border' ? 'feat-top-border' : ''
                }`}
                style={{
                  border: '1px solid #262626',
                  backgroundColor: '#141414',
                  borderTopColor: feature.variant === 'top-border' ? 'rgba(212,168,83,0.5)' : '#262626',
                  borderTopWidth: feature.variant === 'top-border' ? '2px' : '1px',
                }}
              >
                {feature.variant === 'corner-accent' && (
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rotate-45"
                    style={{ backgroundColor: 'rgba(212,168,83,0.08)' }}
                    aria-hidden="true"
                  />
                )}
                <Icon className="relative h-6 w-6" style={{ color: '#d4a853' } as React.CSSProperties} />
                <h3 className="relative mt-4 text-base font-semibold" style={{ color: '#e8e8e8' }}>{feature.title}</h3>
                <p className="relative mt-2 text-sm" style={{ color: '#888888' }}>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tech stack */}
      <section id="tech-stack" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: '#e8e8e8' }}>Tech stack</h2>
        <div ref={techRef} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {techStack.map((tech, i) => (
            <span
              key={tech}
              className={`tech-badge rounded-full px-4 py-2 text-sm font-medium ${techInView ? 'is-visible' : ''}`}
              style={{
                border: '1px solid #262626',
                backgroundColor: '#141414',
                color: '#e8e8e8',
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up {
            opacity: 0;
            animation: fadeUp 0.6s ease-out forwards;
          }

          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0.35); }
            50%       { box-shadow: 0 0 0 8px rgba(212,168,83,0); }
          }
          .cta-pulse {
            animation: pulse 2s ease-in-out infinite;
          }

          .step-item {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }
          .step-item.is-visible {
            opacity: 1;
            transform: translateX(0);
          }

          .feature-card {
            transition: background-color 0.2s ease;
          }
          .feature-card:hover {
            background-color: #1a1a1a;
          }

          .tech-badge {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }
          .tech-badge.is-visible {
            opacity: 1;
            transform: translateX(0);
          }

          .diagram-arrow {
            transition: stroke-dashoffset 0.8s ease;
          }
        }
      `}</style>
    </div>
  )
}
