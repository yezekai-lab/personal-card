import { useState } from 'react'
import Icon from './Icon.jsx'

export default function Motto({ mottos }) {
  const list = mottos || []
  const [index, setIndex] = useState(() =>
    list.length ? Math.floor(Math.random() * list.length) : 0,
  )

  if (!list.length) {
    return (
      <div className="motto">
        <span className="quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <p>还没有座右铭，去「编辑内容」添加一句吧。</p>
      </div>
    )
  }

  const next = () => setIndex((i) => (i + 1) % list.length)

  return (
    <div className="motto">
      <span className="quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      <p key={index}>
        {list[index].text}
        <span className="motto-author">—— {list[index].author}</span>
      </p>
      <button className="shuffle" onClick={next} aria-label="换一句座右铭" title="换一句">
        <Icon name="refresh" />
      </button>
    </div>
  )
}
