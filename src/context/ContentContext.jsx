import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  profile,
  typewriterPhrases,
  skills,
  vibes,
  mottos,
  statuses,
  projects,
  timeline,
  socials,
} from '../data/content.js'

const STORAGE_KEY = 'personal-card-content'

const DEFAULTS = {
  profile,
  typewriterPhrases,
  skills,
  vibes,
  mottos,
  statuses,
  projects,
  timeline,
  socials,
}

function mergeDefaults(saved) {
  const merged = {}
  Object.keys(DEFAULTS).forEach((key) => {
    merged[key] = saved && saved[key] !== undefined ? saved[key] : DEFAULTS[key]
  })
  return merged
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* ignore corrupted storage */
  }
  return null
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => mergeDefaults(loadDraft()))
  const [hasDraft] = useState(() => !!localStorage.getItem(STORAGE_KEY))

  useEffect(() => {
    if (hasDraft) return
    const url = import.meta.env.BASE_URL + 'content.json'
    fetch(url, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((published) => {
        if (published) setContent(mergeDefaults(published))
      })
      .catch(() => {
        /* keep defaults */
      })
  }, [hasDraft])

  const updateContent = useCallback((updater) => {
    setContent((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (e) {
        /* ignore quota errors */
      }
      return next
    })
  }, [])

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      /* ignore */
    }
  }, [])

  const resetContent = useCallback(() => {
    clearDraft()
    setContent({ ...DEFAULTS })
  }, [clearDraft])

  return (
    <ContentContext.Provider value={{ ...content, updateContent, resetContent, clearDraft }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
