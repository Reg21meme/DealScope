import type { ExpenseInputs } from '@/types/deal'
import type { FieldErrors } from '@/lib/validators/deal'
import InputField from '@/components/shared/InputField'
import SectionCard from '@/components/shared/SectionCard'

interface Props {
  values: ExpenseInputs
  errors: FieldErrors<ExpenseInputs>
  onChange: (values: ExpenseInputs) => void
}

export default function ExpenseSection({ values, errors, onChange }: Props) {
  const set = <K extends keyof ExpenseInputs>(key: K, val: ExpenseInputs[K]) =>
    onChange({ ...values, [key]: val })

  return (
    <SectionCard
      title="Operating Expenses"
      description="Monthly costs — mortgage payment is excluded here"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Property Tax"
          id="propertyTaxMonthly"
          value={values.propertyTaxMonthly}
          onChange={(raw) => set('propertyTaxMonthly', parseFloat(raw) || 0)}
          error={errors.propertyTaxMonthly}
          prefix="$"
          min={0}
          step={10}
          hint="Monthly amount"
        />
        <InputField
          label="Insurance"
          id="insuranceMonthly"
          value={values.insuranceMonthly}
          onChange={(raw) => set('insuranceMonthly', parseFloat(raw) || 0)}
          error={errors.insuranceMonthly}
          prefix="$"
          min={0}
          step={10}
          hint="Monthly amount"
        />
        <InputField
          label="Maintenance"
          id="maintenancePercent"
          value={+(values.maintenancePercent * 100).toFixed(1)}
          onChange={(raw) => set('maintenancePercent', (parseFloat(raw) || 0) / 100)}
          error={errors.maintenancePercent}
          suffix="%"
          min={0}
          max={50}
          step={0.5}
          hint="% of gross rent — typical: 5–10%"
        />
        <InputField
          label="Property Management"
          id="managementPercent"
          value={+(values.managementPercent * 100).toFixed(1)}
          onChange={(raw) => set('managementPercent', (parseFloat(raw) || 0) / 100)}
          error={errors.managementPercent}
          suffix="%"
          min={0}
          max={50}
          step={0.5}
          hint="% of gross rent — 0% if self-managing"
        />
        <InputField
          label="Utilities"
          id="utilitiesMonthly"
          value={values.utilitiesMonthly}
          onChange={(raw) => set('utilitiesMonthly', parseFloat(raw) || 0)}
          error={errors.utilitiesMonthly}
          prefix="$"
          min={0}
          step={10}
          hint="Monthly amount"
        />
        <InputField
          label="HOA"
          id="hoaMonthly"
          value={values.hoaMonthly}
          onChange={(raw) => set('hoaMonthly', parseFloat(raw) || 0)}
          error={errors.hoaMonthly}
          prefix="$"
          min={0}
          step={10}
          hint="Monthly amount"
        />
        <InputField
          label="Other"
          id="otherMonthly"
          value={values.otherMonthly}
          onChange={(raw) => set('otherMonthly', parseFloat(raw) || 0)}
          error={errors.otherMonthly}
          prefix="$"
          min={0}
          step={10}
          hint="Any other monthly expense"
        />
      </div>
    </SectionCard>
  )
}
