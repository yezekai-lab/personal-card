import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { useContent } from '../context/ContentContext.jsx'

function firstText(post) {
  const block = (post.blocks || []).find((b) => b.type === 'text')
  const text = block ? block.text : ''
  return text.length > 90 ? text.slice(0, 90) + '…' : text
}

export default function Blog() {
  const { posts } = useContent()

  useEffect(() => {
    document.title = '叶泽楷 | 博客'
  }, [])

  const sorted = [...(posts || [])].sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  return (
    <div className="container">
      <Reveal blend>
        <h1 className="page-head">博客</h1>
      </Reveal>
      <Reveal delay={0.08} blend>
        <p className="page-sub">一些想法、笔记和记录。</p>
      </Reveal>

      {sorted.length ? (
        <div className="blog-list">
          {sorted.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Link className="panel post-card" to={'/blog/' + encodeURIComponent(post.id)}>
                <div className="post-top">
                  <h2 className="post-title">{post.title}</h2>
                  <span className="post-date">{post.date}</span>
                </div>
                <p className="post-summary">{post.summary || firstText(post)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="panel post-empty">还没有文章，去「编辑内容」写第一篇吧。</div>
        </Reveal>
      )}
    </div>
  )
}
