import { useEffect } from 'react'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function About() {
  const { profile, timeline, vibes } = useContent()

  useEffect(() => {
    document.title = '叶泽楷 | 关于'
  }, [])

  return (
    <div className="container">
      <h1 className="page-head">关于我</h1>
      <p className="page-sub">{profile.summary}</p>

      <Reveal>
        <section className="panel" aria-label="学习路径" style={{ marginBottom: 18 }}>
          <h3 className="section-label">学习路径</h3>
          <div className="timeline">
            {timeline.map((item) => (
              <div className="tl-item" key={item.title}>
                <div className="tl-time">{item.time}</div>
                <h4 className="tl-title">{item.title}</h4>
                <p className="tl-text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="panel" aria-label="兴趣">
          <h3 className="section-label">兴趣与日常</h3>
          <div className="chips">
            {vibes.map((vibe) => (
              <span key={vibe.label} className="chip">
                <Icon name={vibe.icon} />
                {vibe.label}
              </span>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  )
}
