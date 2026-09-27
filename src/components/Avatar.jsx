import { useRef } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { useConfetti } from '../context/ConfettiContext.jsx'
import avatarImg from '../assets/avatar.jpg'

export default function Avatar({ mottos }) {
  const ref = useRef(null)
  const showToast = useToast()
  const burst = useConfetti()

  const onClick = () => {
    showToast('「' + mottos[(Math.random() * mottos.length) | 0].text + '」')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    el.classList.remove('spin')
    void el.offsetWidth
    el.classList.add('spin')
    const r = el.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top + r.height / 2, 40)
  }

  return (
    <button
      ref={ref}
      className="avatar"
      onClick={onClick}
      aria-label="点我有惊喜"
      title="点我有惊喜"
    >
      <img src={avatarImg} alt="叶泽楷的头像" />
    </button>
  )
}
