import { useEffect } from 'react'
import Reveal from '../components/Reveal.jsx'
import CopyItem from '../components/CopyItem.jsx'
import Icon from '../components/Icon.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function Contact() {
  const { profile, socials } = useContent()

  useEffect(() => {
    document.title = '叶泽楷 | 联系'
  }, [])

  return (
    <div className="container">
      <Reveal blend>
        <h1 className="page-head">联系</h1>
      </Reveal>
      <Reveal delay={0.08} blend>
        <p className="page-sub">点一下即可复制联系方式，或者直接给我写封邮件。</p>
      </Reveal>

      <Reveal>
        <section className="panel" aria-label="联系方式" style={{ marginBottom: 18 }}>
          <div className="details">
            <div className="item">
              <span className="icon">
                <Icon name="location" />
              </span>
              <span className="text">
                <span className="label">城市</span>
                <span className="value">温州 / 线上</span>
              </span>
            </div>

            <CopyItem
              icon="mail"
              label="邮箱"
              value={profile.email}
              copyValue={profile.email}
            />
            <CopyItem
              icon="github"
              label="GitHub"
              value={profile.githubHandle}
              copyValue={profile.github}
            />
            <CopyItem
              icon="link"
              label="网站"
              value={profile.websiteHandle}
              copyValue={profile.website}
            />
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="panel" aria-label="社交链接">
          <h3 className="section-label">在别处找到我</h3>
          <div className="social-row">
            {socials.map((social) => (
              <a
                key={social.label}
                className="social-link"
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <Icon name={social.icon} />
                {social.label}
              </a>
            ))}
          </div>
          <div className="actions" style={{ marginTop: 20 }}>
            <a className="btn btn-primary" href={'mailto:' + profile.email}>
              发邮件给我
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
