import type { PropertyInputs, PropertyType, DealStrategy } from '@/types/deal'
import type { FieldErrors } from '@/lib/validators/deal'
import InputField from '@/components/shared/InputField'
import SectionCard from '@/components/shared/SectionCard'

interface Props {
  values: PropertyInputs
  errors: FieldErrors<PropertyInputs>
  onChange: (values: PropertyInputs) => void
}

const propertyTypeOptions: { value: PropertyType; label: string }[] = [
  { value: 'single-family', label: 'Single Family' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'triplex', label: 'Triplex' },
  { value: 'fourplex', label: 'Fourplex' },
  { value: 'condo', label: 'Condo' },
]

const strategyOptions: { value: DealStrategy; label: string }[] = [
  { value: 'long-term-rental', label: 'Long-Term Rental' },
  { value: 'house-hack', label: 'House Hack' },
]

const selectClass =
  'block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400'

export default function PropertySection({ values, errors, onChange }: Props) {
  const set = <K extends keyof PropertyInputs>(key: K, val: PropertyInputs[K]) =>
    onChange({ ...values, [key]: val })

  return (
    <SectionCard title="Property" description="Address, price, and property details">
      <div className="space-y-4">
        <InputField
          label="Property Address"
          id="address"
          type="text"
          value={values.address}
          onChange={(raw) => set('address', raw)}
          error={errors.address}
          placeholder="123 Main St, City, ST 00000"
        />

        <InputField
          label="Purchase Price"
          id="purchasePrice"
          value={values.purchasePrice}
          onChange={(raw) => set('purchasePrice', parseFloat(raw) || 0)}
          error={errors.purchasePrice}
          prefix="$"
          min={0}
          step={1000}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700 mb-1">
              Property Type
            </label>
            <select
              id="propertyType"
              value={values.propertyType}
              onChange={(e) => set('propertyType', e.target.value as PropertyType)}
              className={selectClass}
            >
              {propertyTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="strategy" className="block text-sm font-medium text-slate-700 mb-1">
              Strategy
            </label>
            <select
              id="strategy"
              value={values.strategy}
              onChange={(e) => set('strategy', e.target.value as DealStrategy)}
              className={selectClass}
            >
              {strategyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Sq Ft"
            id="squareFeet"
            value={values.squareFeet}
            onChange={(raw) => set('squareFeet', parseFloat(raw) || 0)}
            error={errors.squareFeet}
            min={0}
            step={50}
          />
          <InputField
            label="Beds"
            id="bedrooms"
            value={values.bedrooms}
            onChange={(raw) => set('bedrooms', parseInt(raw, 10) || 0)}
            error={errors.bedrooms}
            min={0}
            step={1}
          />
          <InputField
            label="Baths"
            id="bathrooms"
            value={values.bathrooms}
            onChange={(raw) => set('bathrooms', parseFloat(raw) || 0)}
            error={errors.bathrooms}
            min={0}
            step={0.5}
          />
        </div>
      </div>
    </SectionCard>
  )
}
