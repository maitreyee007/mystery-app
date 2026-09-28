import { useState } from 'react'

function ConclusionForm({ suspects, possibleConclusion, onSubmit }) {
  const [responsible, setResponsible] = useState('')
  const [whatHappened, setWhatHappened] = useState('')
  const [why, setWhy] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ responsible, whatHappened, why })
  }

  return (
    <form className="conclusion-form" onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="suspect">Who do you believe is responsible?</label>
        <select id="suspect" value={responsible} onChange={(event) => setResponsible(event.target.value)} required>
          <option value="">Select a suspect</option>
          {suspects.map((suspect) => (
            <option key={suspect} value={suspect}>
              {suspect}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="what-happened">What happened?</label>
        <select
          id="what-happened"
          value={whatHappened}
          onChange={(event) => setWhatHappened(event.target.value)}
          required
        >
          <option value="">Choose the most likely event</option>
          {possibleConclusion.whatHappened.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="why">Why do you think it happened?</label>
        <select id="why" value={why} onChange={(event) => setWhy(event.target.value)} required>
          <option value="">Choose the motive</option>
          {possibleConclusion.why.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="primary-button">
        Submit Conclusion
      </button>
    </form>
  )
}

export default ConclusionForm
