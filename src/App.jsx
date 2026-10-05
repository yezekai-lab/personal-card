import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext.jsx'
import { ConfettiProvider } from './context/ConfettiContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'
import Background from './components/Background.jsx'
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

const PAGES = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/projects', component: Projects },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
]

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const location = useLocation()
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef(null)
  const pendingDelta = useRef(0)
  const firstScroll = useRef(true)

  const currentIndex = PAGES.findIndex((p) => p.path === location.pathname)
  const activeIndex = currentIndex === -1 ? 0 : currentIndex
  const isEdit = location.pathname === '/edit'
  const isBlogPost = location.pathname.startsWith('/blog/')
  const isExtra = currentIndex === -1
  const scrollTarget = isExtra ? PAGES.length : currentIndex

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

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const to = scrollTarget * window.innerHeight

    if (firstScroll.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      firstScroll.current = false
      container.scrollTop = to
      return
    }

    const from = container.scrollTop
    if (Math.abs(to - from) < 1) return

    let raf
    const start = performance.now()
    const duration = 650
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      container.scrollTop = from + (to - from) * ease(p)
      if (p < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [scrollTarget])

  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current
      if (!container) return
      container.scrollTop = scrollTarget * window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [scrollTarget])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onWheel = (e) => {
      if (isExtra) return

      const pageDiv = e.target.closest && e.target.closest('.scroll-nav-inner > div')
      if (pageDiv && pageDiv.scrollHeight > pageDiv.clientHeight + 1) {
        const atTop = pageDiv.scrollTop <= 1
        const atBottom =
          pageDiv.scrollTop + pageDiv.clientHeight >= pageDiv.scrollHeight - 1
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          pendingDelta.current = 0
          return
        }
      }

      e.preventDefault()

      pendingDelta.current += e.deltaY

      if (Math.abs(pendingDelta.current) < 40) return

      if (isScrolling.current) {
        pendingDelta.current = 0
        return
      }

      const dir = pendingDelta.current > 0 ? 1 : -1
      pendingDelta.current = 0

      isScrolling.current = true

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 900)

      let newIndex = activeIndex

      if (dir > 0 && activeIndex < PAGES.length - 1) {
        newIndex = activeIndex + 1
      } else if (dir < 0 && activeIndex > 0) {
        newIndex = activeIndex - 1
      }

      if (newIndex !== activeIndex) {
        navigate(PAGES[newIndex].path, { replace: true })
      } else {
        isScrolling.current = false
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', onWheel)
    }
  }, [activeIndex, navigate, isExtra])

  return (
    <ToastProvider>
      <ConfettiProvider>
        <ContentProvider>
          <Background />
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <KonamiCode />
          <EditFab />
          <div ref={containerRef} className="scroll-nav-container">
            <div className="scroll-nav-inner">
              {PAGES.map(({ path, component: Component }) => (
                <div key={path}>
                  <Page>
                    <Component />
                  </Page>
                </div>
              ))}
              {isExtra && (
                <div className="extra-view">
                  <Page>{isEdit ? <Edit /> : <BlogPost />}</Page>
                </div>
              )}
            </div>
          </div>
        </ContentProvider>
      </ConfettiProvider>
    </ToastProvider>
  )
}
