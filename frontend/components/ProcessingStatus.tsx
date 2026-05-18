type Status = 'pending' | 'processing' | 'completed' | 'failed'

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'text-[#64748b]' },
  processing: { label: 'Processing', className: 'text-[#6366f1]' },
  completed: { label: 'Completed', className: 'text-[#22c55e]' },
  failed: { label: 'Failed', className: 'text-[#ef4444]' },
}

function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export default function ProcessingStatus({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as Status] ?? { label: status, className: 'text-[#64748b]' }

  return (
    <div className={`flex items-center gap-1.5 text-sm ${cfg.className}`}>
      {status === 'processing' ? (
        <Spinner />
      ) : status === 'completed' ? (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : status === 'failed' ? (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      <span className="text-xs font-medium">{cfg.label}</span>
    </div>
  )
}
