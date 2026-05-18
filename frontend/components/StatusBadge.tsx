type Status = 'open' | 'in_progress' | 'resolved'

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  },
}

export default function StatusBadge({ status }: { status: Status }) {
  const { label, className } = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
