import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignupPage.css'
import { apiRequest } from '../utils/api'
import { saveSession } from '../utils/session'

function SignupPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const data = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      })

      saveSession(data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-wrapper animate-fade-in-up">
        <div className="signup-card card">
          <div className="signup-header">
            <h1 className="font-headline-md signup-title">Create an account</h1>
            <p className="font-body-sm signup-subtitle">Enter your details to get started with Extensio.ai</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="font-label-caps form-label" htmlFor="signup-name">Full Name</label>
              <input
                className="input"
                id="signup-name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="font-label-caps form-label" htmlFor="signup-email">Email Address</label>
              <input
                className="input"
                id="signup-email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="font-label-caps form-label" htmlFor="signup-password">Password</label>
              <input
                className="input"
                id="signup-password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error ? <p className="form-message form-message-error">{error}</p> : null}

            <button className="btn btn-primary btn-full btn-lg" type="submit" id="signup-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="signup-footer">
            <p className="font-body-sm">
              Already have an account?
              <Link to="/login" className="signup-login-link">Login</Link>
            </p>
          </div>
        </div>

        {/* Technical Tags */}
        <div className="signup-tags">
          <span className="tag tag-primary">v1.2.4-stable</span>
          <span className="tag tag-success">Secure-Auth-Protocol</span>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
