'use client'

import { useState } from 'react'

interface InputFieldProps {
  label: string
  id: string
  type?: 'text' | 'number'
  value: string | number
  onChange: (raw: string) => void
  error?: string
  prefix?: string
  suffix?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  hint?: string
  disabled?: boolean
}

export default function InputField({
  label,
  id,
  type = 'number',
  value,
  onChange,
  error,
  prefix,
  suffix,
  min,
  max,
  step,
  placeholder,
  hint,
  disabled,
}: InputFieldProps) {
  // raw holds the string the user is currently typing.
  // It is only authoritative while the field is focused.
  const [raw, setRaw] = useState<string>(String(value))
  const [focused, setFocused] = useState(false)

  // While focused: show raw so empty/partial strings are preserved mid-edit.
  // While not focused: show the parent's model value so external changes are reflected.
  const displayValue = type === 'number' ? (focused ? raw : String(value)) : String(value)

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={displayValue}
          onChange={(e) => {
            const next = e.target.value
            if (type === 'number') setRaw(next)
            onChange(next)
          }}
          onFocus={() => {
            if (type === 'number') {
              // Seed raw from the current model value so editing starts from the right place.
              setRaw(String(value))
              setFocused(true)
            }
          }}
          onBlur={() => {
            if (type === 'number') {
              setFocused(false)
              // Re-notify parent so it can normalize the final value (e.g. empty string → 0).
              onChange(raw)
            }
          }}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            'block w-full rounded-lg border text-sm py-2.5 focus:outline-none focus:ring-2',
            prefix ? 'pl-7' : 'pl-3',
            suffix ? 'pr-10' : 'pr-3',
            error
              ? 'border-red-400 bg-red-50 text-red-900 focus:ring-red-200 focus:border-red-400'
              : 'border-slate-300 bg-white text-slate-900 focus:ring-indigo-200 focus:border-indigo-400',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 text-sm select-none">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
