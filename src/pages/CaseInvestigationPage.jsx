import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CaseTabs from '../components/CaseTabs'
import ClueCard from '../components/ClueCard'
import EvidenceCard from '../components/EvidenceCard'
import WitnessCard from '../components/WitnessCard'
import ConclusionForm from '../components/ConclusionForm'
import StatusBadge from '../components/StatusBadge'
import { caseData } from '../data/cases'

const STORAGE_KEY = 'mystery-case-solver-progress'
const tabs = ['Overview', 'Clues', 'Evidence', 'Witness Statements', 'Investigation Notes', 'Final Conclusion']

function readCaseProgress(caseId) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return { clues: [], evidence: [], witnesses: [], note: '', solved: false }
    }

    const parsed = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') {
      return { clues: [], evidence: [], witnesses: [], note: '', solved: false }
    }

    const caseProgress = parsed[caseId] || {}
    return {
      clues: Array.isArray(caseProgress.clues) ? caseProgress.clues : [],
      evidence: Array.isArray(caseProgress.evidence) ? caseProgress.evidence : [],
      witnesses: Array.isArray(caseProgress.witnesses) ? caseProgress.witnesses : [],
      note: typeof caseProgress.note === 'string' ? caseProgress.note : '',
      solved: Boolean(caseProgress.solved),
    }
  } catch {
    return { clues: [], evidence: [], witnesses: [], note: '', solved: false }
  }
}

function CaseInvestigationPage({ solvedCaseIds, inProgressCaseIds, onCaseOpen, onSubmitCaseConclusion }) {
  const { caseId } = useParams()
  const caseItem = caseData.find((item) => item.id === caseId)

  useEffect(() => {
    if (caseId && onCaseOpen) {
      onCaseOpen(caseId)
    }
  }, [caseId, onCaseOpen])

  const storedCaseState = readCaseProgress(caseId)

  const [activeTab, setActiveTab] = useState('Overview')
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(caseItem?.evidence[0]?.id || '')
  const [examinedClues, setExaminedClues] = useState(storedCaseState.clues || [])
  const [reviewedEvidence, setReviewedEvidence] = useState(storedCaseState.evidence || [])
  const [reviewedWitnesses, setReviewedWitnesses] = useState(storedCaseState.witnesses || [])
  const [notes, setNotes] = useState(storedCaseState.note || '')
  const [submitted, setSubmitted] = useState(storedCaseState.solved || false)
  const [feedback, setFeedback] = useState(null)

  const selectedEvidence = useMemo(
    () => caseItem?.evidence.find((item) => item.id === selectedEvidenceId) || caseItem?.evidence[0],
    [caseItem, selectedEvidenceId],
  )

  if (!caseItem) {
    return (
      <main className="page-shell">
        <section className="panel">
          <h1>Case not found</h1>
          <Link to="/cases" className="primary-button">
            Back to cases
          </Link>
        </section>
      </main>
    )
  }

  const persistProgress = (nextClues, nextEvidence, nextWitnesses, nextNotes, nextSolved) => {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const nextProgress = {
      solved: Array.isArray(current.solved) ? current.solved : [],
      inProgress: Array.isArray(current.inProgress) ? current.inProgress : [],
      [caseId]: {
        clues: nextClues,
        evidence: nextEvidence,
        witnesses: nextWitnesses,
        note: nextNotes,
        solved: nextSolved,
      },
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress))
  }

  const toggleClue = (clueId) => {
    const next = examinedClues.includes(clueId)
      ? examinedClues.filter((id) => id !== clueId)
      : [...examinedClues, clueId]

    setExaminedClues(next)
    persistProgress(next, reviewedEvidence, reviewedWitnesses, notes, submitted)
  }

  const toggleEvidence = (evidenceId) => {
    const next = reviewedEvidence.includes(evidenceId)
      ? reviewedEvidence.filter((id) => id !== evidenceId)
      : [...reviewedEvidence, evidenceId]

    setReviewedEvidence(next)
    persistProgress(examinedClues, next, reviewedWitnesses, notes, submitted)
  }

  const toggleWitness = (witnessId) => {
    const next = reviewedWitnesses.includes(witnessId)
      ? reviewedWitnesses.filter((id) => id !== witnessId)
      : [...reviewedWitnesses, witnessId]

    setReviewedWitnesses(next)
    persistProgress(examinedClues, reviewedEvidence, next, notes, submitted)
  }

  const handleNoteChange = (event) => {
    const nextNote = event.target.value
    setNotes(nextNote)
    persistProgress(examinedClues, reviewedEvidence, reviewedWitnesses, nextNote, submitted)
  }

  const handleConclusion = ({ responsible, whatHappened, why }) => {
    const isCorrect =
      responsible === caseItem.solution.responsible &&
      whatHappened === caseItem.solution.whatHappened &&
      why === caseItem.solution.why

    onSubmitCaseConclusion(caseItem.id, isCorrect)
    setFeedback(isCorrect ? 'Correct conclusion! Case solved.' : 'Not quite. Review the evidence and try again.')
    setSubmitted(isCorrect)

    const nextSolved = isCorrect || submitted
    persistProgress(examinedClues, reviewedEvidence, reviewedWitnesses, notes, nextSolved)
  }

  const caseStatus = solvedCaseIds.includes(caseItem.id)
    ? 'Solved'
    : inProgressCaseIds.includes(caseItem.id)
      ? 'In Progress'
      : 'Unsolved'

  return (
    <main className="page-shell">
      <section className="panel investigation-panel">
        <div className="section-head investigation-head">
          <div>
            <p className="eyebrow">Current case file</p>
            <h1>{caseItem.title}</h1>
            <p className="case-description">{caseItem.description}</p>
          </div>
          <div className="status-cluster">
            <StatusBadge status={caseStatus} />
            <Link to="/cases" className="secondary-button compact-button">
              Back to Cases
            </Link>
          </div>
        </div>

        <CaseTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'Overview' && (
          <div className="content-grid two-column">
            <div className="info-card">
              <h3>Case Overview</h3>
              <p>{caseItem.overview}</p>
              <div className="meta-row">
                <span className="meta-pill">Difficulty: {caseItem.difficulty}</span>
                <span className="meta-pill">Suspects: {caseItem.suspects.length}</span>
              </div>
            </div>
            <div className="info-card">
              <h3>Suspects</h3>
              <ul className="suspect-list">
                {caseItem.suspects.map((suspect) => (
                  <li key={suspect}>{suspect}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Clues' && (
          <div className="card-grid">
            {caseItem.clues.map((clue) => (
              <ClueCard
                key={clue.id}
                clue={clue}
                examined={examinedClues.includes(clue.id)}
                onToggle={toggleClue}
              />
            ))}
          </div>
        )}

        {activeTab === 'Evidence' && (
          <div className="content-grid evidence-layout">
            <div className="card-grid two-up">
              {caseItem.evidence.map((item) => (
                <EvidenceCard
                  key={item.id}
                  evidence={item}
                  reviewed={reviewedEvidence.includes(item.id)}
                  selected={selectedEvidenceId === item.id}
                  onSelect={(id) => {
                    setSelectedEvidenceId(id)
                    toggleEvidence(id)
                  }}
                />
              ))}
            </div>

            {selectedEvidence && (
              <div className="info-card detail-panel">
                <h3>{selectedEvidence.title}</h3>
                <p>{selectedEvidence.details}</p>
                <div className="meta-row">
                  <span className="meta-pill">Location: {selectedEvidence.location}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Witness Statements' && (
          <div className="card-grid">
            {caseItem.witnesses.map((witness) => (
              <WitnessCard
                key={witness.id}
                witness={witness}
                reviewed={reviewedWitnesses.includes(witness.id)}
                onToggle={toggleWitness}
              />
            ))}
          </div>
        )}

        {activeTab === 'Investigation Notes' && (
          <div className="info-card notes-card">
            <h3>Investigation Notes</h3>
            <textarea
              value={notes}
              onChange={handleNoteChange}
              placeholder="Write your deductions here..."
              rows={8}
            />
          </div>
        )}

        {activeTab === 'Final Conclusion' && (
          <div className="content-grid two-column">
            <ConclusionForm
              suspects={caseItem.suspects}
              possibleConclusion={caseItem.possibleConclusion}
              onSubmit={handleConclusion}
            />

            <div className="info-card summary-panel">
              <h3>Case summary</h3>
              <p>{caseItem.solution.explanation}</p>
              {feedback ? (
                <div className={`result-box ${feedback.includes('Correct') ? 'success' : 'warning'}`}>
                  {feedback}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default CaseInvestigationPage
