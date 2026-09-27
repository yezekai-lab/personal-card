import { useState } from 'react'
import Icon from './Icon.jsx'

export default function Motto({ mottos }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * mottos.length))

  const next = () => setIndex((i) => (i + 1) % mottos.length)

  return (
    <div className="motto">
      <span className="quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      <p key={index}>
        {mottos[index].text}
        <span className="motto-author">—— {mottos[index].author}</span>
      </p>
      <button className="shuffle" onClick={next} aria-label="换一句座右铭" title="换一句">
        <Icon name="refresh" />
      </button>
    </div>
  )
}
