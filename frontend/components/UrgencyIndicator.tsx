const URGENCY_CONFIG: Record<number, { color: string; label: string }> = {
  5: { color: '#c0392b', label: 'Critical' },
  4: { color: '#d4a853', label: 'High' },
  3: { color: '#e0b96a', label: 'Medium' },
  2: { color: '#4a7fa5', label: 'Low' },
  1: { color: '#4a9e6b', label: 'Minimal' },
}

export default function UrgencyIndicator({ score }: { score: number | null }) {
  if (score === null) {
    return <span style={{ color: '#888888' }} className="text-sm">—</span>
  }

  const { color, label } = URGENCY_CONFIG[score] ?? { color: '#888888', label: 'Unknown' }

  return (
    <div className="flex items-center gap-1.5">
      <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-sm font-semibold tabular-nums" style={{ color }}>{score}</span>
      <span className="text-xs" style={{ color: '#888888' }}>{label}</span>
    </div>
  )
}
