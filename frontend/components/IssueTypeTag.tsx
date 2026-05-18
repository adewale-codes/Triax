const ISSUE_CONFIG: Record<string, { label: string; className: string; icon: string }> = {
  payment_failure: {
    label: 'Payment Failure',
    className: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    icon: '↯',
  },
  p2p_dispute: {
    label: 'P2P Dispute',
    className: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    icon: '⇌',
  },
  kyc_query: {
    label: 'KYC Query',
    className: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    icon: '◈',
  },
  fraud_flag: {
    label: 'Fraud Flag',
    className: 'bg-red-500/10 text-red-400 border border-red-500/20',
    icon: '⚑',
  },
  withdrawal_issue: {
    label: 'Withdrawal',
    className: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
    icon: '⇣',
  },
  general_enquiry: {
    label: 'General',
    className: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    icon: '◎',
  },
}

export default function IssueTypeTag({ issueType }: { issueType: string | null }) {
  if (!issueType) return <span className="text-[#64748b] text-sm">—</span>

  const config = ISSUE_CONFIG[issueType] ?? {
    label: issueType,
    className: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    icon: '·',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      <span className="text-[10px] leading-none">{config.icon}</span>
      {config.label}
    </span>
  )
}
