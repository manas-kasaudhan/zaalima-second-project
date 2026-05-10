import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LandingPage.css'

const prompts = {
  'Ad Blocker': 'Build a Chrome extension that blocks ad domains using Manifest V3 declarativeNetRequest API and logs the number of blocked requests in a popup.',
  'Dark Mode': 'Create an extension that injects a global dark mode CSS filter into any website. It should have a popup with a toggle switch to enable or disable the theme.',
  'Form Filler': 'Write a developer tool extension that adds a button to the browser toolbar. When clicked, it automatically fills realistic dummy data into all text inputs on the active tab.',
  'Color Picker': 'Build an eye-dropper extension. Clicking the extension icon activates a tool to click any element on the current webpage and copies its computed background-color HEX code to the clipboard.'
}
const suggestions = Object.keys(prompts)

function LandingPage() {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  const handleGenerate = () => {
    if (!prompt.trim()) {
      document.getElementById('prompt-input')?.focus()
      return
    }
    navigate('/generator', { state: { prompt: prompt.trim() } })
  }

  const handleSuggestion = (label) => {
    setPrompt(prompts[label])
  }

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero bg-dot-grid">
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">
            <span className="hero-badge-version">v1.0.4 Release</span>
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-info">Manifest V3 Support</span>
          </div>

          <h1 className="font-headline-xl hero-title">
            Build browser extensions<br />
            <span className="hero-accent">with natural language.</span>
          </h1>

          <p className="hero-subtitle font-body-base">
            Skip the boilerplate. Describe your tool, and Extensio.ai generates the manifest, scripts, and assets.
          </p>

          {/* Prompt Box */}
          <div className="prompt-box">
            <textarea
              className="prompt-textarea font-code"
              placeholder="e.g., block all ads and replace with a green square"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              id="prompt-input"
            />
            <div className="prompt-footer">
              <div className="prompt-status">
                <span className="material-symbols-outlined prompt-icon">terminal</span>
                <span className="font-code prompt-status-text">
                  {prompt.trim().length > 0 ? `${prompt.trim().length} CHARS — READY TO GENERATE` : 'READY FOR PROMPT...'}
                </span>
              </div>
              <button className="btn btn-primary" onClick={handleGenerate} id="generate-btn">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bolt</span>
                Generate Extension
              </button>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="suggestions">
            <span className="font-label-caps suggestions-label">SUGGESTIONS:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                className="suggestion-chip font-label-caps"
                onClick={() => handleSuggestion(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Features */}
      <section className="features-section">
        <div className="features-grid">
          {/* Large Feature Card */}
          <div className="feature-card feature-large">
            <div className="feature-card-text">
              <span className="font-label-caps feature-label" style={{ color: 'var(--primary)' }}>ENGINEERED FOR SPEED</span>
              <h3 className="font-headline-md feature-title">Zero Boilerplate Environment</h3>
              <p className="feature-desc">We handle the manifest configurations, background service workers, and content scripts so you can focus on the logic.</p>
            </div>
            <div className="feature-card-visual">
              <div className="feature-code-preview">
                <div className="code-line" style={{ width: '50%' }}></div>
                <div className="code-line" style={{ width: '100%' }}></div>
                <div className="code-line" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          {/* Small Feature Cards */}
          <div className="feature-card feature-small animate-fade-in-up stagger-2">
            <div className="feature-icon-box" style={{ background: 'var(--primary-light)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>terminal</span>
            </div>
            <div>
              <h3 className="font-headline-md feature-title">CLI Integration</h3>
              <p className="feature-desc font-body-sm">Deploy directly from your terminal with our open-source CLI toolkit.</p>
            </div>
          </div>

          <div className="feature-card feature-small animate-fade-in-up stagger-3">
            <div className="feature-icon-box" style={{ background: 'var(--success-light)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--success)' }}>cloud_done</span>
            </div>
            <div>
              <h3 className="font-headline-md feature-title">Instant Preview</h3>
              <p className="feature-desc font-body-sm">Test your extensions in a virtual browser instance before downloading the source code.</p>
            </div>
          </div>

          {/* Wide Feature Card */}
          <div className="feature-card feature-wide">
            <div>
              <h3 className="font-headline-md feature-title">Security Focused</h3>
              <p className="feature-desc font-body-sm">Generated code adheres to the latest security protocols for all major browsers.</p>
            </div>
            <div className="feature-wide-icons">
              <span className="material-symbols-outlined feature-ghost-icon">shield</span>
              <span className="material-symbols-outlined feature-ghost-icon">lock</span>
            </div>
          </div>
        </div>
      </section>

      {/* Developer First Architecture */}
      <section className="dev-section">
        <div className="container dev-content">
          <div className="dev-text">
            <h2 className="font-headline-md dev-heading">Developer First Architecture</h2>
            <div className="dev-steps">
              {[
                { num: '01', title: 'Contextual Awareness', desc: 'Our AI understands the specific constraints and capabilities of the WebExtension API.' },
                { num: '02', title: 'Modern Tech Stack', desc: 'Exports clean, modular TypeScript and React code that fits into modern workflows.' },
                { num: '03', title: 'One-Click Export', desc: 'Download a ready-to-use ZIP file or view the code directly.' },
              ].map((step) => (
                <div key={step.num} className="dev-step">
                  <span className="dev-step-num">{step.num}</span>
                  <div>
                    <h4 className="dev-step-title">{step.title}</h4>
                    <p className="dev-step-desc font-body-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dev-code-block">
            <div className="code-block-header">
              <div className="code-dots">
                <div className="code-dot"></div>
                <div className="code-dot"></div>
                <div className="code-dot"></div>
              </div>
              <span className="code-filename font-code">manifest.json</span>
            </div>
            <div className="code-block-body">
              <pre className="font-code code-content">{`{
  "manifest_version": 3,
  "name": "Extensio Project",
  "version": "1.0.0",
  "action": {
    "default_popup": "index.html"
  },
  "permissions": [
    "storage",
    "activeTab"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2 className="font-headline-md cta-title">Start building your next tool.</h2>
            <p className="cta-desc">Create better browsing experiences with the power of Extensio.ai.</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-lg" id="cta-get-started">Get Started</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
