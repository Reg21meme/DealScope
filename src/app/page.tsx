import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DealScope — Real Estate Deal Analyzer',
  description:
    'Analyze long-term rental and house-hack deals. Instant calculations for cash flow, cap rate, CoC ROI, DSCR, and more.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-lg font-bold text-slate-900 tracking-tight">DealScope</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            Local-first · No account required
          </div>

          <h1 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Analyze rental deals
            <br />
            with clarity.
          </h1>

          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            Model long-term rental and house-hack scenarios. Instant calculations for
            cash flow, cap rate, CoC&nbsp;ROI, DSCR, and more — no spreadsheet required.
          </p>

          <div className="mt-10">
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Analyze a Deal
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-slate-100 pt-10">
            {[
              { label: 'Cash Flow', desc: 'Monthly & annual' },
              { label: 'Cap Rate & CoC', desc: 'Returns at a glance' },
              { label: 'DSCR', desc: 'Lender stress test' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        DealScope · All calculations run locally · No data leaves your browser
      </footer>
    </div>
  )
}
