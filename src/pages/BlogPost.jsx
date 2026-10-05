import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Comments from '../components/Comments.jsx'
import Icon from '../components/Icon.jsx'
import { useContent } from '../context/ContentContext.jsx'

function resolveSrc(src) {
  if (!src) return ''
  if (/^(https?:|data:)/.test(src)) return src
  return import.meta.env.BASE_URL + src
}

export default function BlogPost() {
  const { posts } = useContent()
  const location = useLocation()
  const id = decodeURIComponent(location.pathname.slice('/blog/'.length))
  const post = (posts || []).find((p) => p.id === id)

  useEffect(() => {
    document.title = '叶泽楷 | ' + (post ? post.title : '文章')
  }, [post])

  if (!post) {
    return (
      <div className="container">
        <h1 className="page-head">文章不存在</h1>
        <p className="page-sub">它可能已被删除或尚未发布。</p>
        <div className="actions center">
          <Link className="btn btn-secondary" to="/blog">
            <Icon name="arrow" /> 返回博客
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Reveal blend>
        <h1 className="page-head">{post.title}</h1>
      </Reveal>
      <Reveal delay={0.08} blend>
        <p className="page-sub post-meta">{post.date}</p>
      </Reveal>

      <Reveal>
        <article className="panel post-body">
          {(post.blocks || []).map((block, i) =>
            block.type === 'image' ? (
              <img
                key={i}
                className="post-img"
                src={resolveSrc(block.src)}
                alt={block.alt || ''}
                loading="lazy"
              />
            ) : (
              <p key={i} className="post-text">
                {block.text}
              </p>
            ),
          )}
        </article>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="panel post-comments" aria-label="评论">
          <h3 className="section-label">评论</h3>
          <Comments term={post.id} />
        </section>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="actions center">
          <Link className="btn btn-secondary" to="/blog">
            <Icon name="arrow" /> 返回博客
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
