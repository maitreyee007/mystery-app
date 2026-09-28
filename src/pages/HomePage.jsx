import { Link } from 'react-router-dom'
import { caseData } from '../data/cases'

function HomePage({ solvedCases = [] }) {
  const totalCases = caseData.length
  const solvedCount = solvedCases.length
  const activeCases = totalCases - solvedCount

  const recentCases = caseData.slice(0, 3)

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Case files archive</p>
          <h1>Mystery Case Solver</h1>
          <p className="lead-copy">
            Investigate fictional crimes, review evidence, interview witnesses, and crack each case before the culprit escapes.
          </p>
          <Link to="/cases" className="primary-button">
            Start Investigating
          </Link>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">Solved cases</span>
          <strong>{solvedCount}</strong>
        </div>
        <div className="stat-box">
          <span className="stat-label">Available cases</span>
          <strong>{totalCases}</strong>
        </div>
        <div className="stat-box">
          <span className="stat-label">Ongoing cases</span>
          <strong>{activeCases}</strong>
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Recent investigations</h2>
          <Link to="/cases" className="text-link">
            Browse all cases
          </Link>
        </div>

        <div className="mini-case-list">
          {recentCases.map((caseItem) => (
            <div key={caseItem.id} className="mini-case-item">
              <div>
                <p className="case-number">{caseItem.caseNumber}</p>
                <h3>{caseItem.title}</h3>
              </div>
              <Link to={`/case/${caseItem.id}`} className="secondary-button compact-button">
                Open
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
