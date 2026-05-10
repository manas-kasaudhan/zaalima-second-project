import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import GeneratorPage from './pages/GeneratorPage'
import PricingPage from './pages/PricingPage'
import DocsPage from './pages/DocsPage'
import PageTransition from './components/PageTransition'

function App() {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
            <Route path="/generator" element={<PageTransition><GeneratorPage /></PageTransition>} />
            <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
            <Route path="/docs" element={<PageTransition><DocsPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
