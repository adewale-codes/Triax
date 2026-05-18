export default function ExplanationPanel({ explanation }: { explanation: string }) {
  return (
    <div className="relative rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[#6366f1]" />
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-2.5">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 text-[#6366f1] flex-shrink-0"
          >
            <path
              d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4 8 1z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6366f1]">
            AI Reasoning
          </span>
        </div>
        <p className="text-sm text-[#94a3b8] leading-relaxed">{explanation}</p>
      </div>
    </div>
  )
}
