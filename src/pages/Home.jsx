import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import Typewriter from '../components/Typewriter.jsx'
import Motto from '../components/Motto.jsx'
import StatusBar from '../components/StatusBar.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function Home() {
  const { profile, typewriterPhrases, skills, vibes, mottos, statuses } = useContent()

  useEffect(() => {
    document.title = '叶泽楷 | 首页'
  }, [])

  return (
    <div className="container">
      <div className="card">
        <section className="profile">
          <Reveal delay={0.02} y={14}>
            <Avatar mottos={mottos} />
          </Reveal>
          <div className="intro">
            <Reveal delay={0.06} y={14} blend>
              <p className="eyebrow">
                {profile.title}
              </p>
            </Reveal>
            <h1>{profile.name}</h1>
            <Reveal delay={0.28} y={14} blend>
              <h2 className="typewrap">
                <Typewriter phrases={typewriterPhrases} />
                <span className="caret" aria-hidden="true" />
              </h2>
            </Reveal>
            <Reveal delay={0.36} y={14} blend>
              <p className="summary">{profile.summary}</p>
            </Reveal>
          </div>
        </section>

        <Reveal delay={0.44} y={14}>
          <Motto mottos={mottos} />
        </Reveal>

        <Reveal delay={0.52} y={14}>
          <div className="actions center" style={{ marginTop: 18 }}>
            <Link className="btn btn-primary" to="/projects">
              查看项目
            </Link>
            <Link className="btn btn-secondary" to="/contact">
              联系我
            </Link>
          </div>
        </Reveal>
      </div>

      <section className="entry-grid" aria-label="快速导航">
        <Reveal>
          <Link to="/projects" className="entry-tile">
            <span className="entry-icon">
              <Icon name="code" />
            </span>
            <h2 className="entry-title">项目</h2>
            <p className="entry-desc">把想法变成能跑起来的东西</p>
            <span className="entry-link">
              了解更多
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.06}>
          <Link to="/about" className="entry-tile">
            <span className="entry-icon">
              <Icon name="user" />
            </span>
            <h2 className="entry-title">关于</h2>
            <p className="entry-desc">我的经历、学习路径与兴趣</p>
            <span className="entry-link">
              了解更多
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.12}>
          <Link to="/contact" className="entry-tile">
            <span className="entry-icon">
              <Icon name="mail" />
            </span>
            <h2 className="entry-title">联系</h2>
            <p className="entry-desc">发封邮件，或复制联系方式</p>
            <span className="entry-link">
              了解更多
            </span>
          </Link>
        </Reveal>
      </section>

      <div style={{ display: 'grid', gap: 14, marginTop: 16 }}>
        <Reveal delay={0.05}>
          <section className="panel panel--center" aria-label="技术栈">
            <h3 className="section-label">技术栈</h3>
            <div className="chips">
              {skills.map((skill) => (
                <span key={skill} className="chip no-icon">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <section className="panel panel--center" aria-label="关于我">
            <h3 className="section-label">关于我</h3>
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

      <Reveal delay={0.18} blend>
        <StatusBar statuses={statuses} />
      </Reveal>
    </div>
  )
}
