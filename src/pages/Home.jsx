import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card3D from '../components/Card3D.jsx'
import Avatar from '../components/Avatar.jsx'
import Typewriter from '../components/Typewriter.jsx'
import Motto from '../components/Motto.jsx'
import StatusBar from '../components/StatusBar.jsx'
import Magnetic from '../components/Magnetic.jsx'
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
      <Card3D className="card">
        <div className="glare" aria-hidden="true" />

        <section className="profile">
          <Avatar mottos={mottos} />
          <div className="intro">
            <p className="eyebrow">
              {profile.title} · {profile.location}
            </p>
            <h1>{profile.name}</h1>
            <h2 className="typewrap">
              <Typewriter phrases={typewriterPhrases} />
              <span className="caret" aria-hidden="true" />
            </h2>
            <p className="summary">{profile.summary}</p>
          </div>
        </section>

        <Motto mottos={mottos} />

        <div className="actions center" style={{ marginTop: 24 }}>
          <Magnetic>
            <Link className="btn btn-primary" to="/projects">
              查看项目
              <Icon name="arrow" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link className="btn btn-secondary" to="/contact">
              联系我
            </Link>
          </Magnetic>
        </div>
      </Card3D>

      <section className="entry-grid" aria-label="快速导航">
        <Reveal>
          <Link to="/projects" className="entry-tile">
            <span className="entry-icon">
              <Icon name="code" />
            </span>
            <h2 className="entry-title">项目</h2>
            <p className="entry-desc">把想法变成能跑起来的东西</p>
            <span className="entry-link">
              了解更多 <Icon name="arrow" />
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
              了解更多 <Icon name="arrow" />
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
              了解更多 <Icon name="arrow" />
            </span>
          </Link>
        </Reveal>
      </section>

      <div style={{ display: 'grid', gap: 18, marginTop: 18 }}>
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
      </div>

      <StatusBar statuses={statuses} />
    </div>
  )
}
