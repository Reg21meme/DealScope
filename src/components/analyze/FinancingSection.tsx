import type { FinancingInputs } from '@/types/deal'
import type { FieldErrors } from '@/lib/validators/deal'
import InputField from '@/components/shared/InputField'
import SectionCard from '@/components/shared/SectionCard'

interface Props {
  values: FinancingInputs
  errors: FieldErrors<FinancingInputs>
  onChange: (values: FinancingInputs) => void
}

export default function FinancingSection({ values, errors, onChange }: Props) {
  const set = <K extends keyof FinancingInputs>(key: K, val: FinancingInputs[K]) =>
    onChange({ ...values, [key]: val })

  return (
    <SectionCard title="Financing" description="Loan terms and closing cost assumptions">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Down Payment"
          id="downPaymentPercent"
          value={+(values.downPaymentPercent * 100).toFixed(2)}
          onChange={(raw) => set('downPaymentPercent', (parseFloat(raw) || 0) / 100)}
          error={errors.downPaymentPercent}
          suffix="%"
          min={0}
          max={100}
          step={0.5}
          hint="0–100% of purchase price"
        />
        <InputField
          label="Interest Rate"
          id="interestRate"
          value={+(values.interestRate * 100).toFixed(3)}
          onChange={(raw) => set('interestRate', (parseFloat(raw) || 0) / 100)}
          error={errors.interestRate}
          suffix="%"
          min={0}
          max={30}
          step={0.125}
          hint="Annual rate"
        />
        <InputField
          label="Loan Term"
          id="loanTermYears"
          value={values.loanTermYears}
          onChange={(raw) => set('loanTermYears', parseInt(raw, 10) || 30)}
          error={errors.loanTermYears}
          suffix="yrs"
          min={1}
          max={50}
          step={1}
        />
        <InputField
          label="Closing Costs"
          id="closingCostPercent"
          value={+(values.closingCostPercent * 100).toFixed(2)}
          onChange={(raw) => set('closingCostPercent', (parseFloat(raw) || 0) / 100)}
          error={errors.closingCostPercent}
          suffix="%"
          min={0}
          max={10}
          step={0.1}
          hint="% of purchase price"
        />
      </div>
    </SectionCard>
  )
}
