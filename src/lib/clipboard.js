export function copyText(text) {
  return new Promise((resolve) => {
    const fallback = () => {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } catch (e) {
        /* ignore */
      }
      document.body.removeChild(ta)
      resolve()
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(resolve).catch(fallback)
    } else {
      fallback()
    }
  })
}
