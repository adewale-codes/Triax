type Status = 'open' | 'in_progress' | 'resolved'

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  open: {
    label: 'Open',
    color: '#4a7fa5',
    bg: 'rgba(74,127,165,0.10)',
    border: 'rgba(74,127,165,0.25)',
  },
  in_progress: {
    label: 'In Progress',
    color: '#d4a853',
    bg: 'rgba(212,168,83,0.10)',
    border: 'rgba(212,168,83,0.25)',
  },
  resolved: {
    label: 'Resolved',
    color: '#4a9e6b',
    bg: 'rgba(74,158,107,0.10)',
    border: 'rgba(74,158,107,0.25)',
  },
}

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {cfg.label}
    </span>
  )
}
