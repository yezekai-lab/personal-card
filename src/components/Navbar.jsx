import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { useContent } from '../context/ContentContext.jsx'

const links = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '博客' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
  { to: '/contact', label: '联系' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const { profile } = useContent()
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
      if (event.key === 'Tab') {
        const links = [...document.querySelectorAll('.mobile-menu a')]
        const controls = [menuButton.current, ...links].filter(Boolean)
        const current = controls.indexOf(document.activeElement)
        event.preventDefault()
        controls[(current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length]?.focus()
      }
    }
    const onResize = () => { if (window.innerWidth > 720) setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="brand" aria-label="首页">
            <span className="brand-mark">{profile.monogram}</span>
            <span>{profile.name}</span>
          </NavLink>

          <nav className="nav-links" aria-label="主导航">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? '切换浅色模式' : '切换深色模式'}
              title={theme === 'dark' ? '切换浅色模式' : '切换深色模式'}
            >
              <Icon name="sun" className="icon-sun" />
              <Icon name="moon" className="icon-moon" />
            </button>
            <button
              className="menu-btn"
              ref={menuButton}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? '关闭菜单' : '打开菜单'}
              aria-controls="mobile-navigation"
              aria-expanded={open}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            id="mobile-navigation"
            aria-label="移动端导航"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  end={link.to === '/'}
                  className={({ isActive }) => 'mobile-link' + (isActive ? ' active' : '')}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
