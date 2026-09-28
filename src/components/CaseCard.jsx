import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function CaseCard({ caseItem, status }) {
  return (
    <article className="case-card">
      <div className="card-header-row">
        <span className="case-number">{caseItem.caseNumber}</span>
        <StatusBadge status={status} />
      </div>

      <h3>{caseItem.title}</h3>
      <p className="case-description">{caseItem.description}</p>

      <div className="meta-row">
        <span className="meta-pill">Difficulty: {caseItem.difficulty}</span>
      </div>

      <Link to={`/case/${caseItem.id}`} className="primary-button full-width">
        Investigate
      </Link>
    </article>
  )
}

export default CaseCard
