import ProgressCard from '../components/ProgressCard'
import { caseData } from '../data/cases'

function ProgressPage({ solvedCaseIds = [], inProgressCaseIds = [] }) {
  const totalCases = caseData.length
  const solvedCount = solvedCaseIds.length
  const inProgressCount = inProgressCaseIds.length

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="section-head">
          <div>
            <p className="eyebrow">Investigator status</p>
            <h1>My Progress</h1>
          </div>
        </div>

        <div className="stats-grid wide-grid">
          <ProgressCard label="Total cases" value={totalCases} subtitle="All files" tone="default" />
          <ProgressCard label="Solved" value={solvedCount} subtitle="Case closed" tone="success" />
          <ProgressCard label="In progress" value={inProgressCount} subtitle="Still active" tone="warning" />
        </div>

        <div className="panel nested-panel">
          <h2>Solved case badges</h2>
          <div className="badge-list">
            {solvedCaseIds.length > 0 ? (
              solvedCaseIds.map((caseId) => {
                const caseItem = caseData.find((item) => item.id === caseId)
                if (!caseItem) return null

                return (
                  <span key={caseId} className="solved-badge">
                    {caseItem.caseNumber} • {caseItem.title}
                  </span>
                )
              })
            ) : (
              <p className="empty-state">No solved cases yet. Begin your first investigation.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProgressPage
