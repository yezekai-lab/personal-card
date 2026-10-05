import { useEffect, useRef } from 'react'

// 在 giscus.app 完成配置后，把下面两项填上即可启用评论。
const GISCUS = {
  repo: 'yezekai-lab/personal-card',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
}

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function sendConfig(message) {
  const frame = document.querySelector('iframe.giscus-frame')
  if (!frame || !frame.contentWindow) return
  frame.contentWindow.postMessage({ giscus: message }, 'https://giscus.app')
}

export default function Comments({ term }) {
  const containerRef = useRef(null)
  const ready = Boolean(GISCUS.repoId && GISCUS.categoryId)

  useEffect(() => {
    if (!ready) return

    let script = document.querySelector('script[data-giscus]')
    if (!script) {
      script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'
      script.async = true
      script.crossOrigin = 'anonymous'
      script.setAttribute('data-giscus', 'true')
      script.setAttribute('data-repo', GISCUS.repo)
      script.setAttribute('data-repo-id', GISCUS.repoId)
      script.setAttribute('data-category', GISCUS.category)
      script.setAttribute('data-category-id', GISCUS.categoryId)
      script.setAttribute('data-mapping', 'specific')
      script.setAttribute('data-term', term)
      script.setAttribute('data-reactions-enabled', '1')
      script.setAttribute('data-emit-metadata', '0')
      script.setAttribute('data-input-position', 'top')
      script.setAttribute('data-theme', currentTheme())
      script.setAttribute('data-lang', 'zh-CN')
      script.setAttribute('loading', 'lazy')
      containerRef.current.appendChild(script)
    }

    const sync = () => sendConfig({ setConfig: { theme: currentTheme(), term } })

    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const interval = setInterval(() => {
      if (document.querySelector('iframe.giscus-frame')) {
        sync()
        clearInterval(interval)
      }
    }, 400)
    const giveUp = setTimeout(() => clearInterval(interval), 15000)

    return () => {
      observer.disconnect()
      clearInterval(interval)
      clearTimeout(giveUp)
    }
  }, [ready, term])

  if (!ready) {
    return (
      <div className="comments" ref={containerRef}>
        <p className="comments-hint">
          评论功能暂未开启。站长：在 giscus.app 完成配置后，把 repoId 与 categoryId 填入
          src/components/Comments.jsx 即可。
        </p>
      </div>
    )
  }

  return <div className="comments" ref={containerRef} />
}
