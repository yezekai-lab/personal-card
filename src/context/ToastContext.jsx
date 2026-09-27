import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(() => {})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timer = useRef(null)

  const showToast = useCallback((msg) => {
    setMessage(msg)
    setVisible(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(false), 2000)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={'toast' + (visible ? ' show' : '')} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  )
}
