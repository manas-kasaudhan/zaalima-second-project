import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo">Extensio.ai</Link>
          <span className="footer-copy">© 2026 Extensio.ai</span>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Support</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
