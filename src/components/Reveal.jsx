import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 12, blend = false }) {
  if (blend) {
    return <div className="reveal-blend">{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
