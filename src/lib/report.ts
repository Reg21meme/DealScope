import type { Scenario, DealOutputs } from '@/types/deal'
import { computeOutputs } from '@/lib/calculators'

export interface ScenarioReport {
  scenario: Scenario
  outputs: DealOutputs
  isActive: boolean
}

export interface ReportData {
  dealName: string
  generatedAt: string
  activeIndex: number
  scenarioReports: ScenarioReport[]
}

export function buildReportData(
  dealName: string,
  scenarios: Scenario[],
  activeIndex: number
): ReportData {
  return {
    dealName,
    generatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    activeIndex,
    scenarioReports: scenarios.map((scenario, i) => ({
      scenario,
      outputs: computeOutputs(scenario),
      isActive: i === activeIndex,
    })),
  }
}
