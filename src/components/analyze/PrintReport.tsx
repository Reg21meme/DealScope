import type { ReportData } from '@/lib/report'
import type { DealOutputs } from '@/types/deal'

// ─── Format helpers ───────────────────────────────────────────────────────

const fmtDollar = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

const fmtSignedDollar = (n: number) => (n >= 0 ? '+' : '') + fmtDollar(n)
const fmtPct = (n: number) => (n * 100).toFixed(2) + '%'
const fmtSignedPct = (n: number) => (n >= 0 ? '+' : '') + (n * 100).toFixed(2) + '%'
const fmtMultiplier = (n: number) => n.toFixed(2) + 'x'
const fmtNum = (n: number) => n.toLocaleString('en-US')

const propertyTypeLabel: Record<string, string> = {
  'single-family': 'Single-Family',
  duplex: 'Duplex',
  triplex: 'Triplex',
  fourplex: 'Fourplex',
  condo: 'Condo',
}

const strategyLabel: Record<string, string> = {
  'long-term-rental': 'Long-Term Rental',
  'house-hack': 'House Hack',
}

// ─── Comparison table row definitions ────────────────────────────────────

const comparisonRows: {
  label: string
  getValue: (o: DealOutputs) => number
  format: (n: number) => string
}[] = [
  { label: 'Total Cash Needed', getValue: (o) => o.totalCashNeeded, format: fmtDollar },
  { label: 'Monthly Payment', getValue: (o) => o.monthlyPayment, format: fmtDollar },
  { label: 'Monthly Cash Flow', getValue: (o) => o.monthlyCashFlow, format: fmtSignedDollar },
  { label: 'Annual Cash Flow', getValue: (o) => o.annualCashFlow, format: fmtSignedDollar },
  { label: 'Cap Rate', getValue: (o) => o.capRate, format: fmtPct },
  { label: 'Cash-on-Cash ROI', getValue: (o) => o.cashOnCashROI, format: fmtSignedPct },
  { label: 'DSCR', getValue: (o) => o.dscr, format: fmtMultiplier },
]

// ─── Sub-components ───────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-sm border-b border-slate-100 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900 tabular-nums text-right ml-4">{value}</span>
    </div>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <p className="mt-5 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
      {title}
    </p>
  )
}

// ─── PrintReport ──────────────────────────────────────────────────────────

interface Props {
  data: ReportData
}

export default function PrintReport({ data }: Props) {
  const { dealName, generatedAt, activeIndex, scenarioReports } = data
  const active = scenarioReports[activeIndex]
  const { scenario, outputs } = active

  return (
    <div className="hidden print:block p-10 font-sans text-slate-900 bg-white">
      {/* ── Header ── */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          DealScope · Real Estate Deal Analysis
        </p>
        <h1 className="text-2xl font-bold text-slate-900">{dealName}</h1>
        <p className="text-sm text-slate-500 mt-1">
          Generated {generatedAt} · Active scenario:{' '}
          <span className="font-semibold text-slate-700">{scenario.name}</span>
        </p>

        <div className="flex gap-2 mt-3 flex-wrap">
          {scenarioReports.map(({ scenario: s, isActive }) => (
            <span
              key={s.id}
              className={[
                'text-xs px-2.5 py-1 rounded-full border font-medium',
                isActive
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'text-slate-600 border-slate-300',
              ].join(' ')}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Active Scenario Detail ── */}
      <div className="break-inside-avoid mb-10">
        <h2 className="text-base font-bold text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
          Active Scenario — {scenario.name}
        </h2>

        <SectionHeading title="Property" />
        <Row
          label="Address"
          value={scenario.property.address.trim() || 'Not specified'}
        />
        <Row
          label="Property Type"
          value={propertyTypeLabel[scenario.property.propertyType] ?? scenario.property.propertyType}
        />
        <Row
          label="Strategy"
          value={strategyLabel[scenario.property.strategy] ?? scenario.property.strategy}
        />
        <Row label="Purchase Price" value={fmtDollar(scenario.property.purchasePrice)} />
        <Row label="Square Feet" value={fmtNum(scenario.property.squareFeet)} />
        <Row
          label="Bedrooms / Bathrooms"
          value={`${scenario.property.bedrooms} bd / ${scenario.property.bathrooms} ba`}
        />

        <SectionHeading title="Financing" />
        <Row
          label="Down Payment"
          value={`${fmtPct(scenario.financing.downPaymentPercent)} (${fmtDollar(
            scenario.property.purchasePrice * scenario.financing.downPaymentPercent
          )})`}
        />
        <Row label="Interest Rate" value={fmtPct(scenario.financing.interestRate)} />
        <Row label="Loan Term" value={`${scenario.financing.loanTermYears} years`} />
        <Row label="Closing Costs" value={fmtPct(scenario.financing.closingCostPercent)} />

        <SectionHeading title="Renovation" />
        <Row label="Estimated Cost" value={fmtDollar(scenario.renovation.estimatedCost)} />
        <Row
          label="Financed into Loan"
          value={scenario.renovation.financedIntoLoan ? 'Yes' : 'No'}
        />

        <SectionHeading title="Rental Income" />
        <Row label="Monthly Rent" value={fmtDollar(scenario.rental.monthlyRent)} />
        <Row label="Vacancy Rate" value={fmtPct(scenario.rental.vacancyRatePercent)} />
        {scenario.property.strategy === 'house-hack' && (
          <Row
            label="Owner Unit Rent (imputed)"
            value={fmtDollar(scenario.rental.ownerUnitRent)}
          />
        )}
        <Row label="Effective Monthly Rent" value={fmtDollar(outputs.effectiveMonthlyRent)} />

        <SectionHeading title="Operating Expenses" />
        <Row
          label="Property Tax"
          value={`${fmtDollar(scenario.expenses.propertyTaxMonthly)}/mo`}
        />
        <Row
          label="Insurance"
          value={`${fmtDollar(scenario.expenses.insuranceMonthly)}/mo`}
        />
        <Row
          label="Maintenance"
          value={`${fmtPct(scenario.expenses.maintenancePercent)} of rent`}
        />
        <Row
          label="Management"
          value={
            scenario.expenses.managementPercent === 0
              ? 'Self-managed'
              : `${fmtPct(scenario.expenses.managementPercent)} of rent`
          }
        />
        {scenario.expenses.utilitiesMonthly > 0 && (
          <Row
            label="Utilities"
            value={`${fmtDollar(scenario.expenses.utilitiesMonthly)}/mo`}
          />
        )}
        {scenario.expenses.hoaMonthly > 0 && (
          <Row label="HOA" value={`${fmtDollar(scenario.expenses.hoaMonthly)}/mo`} />
        )}
        {scenario.expenses.otherMonthly > 0 && (
          <Row label="Other" value={`${fmtDollar(scenario.expenses.otherMonthly)}/mo`} />
        )}
        <Row
          label="Total Operating Expenses"
          value={`${fmtDollar(outputs.monthlyOperatingExpenses)}/mo`}
        />

        <SectionHeading title="Key Metrics" />
        <Row label="Loan Amount" value={fmtDollar(outputs.loanAmount)} />
        <Row label="Monthly Payment" value={fmtDollar(outputs.monthlyPayment)} />
        <Row label="Total Cash Needed" value={fmtDollar(outputs.totalCashNeeded)} />
        <Row label="Monthly Cash Flow" value={fmtSignedDollar(outputs.monthlyCashFlow)} />
        <Row label="Annual Cash Flow" value={fmtSignedDollar(outputs.annualCashFlow)} />
        <Row label="Cap Rate" value={fmtPct(outputs.capRate)} />
        <Row label="Cash-on-Cash ROI" value={fmtSignedPct(outputs.cashOnCashROI)} />
        <Row label="DSCR" value={fmtMultiplier(outputs.dscr)} />
      </div>

      {/* ── Scenario Comparison Table ── */}
      <div className="break-inside-avoid">
        <h2 className="text-base font-bold text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
          Scenario Comparison
        </h2>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="text-left py-2 pr-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 w-44">
                Metric
              </th>
              {scenarioReports.map(({ scenario: s, isActive }) => (
                <th
                  key={s.id}
                  className={[
                    'text-right py-2 px-4 text-[10px] font-bold uppercase tracking-widest',
                    isActive ? 'text-slate-900' : 'text-slate-400',
                  ].join(' ')}
                >
                  {s.name}
                  {isActive && (
                    <span className="block text-[9px] normal-case tracking-normal font-normal text-slate-500 mt-0.5">
                      active
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(({ label, getValue, format }) => (
              <tr key={label} className="border-b border-slate-100">
                <td className="py-2 pr-6 text-slate-500">{label}</td>
                {scenarioReports.map(({ outputs: o, scenario: s, isActive }) => (
                  <td
                    key={s.id}
                    className={[
                      'py-2 px-4 text-right tabular-nums',
                      isActive ? 'font-semibold text-slate-900' : 'text-slate-600',
                    ].join(' ')}
                  >
                    {format(getValue(o))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <p className="mt-10 text-[10px] text-slate-400 text-center">
        DealScope · All calculations are estimates for informational purposes only.
        Consult a licensed financial or real estate professional before making investment decisions.
      </p>
    </div>
  )
}
