'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const GITHUB_URL = 'https://github.com/adewale-codes/triax'
const LINKEDIN_URL = 'https://www.linkedin.com/in/adewale-sulaiman-5ba149172/'

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
      <path d="M3 10h2" />
      <path d="M3 14h2" />
      <path d="M10 3v2" />
      <path d="M14 3v2" />
      <path d="M21 10h-2" />
      <path d="M21 14h-2" />
      <path d="M14 21v-2" />
      <path d="M10 21v-2" />
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
      'The system classifies the issue, scores urgency, retrieves relevant docs, and drafts a reply.',
  },
  {
    number: '03',
    icon: IconUserCheck,
    title: 'Agent sees results',
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
      'Scores every ticket 1-5 based on language, financial risk signals, and time sensitivity.',
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
      'Explains every classification and urgency decision in plain English so agents trust the output.',
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
  'Python',
  'FastAPI',
  'Next.js',
  'PostgreSQL',
  'pgvector',
  'Redis',
  'Celery',
  'OpenAI',
  'Docker',
  'GitHub Actions',
]

const trustBadges = ['Built with FastAPI', 'Powered by OpenAI', 'Deployed on Heroku']

// ── System flow diagram data ────────────────────────────────────────────────
// Boxes are 150x64, positioned by top-left corner (x, y is the vertical center).
// Top row centres are spaced 175px apart starting at x=40 (centre 115).
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

// Arrows for the diagram, drawn in a 1100x340 viewBox.
// Each has a stagger delay so they draw themselves left-to-right / top-to-bottom.
const diagramArrows = [
  { d: 'M190,60 L215,60', length: 25, delay: 0 }, // Ticket Submitted -> FastAPI
  { d: 'M365,60 L390,60', length: 25, delay: 100 }, // FastAPI -> Celery Queue
  { d: 'M540,60 L565,60', length: 25, delay: 200 }, // Celery Queue -> AI Pipeline
  { d: 'M715,60 L740,60', length: 25, delay: 300 }, // AI Pipeline -> GPT-4o-mini
  { d: 'M815,92 L815,124 L420,124 L420,168', length: 471, delay: 400 }, // GPT-4o-mini -> Results Written
  { d: 'M565,200 L540,200', length: 25, delay: 500 }, // pgvector RAG -> Results Written
  { d: 'M390,200 L365,200', length: 25, delay: 600 }, // Results Written -> PostgreSQL
  { d: 'M215,200 L190,200', length: 25, delay: 700 }, // PostgreSQL -> Agent Interface
  { d: 'M510,92 L510,148 L640,148 L640,168', length: 206, delay: 800 }, // Celery Queue -> pgvector RAG
]

export default function LandingPage() {
  const [stepsRef, stepsInView] = useInView<HTMLDivElement>()
  const [techRef, techInView] = useInView<HTMLDivElement>()
  const [diagramRef, diagramInView] = useInView<HTMLDivElement>(0.1)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        {/* Noise texture overlay */}
        <svg
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.04] mix-blend-overlay"
          aria-hidden="true"
        >
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6366f1] fade-up" style={{ animationDelay: '0ms' }}>
          <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
            <path d="M3 8h10M8 3v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1
          className="text-[36px] leading-tight tracking-tight text-[#e2e8f0] sm:text-[56px] fade-up"
          style={{ animationDelay: '0ms' }}
        >
          <span className="font-light">AI-powered</span>{' '}
          <span className="font-bold">fintech support triage</span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-2xl text-base text-[#94a3b8] sm:text-lg fade-up"
          style={{ animationDelay: '150ms' }}
        >
          Triax automatically classifies incoming support tickets, scores urgency, retrieves
          relevant policy documents, and generates suggested replies — so your team can focus on
          resolution, not routing.
        </p>

        <div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row fade-up"
          style={{ animationDelay: '300ms' }}
        >
          <Link
            href="/queue"
            className="cta-pulse flex h-12 w-full items-center justify-center rounded-lg bg-[#6366f1] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#4f46e5] sm:w-auto"
          >
            Open App
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center rounded-lg border border-[#1e1e2e] px-8 text-sm font-semibold text-[#e2e8f0] transition-colors hover:bg-[#13131a] sm:w-auto"
          >
            View on GitHub
          </a>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 fade-up"
          style={{ animationDelay: '450ms' }}
        >
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-[#1e1e2e] bg-[#13131a] px-4 py-1.5 text-xs font-medium text-[#94a3b8]"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold text-[#e2e8f0] sm:text-3xl">How it works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#94a3b8]">
          From submission to resolution, every ticket flows through a consistent, automated triage
          pipeline.
        </p>

        <div ref={stepsRef} className="relative mt-12">
          {/* Vertical connecting line — mobile only */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-[#1e1e2e] sm:hidden" aria-hidden="true" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className={`step-item relative flex gap-4 sm:flex-col sm:gap-0 ${stepsInView ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#6366f1] bg-[#0a0a0f] font-mono text-xs font-semibold text-[#6366f1] sm:mb-4">
                    {step.number}
                  </div>
                  <div className="flex-1 rounded-lg border border-[#1e1e2e] bg-[#13131a] p-5 sm:p-6">
                    <Icon className="h-5 w-5 text-[#6366f1] mb-3" />
                    <h3 className="text-base font-semibold text-[#e2e8f0]">{step.title}</h3>
                    <p className="mt-2 text-sm text-[#94a3b8]">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How the AI works — system flow diagram */}
      <section id="how-the-ai-works" className="mx-auto max-w-6xl px-6 py-16 sm:py-24 flex items-center">
        <h2 className="text-center text-2xl font-bold text-[#e2e8f0] sm:text-3xl">How the AI works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#94a3b8]">
          A ticket moves through a queue, an AI pipeline, and back to the agent — with policy
          context retrieved along the way.
        </p>

        <div ref={diagramRef} className="mt-12">
          <div style={{ overflowX: 'auto' }}>
            <svg
              viewBox="0 0 1100 340"
              width="100%"
              className="mx-auto block"
              style={{ minWidth: 800, display: 'block', margin: '0 auto' }}
              role="img"
              aria-label="Diagram showing a ticket flowing from submission through FastAPI, a Celery queue, the AI pipeline, GPT-4o-mini with pgvector RAG, and back to the agent via PostgreSQL"
            >
              <defs>
                <marker id="diagram-arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#6366f1" />
                </marker>
              </defs>

              {diagramArrows.map((arrow, i) => (
                <path
                  key={i}
                  d={arrow.d}
                  stroke="#6366f1"
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
                    fill="#13131a"
                    stroke="#1e1e2e"
                  />
                  <text
                    x={box.x + 75}
                    y={box.y - 6}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="13"
                  >
                    {box.title}
                  </text>
                  <text
                    x={box.x + 75}
                    y={box.y + 14}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {box.tech}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="mt-2 text-center text-xs text-[#64748b] md:hidden">
            ← Scroll to see full diagram →
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold text-[#e2e8f0] sm:text-3xl">Features</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#94a3b8]">
          Everything a support team needs to triage fintech tickets quickly and consistently.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`feature-card relative overflow-hidden rounded-lg border border-[#1e1e2e] bg-[#13131a] p-6 ${
                  feature.variant === 'top-border' ? 'border-t-2 border-t-[#6366f1]/50' : ''
                } ${feature.span}`}
              >
                {feature.variant === 'corner-accent' && (
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rotate-45 bg-[#6366f1]/10"
                    aria-hidden="true"
                  />
                )}
                <Icon className="relative h-6 w-6 text-[#6366f1]" />
                <h3 className="relative mt-4 text-base font-semibold text-[#e2e8f0]">{feature.title}</h3>
                <p className="relative mt-2 text-sm text-[#94a3b8]">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tech stack */}
      <section id="tech-stack" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold text-[#e2e8f0] sm:text-3xl">Tech stack</h2>
        <div ref={techRef} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {techStack.map((tech, i) => (
            <span
              key={tech}
              className={`tech-badge rounded-full border border-[#1e1e2e] bg-[#13131a] px-4 py-2 text-sm font-medium text-[#e2e8f0] ${techInView ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e]">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col items-center gap-4 text-sm text-[#94a3b8] sm:flex-row sm:justify-between">
          <p>
            Built by{' '}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e2e8f0] hover:text-[#6366f1] transition-colors"
            >
              Adewale Sulaiman
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e2e8f0] transition-colors"
            >
              GitHub
            </a>
            <Link href="/queue" className="hover:text-[#e2e8f0] transition-colors">
              View live demo
            </Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-up {
            opacity: 0;
            animation: fadeUp 0.6s ease-out forwards;
          }

          @keyframes pulse {
            0%,
            100% {
              box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(99, 102, 241, 0);
            }
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
            background-color: #1a1a2e;
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

          .diagram-step {
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }

          .diagram-step.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
