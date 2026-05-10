import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './GeneratorPage.css'
import { apiRequest, API_BASE_URL } from '../utils/api'
import { clearSession, getStoredToken } from '../utils/session'

const EMPTY_FILES = {
  'manifest.json': `{
  "manifest_version": 3,
  "name": "Extensio Example",
  "version": "1.0.0",
  "description": "Your generated extension files will appear here."
}`,
}

const tabIcon = (filename) => {
  if (filename.endsWith('.json')) return 'description'
  if (filename.endsWith('.js')) return 'javascript'
  if (filename.endsWith('.css')) return 'style'
  if (filename.endsWith('.html')) return 'html'
  return 'draft'
}

const DEFAULT_PROMPT = 'Build a chrome extension that highlights all price tags on any e-commerce website and converts them to Bitcoin values based on the current market rate.'

function GeneratorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const incomingPrompt = location.state?.prompt || ''

  const [prompt, setPrompt] = useState(incomingPrompt || 'Build a Chrome extension that blocks all images on a website and replaces them with a red square.')
  const [title, setTitle] = useState('Image Blocker Extension')
  const [files, setFiles] = useState(EMPTY_FILES)
  const [activeTab, setActiveTab] = useState('manifest.json')
  const [zipUrl, setZipUrl] = useState('')
  const [project, setProject] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const token = getStoredToken()

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const fileNames = Object.keys(files)

  useEffect(() => {
    if (!fileNames.includes(activeTab)) {
      setActiveTab(fileNames[0] || 'manifest.json')
    }
  }, [activeTab, fileNames])

  const handleGenerate = async () => {
    const token = getStoredToken()

    if (!token) {
      navigate('/login')
      return
    }

    setIsSubmitting(true)
    setError('')
    setCopied(false)

    try {
      const data = await apiRequest('/api/generate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt,
          title,
        }),
      })

      setFiles(data.files)
      setZipUrl(`${API_BASE_URL}${data.zipUrl}`)
      setProject(data.project)
      setActiveTab(Object.keys(data.files)[0] || 'manifest.json')
    } catch (err) {
      if (err.message === 'Please authenticate.') {
        clearSession()
        navigate('/login')
        return
      }

      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(files[activeTab] || '')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="generator">
      <section className="gen-sidebar">
        <div className="gen-sidebar-header animate-slide-in-left">
          <div className={`gen-status ${project ? 'is-ready' : 'is-idle'}`}>
            <span className="material-symbols-outlined gen-status-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
              {project ? 'check_circle' : 'hourglass'}
            </span>
            <span className="font-label-caps gen-status-text">
              {project ? 'Your extension is ready!' : 'Ready to generate'}
            </span>
          </div>
          <h1 className="font-headline-md gen-title">Extension Factory</h1>
          <p className="font-body-sm gen-desc">Describe what you want, generate the extension files, then download the packaged zip.</p>
        </div>

        <div className="gen-form-card animate-slide-in-left stagger-1">
          <label className="font-label-caps gen-prompt-label" htmlFor="generator-title">Project Title</label>
          <input
            id="generator-title"
            className="input gen-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image Blocker Extension"
          />

          <label className="font-label-caps gen-prompt-label" htmlFor="generator-prompt">Prompt</label>
          <textarea
            id="generator-prompt"
            className="gen-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the Chrome extension you want to build..."
            rows={8}
          />
        </div>

        <div className="gen-prompt-card animate-slide-in-left stagger-1">
          <span className="font-label-caps gen-prompt-label">Current Request</span>
          <div className="gen-prompt-text">{prompt}</div>
        </div>

        <div className="gen-actions animate-slide-in-left stagger-2">
          <button className="btn btn-primary btn-full" id="generate-zip-btn" onClick={handleGenerate} disabled={isSubmitting || !prompt.trim()}>
            <span className="material-symbols-outlined">{isSubmitting ? 'progress_activity' : 'auto_awesome'}</span>
            {isSubmitting ? 'Generating...' : 'Generate Extension'}
          </button>
          <button className="btn btn-ghost btn-full" id="open-dashboard-btn" onClick={() => navigate('/dashboard')}>
            <span className="material-symbols-outlined">dashboard</span>
            Back to Dashboard
          </button>
          {zipUrl ? (
            <a className="btn btn-secondary btn-full gen-download-link" href={zipUrl} target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined">download</span>
              Download .zip
            </a>
          ) : null}
        </div>

        {error ? <p className="gen-message gen-message-error">{error}</p> : null}

        <div className="gen-extension-info animate-slide-in-left stagger-3">
          <div className="gen-ext-badge">
            <div className="gen-ext-icon">
              <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>extension</span>
            </div>
            <div>
              <div className="gen-ext-name">{project?.title || title || 'New Extension'}</div>
              <div className="font-label-caps gen-ext-updated">
                {project ? 'Saved to dashboard' : 'Generate to create your first build'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gen-code-panel animate-fade-in">
        <div className="gen-tabs">
          {fileNames.map((fileName) => (
            <button
              key={fileName}
              className={`gen-tab ${activeTab === fileName ? 'active' : ''}`}
              onClick={() => setActiveTab(fileName)}
            >
              <span className="material-symbols-outlined gen-tab-icon">{tabIcon(fileName)}</span>
              {fileName}
            </button>
          ))}
        </div>

        <div className="gen-code-body">
          <pre className="font-code gen-code-content">{files[activeTab] || 'No file selected yet.'}</pre>
        </div>

        <div className="gen-statusbar">
          <div className="gen-statusbar-left">
            <div className="gen-sync">
              <span className="gen-sync-dot"></span>
              <span className="font-label-caps">{project ? 'Saved to MongoDB' : 'Awaiting generation'}</span>
            </div>
            <span className="font-label-caps">UTF-8</span>
          </div>
          <div className="gen-statusbar-right">
            <button className="gen-copy-btn" title="Copy code" onClick={handleCopy}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>content_copy</span>
            </button>
            <span className="font-label-caps">{copied ? 'COPIED' : activeTab.split('.').pop().toUpperCase()}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GeneratorPage
