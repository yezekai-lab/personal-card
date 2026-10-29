import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function Magnetic({ children, strength = 0.15 }) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })
  return (
    <motion.span className="magnetic" style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }} onPointerMove={(event) => {
      if (reducedMotion || event.pointerType !== 'mouse') return
      const rect = event.currentTarget.getBoundingClientRect()
      x.set((event.clientX - rect.left - rect.width / 2) * strength)
      y.set((event.clientY - rect.top - rect.height / 2) * strength)
    }} onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.span>
  )
}
