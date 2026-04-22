import type { DealOutputs } from '@/types/deal'

function fmtDollar(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function fmtSignedDollar(n: number): string {
  const sign = n >= 0 ? '+' : ''
  return sign + fmtDollar(n)
}

function fmtPct(n: number, signed = false): string {
  const val = (n * 100).toFixed(2) + '%'
  if (!signed) return val
  return (n >= 0 ? '+' : '') + val
}

function fmtMultiplier(n: number): string {
  return n.toFixed(2) + 'x'
}

function cashFlowColor(n: number) {
  return n >= 0 ? 'text-emerald-600' : 'text-red-600'
}

function capRateColor(n: number) {
  if (n >= 0.08) return 'text-emerald-600'
  if (n >= 0.05) return 'text-amber-600'
  return 'text-red-600'
}

function cocColor(n: number) {
  if (n >= 0.1) return 'text-emerald-600'
  if (n >= 0.05) return 'text-amber-600'
  return 'text-red-600'
}

function dscrColor(n: number) {
  if (n >= 1.25) return 'text-emerald-600'
  if (n >= 1.0) return 'text-amber-600'
  return 'text-red-600'
}

interface MetricRowProps {
  label: string
  value: string
  color?: string
  size?: 'sm' | 'base'
}

function MetricRow({ label, value, color = 'text-slate-900', size = 'sm' }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`font-semibold tabular-nums ${size === 'base' ? 'text-base' : 'text-sm'} ${color}`}>
        {value}
      </span>
    </div>
  )
}

interface OutputsPanelProps {
  outputs: DealOutputs
}

export default function OutputsPanel({ outputs }: OutputsPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-base font-semibold text-slate-900">Deal Summary</h2>
        <p className="mt-0.5 text-xs text-slate-400">Updates as you type</p>
      </div>

      <div className="px-6 divide-y divide-slate-100">
        <div className="py-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Financing
          </p>
          <MetricRow label="Loan Amount" value={fmtDollar(outputs.loanAmount)} />
          <MetricRow label="Monthly Payment" value={fmtDollar(outputs.monthlyPayment)} />
          <MetricRow
            label="Total Cash Needed"
            value={fmtDollar(outputs.totalCashNeeded)}
            size="base"
          />
        </div>

        <div className="py-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Cash Flow
          </p>
          <MetricRow
            label="Monthly Cash Flow"
            value={fmtSignedDollar(outputs.monthlyCashFlow)}
            color={cashFlowColor(outputs.monthlyCashFlow)}
          />
          <MetricRow
            label="Annual Cash Flow"
            value={fmtSignedDollar(outputs.annualCashFlow)}
            color={cashFlowColor(outputs.annualCashFlow)}
            size="base"
          />
        </div>

        <div className="py-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Returns
          </p>
          <MetricRow
            label="Cap Rate"
            value={fmtPct(outputs.capRate)}
            color={capRateColor(outputs.capRate)}
          />
          <MetricRow
            label="Cash-on-Cash ROI"
            value={fmtPct(outputs.cashOnCashROI, true)}
            color={cocColor(outputs.cashOnCashROI)}
          />
          <MetricRow
            label="DSCR"
            value={fmtMultiplier(outputs.dscr)}
            color={dscrColor(outputs.dscr)}
          />
        </div>
      </div>
    </div>
  )
}
