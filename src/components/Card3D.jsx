import { motion } from 'framer-motion'
import usePointerTilt from '../hooks/usePointerTilt.js'

export default function Card3D({ children, className = '', maxTilt = 10 }) {
  const tilt = usePointerTilt(maxTilt)
  return <motion.div className={className} {...tilt}>{children}</motion.div>
}
