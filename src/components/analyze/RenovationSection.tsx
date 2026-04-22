import type { RenovationInputs } from '@/types/deal'
import type { FieldErrors } from '@/lib/validators/deal'
import InputField from '@/components/shared/InputField'
import SectionCard from '@/components/shared/SectionCard'

interface Props {
  values: RenovationInputs
  errors: FieldErrors<RenovationInputs>
  onChange: (values: RenovationInputs) => void
}

export default function RenovationSection({ values, errors, onChange }: Props) {
  return (
    <SectionCard title="Renovation" description="Optional upfront rehab estimate">
      <div className="space-y-4">
        <InputField
          label="Estimated Renovation Cost"
          id="renovationCost"
          value={values.estimatedCost}
          onChange={(raw) => onChange({ ...values, estimatedCost: parseFloat(raw) || 0 })}
          error={errors.estimatedCost}
          prefix="$"
          min={0}
          step={500}
        />
        <div className="flex items-start gap-3">
          <input
            id="financedIntoLoan"
            type="checkbox"
            checked={values.financedIntoLoan}
            onChange={(e) => onChange({ ...values, financedIntoLoan: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="financedIntoLoan" className="text-sm text-slate-700 cursor-pointer">
            Finance renovation into loan
            <span className="block text-xs text-slate-400 mt-0.5">
              If unchecked, added to total cash needed at closing
            </span>
          </label>
        </div>
      </div>
    </SectionCard>
  )
}
