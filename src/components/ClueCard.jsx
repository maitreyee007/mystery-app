function ClueCard({ clue, examined, onToggle }) {
  return (
    <div className={`info-card clue-card ${examined ? 'is-examined' : ''}`}>
      <div className="card-header-row">
        <h4>{clue.title}</h4>
        <span className="meta-pill importance">{clue.importance}</span>
      </div>
      <p>{clue.description}</p>
      <div className="meta-row">
        <span className="meta-pill">Found at: {clue.location}</span>
      </div>
      <button type="button" className="secondary-button" onClick={() => onToggle(clue.id)}>
        {examined ? 'Examined' : 'Mark as Examined'}
      </button>
    </div>
  )
}

export default ClueCard
