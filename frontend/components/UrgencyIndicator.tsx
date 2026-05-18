const URGENCY_CONFIG: Record<number, { color: string; label: string }> = {
  5: { color: '#ef4444', label: 'Critical' },
  4: { color: '#f97316', label: 'High' },
  3: { color: '#eab308', label: 'Medium' },
  2: { color: '#3b82f6', label: 'Low' },
  1: { color: '#22c55e', label: 'Minimal' },
}

export default function UrgencyIndicator({ score }: { score: number | null }) {
  if (score === null) {
    return <span className="text-[#64748b] text-sm">—</span>
  }

  const { color, label } = URGENCY_CONFIG[score] ?? { color: '#64748b', label: 'Unknown' }

  return (
    <div className="flex items-center gap-1.5">
      <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-sm font-semibold tabular-nums" style={{ color }}>
        {score}
      </span>
      <span className="text-xs text-[#64748b]">{label}</span>
    </div>
  )
}
