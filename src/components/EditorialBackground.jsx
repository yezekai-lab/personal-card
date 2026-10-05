import { useEffect, useRef } from 'react'

export default function EditorialBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = containerRef.current
    if (!container) return

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let raf

    const onMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const loop = () => {
      targetX += (mouseX - targetX) * 0.08
      targetY += (mouseY - targetY) * 0.08

      const rects = container.querySelectorAll('.rect')
      rects.forEach((rect, i) => {
        const speed = (i % 3 + 1) * 8
        const x = targetX * speed
        const y = targetY * speed
        rect.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })

      const arts = container.querySelectorAll('.art-item')
      arts.forEach((art, i) => {
        const speed = (i % 4 + 1) * 12
        const x = targetX * speed
        const y = targetY * speed
        art.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="editorial-bg" aria-hidden="true">
      {/* Top and bottom rectangles */}
      <div className="rect rect-top" />
      <div className="rect rect-bottom" />

      {/* Art items - colored blocks (top row below nav band) */}
      <div className="art-item art-default" style={{ top: '24%', left: '44%' }} />
      <div className="art-item art-default" style={{ top: '21%', left: '16%' }} />
      <div className="art-item art-default" style={{ top: '67%', left: '31%' }} />
      <div className="art-item art-default" style={{ top: '20%', left: '52%' }} />
      <div className="art-item art-default" style={{ top: '19%', left: '8%' }} />
      <div className="art-item art-default" style={{ top: '50%', left: '13%' }} />
      <div className="art-item art-default" style={{ top: '67%', left: '55%' }} />
      <div className="art-item art-default" style={{ top: '21%', left: '54%' }} />
      <div className="art-item art-default" style={{ top: '42%', left: '46%' }} />
      <div className="art-item art-default" style={{ top: '18%', left: '0%' }} />
      <div className="art-item art-default" style={{ top: '46%', left: '44%' }} />
      <div className="art-item art-default" style={{ top: '26%', left: '12%' }} />

      <div className="art-item art-aux" style={{ top: '55%', left: '11%' }} />
      <div className="art-item art-aux" style={{ top: '56%', left: '16%' }} />
      <div className="art-item art-aux" style={{ top: '22%', left: '57%' }} />
      <div className="art-item art-aux" style={{ top: '17%', left: '21%' }} />
      <div className="art-item art-aux" style={{ top: '30%', left: '21%' }} />

      <div className="art-item art-accent" style={{ top: '90%', left: '26%' }} />
      <div className="art-item art-accent" style={{ top: '35%', left: '65%' }} />

      {/* Grid lines */}
      <div className="lines-horizontal">
        {[...Array(8)].map((_, i) => (
          <div key={`h-${i}`} className="line-h" style={{ top: `${(i + 1) * 12.5}%` }} />
        ))}
      </div>
      <div className="lines-vertical">
        {[...Array(6)].map((_, i) => (
          <div key={`v-${i}`} className="line-v" style={{ left: `${(i + 1) * 16.66}%` }} />
        ))}
      </div>
    </div>
  )
}
