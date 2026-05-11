import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { clearSession, getStoredUser } from '../utils/session'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser())

    syncUser()
    window.addEventListener('extensio-auth-changed', syncUser)
    window.addEventListener('storage', syncUser)

    return () => {
      window.removeEventListener('extensio-auth-changed', syncUser)
      window.removeEventListener('storage', syncUser)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/generator', label: 'Generator' },
    { to: '/docs', label: 'Docs' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    clearSession()
    setMobileOpen(false)
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">Extensio.ai</Link>
          <nav className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="navbar-actions">
          <div className="navbar-right">
            {user ? (
              <>
                <span className="navbar-user">Hi, {user.username}</span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`navbar-link ${isActive('/login') ? 'active' : ''}`}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign up
                </Link>
              </>
            )}
          </div>

          <div className="navbar-controls">
            {/* Subtle Theme Toggle */}
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="material-symbols-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`navbar-mobile-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar-mobile-actions">
            {user ? (
              <>
                <span className="navbar-mobile-user">Hi, {user.username}</span>
                <button type="button" className="btn btn-ghost btn-full" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-mobile-link" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/signup" className="btn btn-primary btn-full" onClick={() => setMobileOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
