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

function IconTag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 3h-2a2 2 0 0 0 -2 2v2a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l5 -5a2 2 0 0 0 0 -2.828l-8 -8a2 2 0 0 0 -1.414 -.586z" />
      <path d="M6 6h.01" />
    </svg>
  )
}

function IconAlertTriangle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v4" />
      <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.871l-8.106 -13.534a1.914 1.914 0 0 0 -3.274 0z" />
      <path d="M12 16h.01" />
    </svg>
  )
}

function IconVectorSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 10m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M12.5 12.5l5.5 5.5" />
    </svg>
  )
}

function IconMessageReply(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a1 1 0 0 1 1 1v9a1 1 0 0 1 -1 1h-2v3.5l-3.5 -3.5h-5.5a1 1 0 0 1 -1 -1v-9a1 1 0 0 1 1 -1z" />
    </svg>
  )
}

function IconBrain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
      <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
      <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
      <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
      <path d="M15.5 9.5a3.5 3.5 0 0 0 -3.5 -3.5a3.5 3.5 0 0 0 -3.5 3.5" />
      <path d="M12 6v10" />
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
  },
  {
    icon: IconAlertTriangle,
    title: 'Urgency Scoring',
    description:
      'Scores every ticket 1-5 based on language, financial risk signals, and time sensitivity.',
  },
  {
    icon: IconVectorSearch,
    title: 'RAG-powered Context',
    description:
      'Retrieves the most relevant policy documents for each ticket using vector similarity search.',
  },
  {
    icon: IconMessageReply,
    title: 'Suggested Replies',
    description:
      'Generates a professional, empathetic first response the agent can edit and send.',
  },
  {
    icon: IconBrain,
    title: 'AI Reasoning',
    description:
      'Explains every classification and urgency decision in plain English so agents trust the output.',
  },
  {
    icon: IconChartBar,
    title: 'Analytics Dashboard',
    description:
      'Tracks ticket volume, issue distribution, urgency trends, and resolution patterns over time.',
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

export default function LandingPage() {
  const [stepsRef, stepsInView] = useInView<HTMLDivElement>()
  const [techRef, techInView] = useInView<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6366f1] fade-up" style={{ animationDelay: '0ms' }}>
          <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
            <path d="M3 8h10M8 3v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1
          className="text-[36px] leading-tight font-bold tracking-tight text-[#e2e8f0] sm:text-[56px] fade-up"
          style={{ animationDelay: '0ms' }}
        >
          AI-powered fintech support triage
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

        <div ref={stepsRef} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`step-item rounded-lg border border-[#1e1e2e] bg-[#13131a] p-6 ${stepsInView ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#6366f1]">
                    {step.number}
                  </span>
                  <Icon className="h-6 w-6 text-[#6366f1]" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#e2e8f0]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#94a3b8]">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold text-[#e2e8f0] sm:text-3xl">Features</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#94a3b8]">
          Everything a support team needs to triage fintech tickets quickly and consistently.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="feature-card rounded-lg border border-[#1e1e2e] border-l-4 border-l-[#6366f1] bg-[#13131a] p-6"
              >
                <Icon className="h-6 w-6 text-[#6366f1]" />
                <h3 className="mt-4 text-base font-semibold text-[#e2e8f0]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#94a3b8]">{feature.description}</p>
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
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
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
        }
      `}</style>
    </div>
  )
}
