import { createContext, useCallback, useContext, useEffect, useRef } from 'react'

const ConfettiContext = createContext(() => {})

export function useConfetti() {
  return useContext(ConfettiContext)
}

const palette = ['#0a84ff', '#8a5cff', '#ff2d78', '#30d158', '#ff9f0a', '#64d2ff', '#ffd60a']

export function ConfettiProvider({ children }) {
  const canvasRef = useRef(null)
  const parts = useRef([])
  const raf = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const frame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    parts.current = parts.current.filter((p) => p.y < canvas.height + 30 && p.opacity > 0)
    parts.current.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.12
      p.rot += p.vr
      p.opacity -= 0.008
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    })
    if (parts.current.length) {
      raf.current = requestAnimationFrame(frame)
    } else {
      raf.current = null
    }
  }, [])

  const burst = useCallback(
    (x, y, count = 40) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 3 + Math.random() * 7
        parts.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          w: 6 + Math.random() * 6,
          h: 4 + Math.random() * 6,
          color: palette[(Math.random() * palette.length) | 0],
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.3,
          opacity: 1,
        })
      }
      if (!raf.current) raf.current = requestAnimationFrame(frame)
    },
    [frame],
  )

  return (
    <ConfettiContext.Provider value={burst}>
      <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
      {children}
    </ConfettiContext.Provider>
  )
}
