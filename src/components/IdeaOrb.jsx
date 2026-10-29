import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import usePointerTilt from '../hooks/usePointerTilt.js'

const modes = [
  { name: '构建', code: 'BUILD', symbol: '</>', caption: '把一个想法，写成下一行代码。' },
  { name: '想象', code: 'DREAM', symbol: '✳', caption: '让好奇心，走在答案前面。' },
  { name: '玩心', code: 'PLAY', symbol: ':)', caption: '偶尔不为结果，只为好玩。' },
]

export default function IdeaOrb() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.15 })
  const reducedMotion = useReducedMotion()
  const tilt = usePointerTilt(14)
  const mode = modes[index]

  return (
    <div className="idea-lab" ref={ref} data-mode={mode.code.toLowerCase()} data-paused={paused || !inView || reducedMotion}>
      <div className="lab-heading"><span><i /> INTERACTIVE OBJECT / 01</span><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reducedMotion} aria-label={paused ? '播放球体动效' : '暂停球体动效'}>{reducedMotion ? '静态模式' : paused ? '播放 ↻' : '暂停 Ⅱ'}</button></div>
      <motion.div className="orb-stage" {...tilt}>
        <div className="orb-grid" aria-hidden="true" />
        <div className="orb-halo" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true"><i /></div>
        <div className="orbit orbit-two" aria-hidden="true"><i /></div>
        <span className="orb-coordinate coordinate-top" aria-hidden="true">IDEA → REALITY</span>
        <span className="orb-coordinate coordinate-bottom" aria-hidden="true">{String(index + 1).padStart(2, '0')} / 03</span>
        <button className="idea-orb" onClick={() => setIndex((index + 1) % modes.length)} aria-label={`灵感球体：${mode.name}，点击切换到${modes[(index + 1) % modes.length].name}`}>
          <span className="orb-surface" aria-hidden="true" />
          <span className="orb-symbol" key={mode.code} aria-hidden="true">{mode.symbol}</span>
        </button>
        <span className="orb-satellite satellite-code" aria-hidden="true">{mode.code}<span>●</span></span>
        <span className="orb-satellite satellite-note" aria-hidden="true">Made of curiosity <span>↗</span></span>
      </motion.div>
      <div className="lab-caption"><div className="mode-selector" role="group" aria-label="灵感模式">{modes.map((item, i) => <button key={item.code} onClick={() => setIndex(i)} aria-pressed={i === index}>{item.name}</button>)}</div><p aria-live="polite">{mode.caption}</p><span className="lab-hint">点击球体，换一种灵感 ↗</span></div>
    </div>
  )
}
