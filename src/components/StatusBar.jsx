import { useEffect, useState } from 'react'
import { profile } from '../data/content.js'

export default function StatusBar({ statuses }) {
  const [time, setTime] = useState('--:--:--')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('zh-CN', { hour12: false }))
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % statuses.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [statuses.length])

  return (
    <footer className="status">
      <span className="dot" aria-hidden="true" />
      <span>{statuses[index]}</span>
      <span className="sep" aria-hidden="true">
        ·
      </span>
      <span>
        {profile.location} · {time}
      </span>
    </footer>
  )
}
