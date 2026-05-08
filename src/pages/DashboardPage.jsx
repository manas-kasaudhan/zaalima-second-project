import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './DashboardPage.css'
import { apiRequest } from '../utils/api'
import { clearSession, getStoredToken, getStoredUser } from '../utils/session'

function DashboardPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    const token = getStoredToken()
    const storedUser = getStoredUser()

    if (!token) {
      navigate('/login')
      return
    }

    if (storedUser) {
      setUsername(storedUser.username || '')
    }

    async function loadProjects() {
      try {
        const data = await apiRequest('/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setProjects(data)
      } catch (err) {
        setError(err.message)

        if (err.message === 'Please authenticate.') {
          clearSession()
          navigate('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [navigate])

  const stats = [
    { label: 'Total Builds', value: String(projects.length), color: 'var(--text-primary)' },
    { label: 'Latest Version', value: projects[0] ? `v${projects[0].version}` : '-', color: 'var(--text-primary)' },
    { label: 'Saved Projects', value: String(projects.length), color: 'var(--text-primary)' },
    { label: 'Account', value: username || 'Active', color: 'var(--text-primary)' },
  ]

  return (
    <div className="dashboard container">
      {/* Header */}
      <header className="dash-header animate-fade-in-up">
        <div>
          <h1 className="font-headline-xl dash-title">My Extensions</h1>
          <p className="dash-subtitle">
            {username ? `Welcome back, ${username}. ` : ''}
            Manage and deploy your custom AI-powered web extensions.
          </p>
        </div>
        <Link to="/generator" className="btn btn-primary btn-lg" id="create-new-btn">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Create New Extension</span>
        </Link>
      </header>

      {error ? <p className="dash-message dash-message-error">{error}</p> : null}

      {isLoading ? (
        <div className="dash-state card">
          <p className="font-body-sm">Loading your saved projects...</p>
        </div>
      ) : (
        <div className="dash-grid">
          <Link to="/generator" className="dash-empty animate-fade-in-up stagger-1" id="new-concept-card">
            <div className="dash-empty-icon">
              <span className="material-symbols-outlined">add</span>
            </div>
            <h4 className="font-headline-md dash-empty-title">Start a new project</h4>
            <p className="font-body-sm dash-empty-desc">Describe your ideal extension and let Extensio.ai generate it for you.</p>
          </Link>

          {projects.map((project) => (
            <article key={project._id} className="card dash-project-card animate-fade-in-up">
              <div className="dash-project-top">
                <span className="dash-project-badge">v{project.version}</span>
                <span className="font-label-caps dash-project-date">
                  {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-headline-md dash-project-title">{project.title}</h3>
              <p className="font-body-sm dash-project-prompt">{project.prompt}</p>
              <div className="dash-project-footer">
                <span className="font-label-caps">Saved in MongoDB</span>
                {project.zipUrl ? (
                  <a className="dash-project-link" href={`http://localhost:5000${project.zipUrl}`} target="_blank" rel="noreferrer">
                    Download zip
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Account Activity */}
      <section className="dash-stats-section animate-fade-in-up stagger-2">
        <h2 className="font-headline-md dash-stats-heading">Account Activity</h2>
        <div className="dash-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="card dash-stat-card">
              <p className="font-label-caps dash-stat-label">{stat.label}</p>
              <p className="dash-stat-value" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
