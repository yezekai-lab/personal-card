import { useState } from 'react'
import Icon from './Icon.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { copyText } from '../lib/clipboard.js'

export default function CopyItem({ icon, label, value, copyValue }) {
  const [copied, setCopied] = useState(false)
  const showToast = useToast()

  const copy = () => {
    copyText(copyValue).then(() => {
      setCopied(true)
      showToast('已复制' + label)
      setTimeout(() => setCopied(false), 1600)
    })
  }

  return (
    <div
      className={'item copyable' + (copied ? ' copied' : '')}
      role="button"
      tabIndex={0}
      onClick={copy}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          copy()
        }
      }}
    >
      <span className="icon">
        <Icon name={icon} />
      </span>
      <span className="text">
        <span className="label">{label}</span>
        <span className="value">{value}</span>
      </span>
      <span className="copy-hint" aria-hidden="true">
        <Icon name="copy" className="ic-copy" />
        <Icon name="check" className="ic-check" />
      </span>
    </div>
  )
}
