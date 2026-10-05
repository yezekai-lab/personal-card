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
const BLOG_STORAGE_KEY = 'personal-card-blog'

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

function loadBlogDraft() {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.posts)) return parsed
    }
  } catch (e) {
    /* ignore corrupted storage */
  }
  return null
}

function normalizeBlog(blog) {
  if (blog && Array.isArray(blog.posts)) return blog
  return { posts: [] }
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => mergeDefaults(loadDraft()))
  const [hasDraft] = useState(() => !!localStorage.getItem(STORAGE_KEY))
  const [blog, setBlog] = useState(() => loadBlogDraft() || { posts: [] })
  const [hasBlogDraft] = useState(() => !!localStorage.getItem(BLOG_STORAGE_KEY))

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

  useEffect(() => {
    if (hasBlogDraft) return
    const url = import.meta.env.BASE_URL + 'blog.json'
    fetch(url, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((published) => {
        if (published) setBlog(normalizeBlog(published))
      })
      .catch(() => {
        /* keep empty */
      })
  }, [hasBlogDraft])

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

  const updateBlog = useCallback((updater) => {
    setBlog((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try {
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(next))
      } catch (e) {
        /* ignore quota errors */
      }
      return next
    })
  }, [])

  const clearBlogDraft = useCallback(() => {
    try {
      localStorage.removeItem(BLOG_STORAGE_KEY)
    } catch (e) {
      /* ignore */
    }
  }, [])

  const reloadBlog = useCallback(() => {
    const url = import.meta.env.BASE_URL + 'blog.json'
    return fetch(url, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((published) => setBlog(normalizeBlog(published)))
      .catch(() => {
        /* keep current */
      })
  }, [])

  return (
    <ContentContext.Provider
      value={{
        ...content,
        posts: blog.posts,
        updateContent,
        resetContent,
        clearDraft,
        updateBlog,
        clearBlogDraft,
        reloadBlog,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
