import { useEffect } from 'react'
import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

// Springs settle at rest; no permanent requestAnimationFrame loop per card.
export default function usePointerTilt(amount = 5) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 24 })
  const springY = useSpring(y, { stiffness: 180, damping: 24 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [amount, -amount])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-amount, amount])
  const lightX = useTransform(x, (v) => `${(v + 0.5) * 100}%`)
  const lightY = useTransform(y, (v) => `${(v + 0.5) * 100}%`)

  useEffect(() => {
    if (reducedMotion) { x.set(0); y.set(0) }
  }, [reducedMotion, x, y])

  return {
    style: { rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY, transformPerspective: 900, '--mx': lightX, '--my': lightY },
    onPointerMove(event) {
      if (reducedMotion || event.pointerType !== 'mouse') return
      const rect = event.currentTarget.getBoundingClientRect()
      x.set((event.clientX - rect.left) / rect.width - 0.5)
      y.set((event.clientY - rect.top) / rect.height - 0.5)
    },
    onPointerLeave() { x.set(0); y.set(0) },
  }
}
