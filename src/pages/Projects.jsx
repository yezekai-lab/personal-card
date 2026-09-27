import { useEffect } from 'react'
import Card3D from '../components/Card3D.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function Projects() {
  const { projects } = useContent()

  useEffect(() => {
    document.title = '叶泽楷 | 项目'
  }, [])

  return (
    <div className="container">
      <h1 className="page-head">项目</h1>
      <p className="page-sub">把想法变成能跑起来的东西，这里记录着它们。</p>

      <div className="projects">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08}>
            <Card3D className="panel project-card" maxTilt={6}>
              <div className="glare" aria-hidden="true" />
              <div className="project-top">
                <h2 className="project-title">{project.title}</h2>
                <span className={'project-status' + (project.muted ? ' muted' : '')}>
                  {project.status}
                </span>
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {(project.link || project.live) && (
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <Icon name="github" /> 源码
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <Icon name="external" /> 在线演示
                    </a>
                  )}
                </div>
              )}
            </Card3D>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
