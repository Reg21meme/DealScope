'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Scenario } from '@/types/deal'
import { computeOutputs } from '@/lib/calculators'
import { validateScenario } from '@/lib/validators/deal'
import PropertySection from '@/components/analyze/PropertySection'
import FinancingSection from '@/components/analyze/FinancingSection'
import RenovationSection from '@/components/analyze/RenovationSection'
import RentalSection from '@/components/analyze/RentalSection'
import ExpenseSection from '@/components/analyze/ExpenseSection'
import OutputsPanel from '@/components/analyze/OutputsPanel'

const defaultScenario: Scenario = {
  id: 'draft',
  name: 'Base Case',
  property: {
    address: '',
    purchasePrice: 350000,
    propertyType: 'single-family',
    strategy: 'long-term-rental',
    squareFeet: 1400,
    bedrooms: 3,
    bathrooms: 2,
  },
  financing: {
    downPaymentPercent: 0.2,
    interestRate: 0.07,
    loanTermYears: 30,
    closingCostPercent: 0.03,
  },
  renovation: {
    estimatedCost: 0,
    financedIntoLoan: false,
  },
  rental: {
    monthlyRent: 2200,
    vacancyRatePercent: 0.05,
    ownerUnitRent: 0,
  },
  expenses: {
    propertyTaxMonthly: 350,
    insuranceMonthly: 125,
    maintenancePercent: 0.05,
    managementPercent: 0.08,
    utilitiesMonthly: 0,
    hoaMonthly: 0,
    otherMonthly: 0,
  },
}

export default function AnalyzePage() {
  const [scenario, setScenario] = useState<Scenario>(defaultScenario)

  const outputs = computeOutputs(scenario)
  const errors = validateScenario(scenario)

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-slate-900 tracking-tight hover:text-indigo-600 transition-colors">
            DealScope
          </Link>
          <span className="text-sm text-slate-400 hidden sm:block">Deal Analyzer</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Analyze a Deal</h1>
          <p className="mt-1 text-sm text-slate-500">
            Fill in your assumptions below — outputs update automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-6">
            <PropertySection
              values={scenario.property}
              errors={errors.property}
              onChange={(property) => setScenario((s) => ({ ...s, property }))}
            />
            <FinancingSection
              values={scenario.financing}
              errors={errors.financing}
              onChange={(financing) => setScenario((s) => ({ ...s, financing }))}
            />
            <RenovationSection
              values={scenario.renovation}
              errors={errors.renovation}
              onChange={(renovation) => setScenario((s) => ({ ...s, renovation }))}
            />
            <RentalSection
              values={scenario.rental}
              errors={errors.rental}
              onChange={(rental) => setScenario((s) => ({ ...s, rental }))}
              strategy={scenario.property.strategy}
            />
            <ExpenseSection
              values={scenario.expenses}
              errors={errors.expenses}
              onChange={(expenses) => setScenario((s) => ({ ...s, expenses }))}
            />
          </div>

          <div className="lg:sticky lg:top-[72px]">
            <OutputsPanel outputs={outputs} />
          </div>
        </div>
      </main>
    </div>
  )
}
