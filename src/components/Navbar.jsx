import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { profile } from '../data/content.js'

const links = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
  { to: '/contact', label: '联系' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

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
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        className="nav-pill"
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label="切换深色模式"
              title="切换深色模式"
            >
              <Icon name="sun" className="icon-sun" />
              <Icon name="moon" className="icon-moon" />
            </button>
            <button
              className="menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-label="打开菜单"
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
