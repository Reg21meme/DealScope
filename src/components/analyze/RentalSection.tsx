import type { RentalInputs, DealStrategy } from '@/types/deal'
import type { FieldErrors } from '@/lib/validators/deal'
import InputField from '@/components/shared/InputField'
import SectionCard from '@/components/shared/SectionCard'

interface Props {
  values: RentalInputs
  errors: FieldErrors<RentalInputs>
  onChange: (values: RentalInputs) => void
  strategy: DealStrategy
}

export default function RentalSection({ values, errors, onChange, strategy }: Props) {
  const set = <K extends keyof RentalInputs>(key: K, val: RentalInputs[K]) =>
    onChange({ ...values, [key]: val })

  const isHouseHack = strategy === 'house-hack'

  return (
    <SectionCard
      title="Rental Income"
      description={isHouseHack ? 'Tenant rents plus your unit rent savings' : 'Expected gross rental income'}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Monthly Rent"
          id="monthlyRent"
          value={values.monthlyRent}
          onChange={(raw) => set('monthlyRent', parseFloat(raw) || 0)}
          error={errors.monthlyRent}
          prefix="$"
          min={0}
          step={50}
          hint={isHouseHack ? 'Gross rent from tenant units only' : 'Gross monthly rent'}
        />
        <InputField
          label="Vacancy Rate"
          id="vacancyRatePercent"
          value={+(values.vacancyRatePercent * 100).toFixed(1)}
          onChange={(raw) => set('vacancyRatePercent', (parseFloat(raw) || 0) / 100)}
          error={errors.vacancyRatePercent}
          suffix="%"
          min={0}
          max={100}
          step={0.5}
          hint="Typical range: 5–10%"
        />
        {isHouseHack && (
          <InputField
            label="Your Unit Market Rent"
            id="ownerUnitRent"
            value={values.ownerUnitRent}
            onChange={(raw) => set('ownerUnitRent', parseFloat(raw) || 0)}
            error={errors.ownerUnitRent}
            prefix="$"
            min={0}
            step={50}
            hint="What you'd otherwise pay to rent elsewhere"
          />
        )}
      </div>
    </SectionCard>
  )
}
