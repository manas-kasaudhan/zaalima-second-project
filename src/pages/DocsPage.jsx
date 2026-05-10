import { Link } from 'react-router-dom'

function DocsPage() {
  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px', textAlign: 'center' }}>
      <div className="animate-fade-in-up">
        <div style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--sp-8)'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--primary)' }}>menu_book</span>
        </div>
        <h1 className="font-headline-xl" style={{ marginBottom: 'var(--sp-4)' }}>Documentation</h1>
        <p className="font-body-base" style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto var(--sp-10)' }}>
          Our comprehensive documentation is currently being built. Check back soon for guides, API references, and tutorials.
        </p>
        <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center' }}>
          <Link to="/generator" className="btn btn-primary btn-lg">Try the Generator</Link>
          <Link to="/" className="btn btn-ghost btn-lg">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
