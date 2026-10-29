import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext.jsx'
import { ConfettiProvider } from './context/ConfettiContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'
import Navbar from './components/Navbar.jsx'
import Page from './components/Page.jsx'
import KonamiCode from './components/KonamiCode.jsx'
import EditFab from './components/EditFab.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Edit from './pages/Edit.jsx'

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* System theme still works when storage is unavailable. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch { /* Optional preference. */ }
  }, [theme])
  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])
  return (
    <ToastProvider>
      <ConfettiProvider>
        <ContentProvider>
          <a className="skip-link" href="#main-content" onClick={(event) => {
            event.preventDefault()
            document.getElementById('main-content')?.focus()
          }}>跳到主要内容</a>
          <Navbar theme={theme} onToggleTheme={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')} />
          <KonamiCode />
          <EditFab />
          <Page>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Page>
        </ContentProvider>
      </ConfettiProvider>
    </ToastProvider>
  )
}
