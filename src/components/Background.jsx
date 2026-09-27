import { useEffect, useRef } from 'react'

export default function Background() {
  const glowRef = useRef(null)
  const orbRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const glow = glowRef.current
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let glowX = mouseX
    let glowY = mouseY
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const loop = () => {
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`

      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      orbRefs.current.forEach((orb) => {
        if (!orb) return
        const depth = parseFloat(orb.getAttribute('data-depth')) || 0
        orb.style.transform = `translate(${(mouseX - centerX) * depth * 0.02}px, ${
          (mouseY - centerY) * depth * 0.02
        }px)`
      })
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="orb-wrap ow-1">
          <div className="orb orb-1" data-depth="30" ref={(el) => (orbRefs.current[0] = el)} />
        </div>
        <div className="orb-wrap ow-2">
          <div className="orb orb-2" data-depth="-20" ref={(el) => (orbRefs.current[1] = el)} />
        </div>
        <div className="orb-wrap ow-3">
          <div className="orb orb-3" data-depth="15" ref={(el) => (orbRefs.current[2] = el)} />
        </div>
      </div>
      <div className="glow" aria-hidden="true" ref={glowRef} />
    </>
  )
}
