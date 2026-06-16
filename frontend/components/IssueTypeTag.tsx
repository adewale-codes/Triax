const ISSUE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  payment_failure: {
    label: 'Payment Failure',
    color: '#d4a853',
    bg: 'rgba(212,168,83,0.10)',
    border: 'rgba(212,168,83,0.20)',
    icon: '↯',
  },
  p2p_dispute: {
    label: 'P2P Dispute',
    color: '#4a7fa5',
    bg: 'rgba(74,127,165,0.10)',
    border: 'rgba(74,127,165,0.20)',
    icon: '⇌',
  },
  kyc_query: {
    label: 'KYC Query',
    color: '#888888',
    bg: 'rgba(136,136,136,0.10)',
    border: 'rgba(136,136,136,0.20)',
    icon: '◈',
  },
  fraud_flag: {
    label: 'Fraud Flag',
    color: '#c0392b',
    bg: 'rgba(192,57,43,0.10)',
    border: 'rgba(192,57,43,0.20)',
    icon: '⚑',
  },
  withdrawal_issue: {
    label: 'Withdrawal',
    color: '#4a9e6b',
    bg: 'rgba(74,158,107,0.10)',
    border: 'rgba(74,158,107,0.20)',
    icon: '⇣',
  },
  general_enquiry: {
    label: 'General',
    color: '#888888',
    bg: 'rgba(136,136,136,0.08)',
    border: 'rgba(136,136,136,0.20)',
    icon: '◎',
  },
}

const FALLBACK = {
  color: '#888888',
  bg: 'rgba(136,136,136,0.08)',
  border: 'rgba(136,136,136,0.20)',
  icon: '·',
}

export default function IssueTypeTag({ issueType }: { issueType: string | null }) {
  if (!issueType) return <span style={{ color: '#888888' }} className="text-sm">—</span>

  const cfg = ISSUE_CONFIG[issueType] ?? { label: issueType, ...FALLBACK }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <span className="text-[10px] leading-none">{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}
