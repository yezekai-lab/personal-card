import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import Motto from '../components/Motto.jsx'
import StatusBar from '../components/StatusBar.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function Home() {
  const { profile, typewriterPhrases, skills, vibes, mottos, statuses } = useContent()
  useEffect(() => { document.title = `${profile.name} | 首页` }, [profile.name])
  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <Reveal>
          <div className="hero-identity">
            <Avatar mottos={mottos} />
            <span>{profile.title}<span className="identity-location">{profile.location} · 保持好奇，持续创造</span></span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 id="hero-title"><span className="hero-greeting">你好，我是{profile.name}。</span>让想法，<br className="mobile-break" /><span className="hero-gradient">成为现实。</span></h1>
        </Reveal>
        <Reveal delay={0.12}><p className="hero-description">{profile.summary}</p></Reveal>
        <Reveal delay={0.18}>
          <div className="actions center hero-actions">
            <Link className="btn btn-primary" to="/projects">探索我的项目 <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" to="/contact">聊一聊 <span aria-hidden="true">›</span></Link>
          </div>
        </Reveal>
        <div className="hero-topics" aria-label="关注领域">{typewriterPhrases.map((phrase) => <span key={phrase}>{phrase}</span>)}</div>
        <a className="explore-cue" href="#explore" onClick={(event) => {
          event.preventDefault()
          document.getElementById('explore')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
        }}>向下探索 <span aria-hidden="true">↓</span></a>
      </section>
      <section className="explore-section" id="explore" aria-labelledby="explore-title">
        <div className="section-heading"><div><p className="eyebrow">A LITTLE MORE ABOUT ME</p><h2 id="explore-title">不止于代码。</h2></div><p>作品、思考，以及生活中的灵感。</p></div>
        <div className="showcase-grid">
          <Reveal>
            <Link to="/projects" className="showcase showcase-projects">
              <span className="showcase-kicker">SELECTED WORK</span>
              <h3>想法落地。<br />热爱有迹可循。</h3>
              <p>把复杂的问题，写成清晰的答案。</p>
              <div className="code-art" aria-hidden="true"><div className="window-dots"><i /><i /><i /><span>hello, world</span></div><div className="code-lines"><span><b>const</b> idea = <em>'what if?'</em>;</span><span><b>while</b> (curious) {'{'}</span><span className="code-indent">learn();</span><span className="code-indent">build(<em>idea</em>);</span><span>{'}'}</span></div></div>
              <span className="showcase-link">查看项目 <span aria-hidden="true">↗</span></span>
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <Link to="/about" className="showcase showcase-about">
              <span className="showcase-kicker">BEHIND THE CODE</span>
              <h3>保持好奇。<br />一直在路上。</h3>
              <p>关于我的经历、学习与日常。</p>
              <div className="monogram-art" aria-hidden="true">{profile.monogram}<span>Always learning.</span></div>
              <span className="showcase-link">认识我 <span aria-hidden="true">↗</span></span>
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <Link to="/blog" className="showcase showcase-blog">
              <span className="showcase-kicker">NOTES & THOUGHTS</span>
              <h3>记录此刻。<br />留给未来。</h3>
              <p>一些想法、笔记和生活片段。</p>
              <div className="notes-art" aria-hidden="true"><span>随想</span><i /><i /><i /><b>每一个想法，<br />都有下一页。</b></div>
              <span className="showcase-link">阅读博客 <span aria-hidden="true">↗</span></span>
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="personal-section" aria-label="技术与生活">
        <Reveal><div className="personal-panel"><p className="eyebrow">MY TOOLKIT</p><h2>手边的工具。<br /><span>探索的起点。</span></h2><div className="chips">{skills.map((skill) => <span key={skill} className="chip no-icon">{skill}</span>)}</div></div></Reveal>
        <Reveal delay={0.06}><div className="personal-panel"><p className="eyebrow">OFF THE CLOCK</p><h2>认真写代码。<br /><span>也认真生活。</span></h2><div className="chips">{vibes.map((vibe) => <span key={vibe.label} className="chip"><Icon name={vibe.icon} />{vibe.label}</span>)}</div></div></Reveal>
      </section>
      <Reveal><Motto mottos={mottos} /></Reveal>
      <footer className="home-footer"><span>{profile.name} · Personal space</span><Link to="/contact">保持联系 <span aria-hidden="true">↗</span></Link></footer>
      <StatusBar statuses={statuses} />
    </div>
  )
}
