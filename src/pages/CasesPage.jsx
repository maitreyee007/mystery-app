import CaseCard from '../components/CaseCard'
import { caseData } from '../data/cases'

function CasesPage({ solvedCaseIds = [], inProgressCaseIds = [] }) {
  const getStatus = (caseItem) => {
    if (solvedCaseIds.includes(caseItem.id)) {
      return 'Solved'
    }

    if (inProgressCaseIds.includes(caseItem.id)) {
      return 'In Progress'
    }

    return 'Unsolved'
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="section-head">
          <div>
            <p className="eyebrow">Active case files</p>
            <h1>Case Directory</h1>
          </div>
        </div>

        <div className="cases-grid">
          {caseData.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              status={getStatus(caseItem)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default CasesPage
