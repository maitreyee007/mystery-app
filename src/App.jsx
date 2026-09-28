import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CasesPage from './pages/CasesPage'
import ProgressPage from './pages/ProgressPage'
import CaseInvestigationPage from './pages/CaseInvestigationPage'
import './App.css'

const STORAGE_KEY = 'mystery-case-solver-progress'

function readProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return { solved: [], inProgress: [] }
    }

    const parsed = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') {
      return { solved: [], inProgress: [] }
    }

    const solved = Array.isArray(parsed.solved) ? [...parsed.solved] : []
    const inProgress = Array.isArray(parsed.inProgress) ? [...parsed.inProgress] : []

    if (solved.length || inProgress.length || !Object.keys(parsed).length) {
      return { solved, inProgress }
    }

    Object.entries(parsed).forEach(([key, value]) => {
      if (key === 'solved' || key === 'inProgress') {
        return
      }

      if (value && typeof value === 'object' && value.solved) {
        solved.push(key)
      } else if (value && typeof value === 'object') {
        inProgress.push(key)
      }
    })

    return { solved, inProgress }
  } catch {
    return { solved: [], inProgress: [] }
  }
}

function App() {
  const [progress, setProgress] = useState(readProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const handleCaseOpen = (caseId) => {
    setProgress((current) => {
      const solved = new Set(current.solved)
      const inProgress = new Set(current.inProgress)

      if (!solved.has(caseId)) {
        inProgress.add(caseId)
      }

      return {
        solved: [...solved],
        inProgress: [...inProgress],
      }
    })
  }

  const handleSubmitCaseConclusion = (caseId, isCorrect) => {
    setProgress((current) => {
      const solved = new Set(current.solved)
      const inProgress = new Set(current.inProgress)

      if (isCorrect) {
        solved.add(caseId)
        inProgress.delete(caseId)
      } else {
        inProgress.add(caseId)
      }

      return {
        solved: [...solved],
        inProgress: [...inProgress],
      }
    })
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage solvedCases={progress.solved} />} />
          <Route
            path="/cases"
            element={
              <CasesPage
                solvedCaseIds={progress.solved}
                inProgressCaseIds={progress.inProgress}
              />
            }
          />
          <Route
            path="/progress"
            element={
              <ProgressPage
                solvedCaseIds={progress.solved}
                inProgressCaseIds={progress.inProgress}
              />
            }
          />
          <Route
            path="/case/:caseId"
            element={
              <CaseInvestigationPage
                solvedCaseIds={progress.solved}
                inProgressCaseIds={progress.inProgress}
                onCaseOpen={handleCaseOpen}
                onSubmitCaseConclusion={handleSubmitCaseConclusion}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
