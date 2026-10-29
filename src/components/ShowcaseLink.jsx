import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import usePointerTilt from '../hooks/usePointerTilt.js'

const MotionLink = motion.create(Link)

export default function ShowcaseLink({ children, className, to }) {
  const tilt = usePointerTilt(7)
  return (
    <MotionLink to={to} className={className} {...tilt}>
      {children}
      <span className="showcase-glint" aria-hidden="true" />
    </MotionLink>
  )
}
