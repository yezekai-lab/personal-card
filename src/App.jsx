import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from './context/ToastContext.jsx'
import { ConfettiProvider } from './context/ConfettiContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'
import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Page from './components/Page.jsx'
import KonamiCode from './components/KonamiCode.jsx'
import EditFab from './components/EditFab.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Edit from './pages/Edit.jsx'

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      return next
    })
  }

  return (
    <ToastProvider>
      <ConfettiProvider>
        <ContentProvider>
          <Background />
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <KonamiCode />
          <EditFab />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <Page>
                    <Home />
                  </Page>
                }
              />
              <Route
                path="/projects"
                element={
                  <Page>
                    <Projects />
                  </Page>
                }
              />
              <Route
                path="/about"
                element={
                  <Page>
                    <About />
                  </Page>
                }
              />
              <Route
                path="/contact"
                element={
                  <Page>
                    <Contact />
                  </Page>
                }
              />
              <Route
                path="/edit"
                element={
                  <Page>
                    <Edit />
                  </Page>
                }
              />
              <Route
                path="*"
                element={
                  <Page>
                    <Home />
                  </Page>
                }
              />
            </Routes>
          </AnimatePresence>
        </ContentProvider>
      </ConfettiProvider>
    </ToastProvider>
  )
}
