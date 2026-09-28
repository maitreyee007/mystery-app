import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="topbar">
      <div className="container nav-shell">
        <NavLink to="/" className="brand">
          Mystery Case Solver
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/cases">Cases</NavLink>
          <NavLink to="/progress">My Progress</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
