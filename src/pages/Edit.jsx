import { useEffect, useState } from 'react'
import { useContent } from '../context/ContentContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import Icon from '../components/Icon.jsx'

const ICON_OPTIONS = [
  'coffee',
  'moon',
  'music',
  'sparkle',
  'bulb',
  'mail',
  'link',
  'location',
  'code',
  'user',
  'github',
  'arrow',
  'external',
  'refresh',
]

const TOKEN_KEY = 'personal-card-gh-token'

const GITHUB = {
  owner: 'yezekai-lab',
  repo: 'personal-card',
  branch: 'main',
  path: 'public/content.json',
}

function toBase64(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

async function commitContent(token, content) {
  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
  }
  const base = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${GITHUB.path}`

  let sha
  const getRes = await fetch(base + '?ref=' + GITHUB.branch, { headers })
  if (getRes.status === 404) {
    sha = null
  } else if (getRes.ok) {
    const data = await getRes.json()
    sha = data.sha
  } else {
    throw new Error('读取文件失败 (' + getRes.status + ')')
  }

  const body = {
    message: '更新站点内容（网页编辑器）',
    content: toBase64(JSON.stringify(content, null, 2)),
    branch: GITHUB.branch,
  }
  if (sha) body.sha = sha

  const putRes = await fetch(base, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!putRes.ok) {
    const text = await putRes.text()
    throw new Error(putRes.status + (text ? ' ' + text.slice(0, 160) : ''))
  }
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}

function StringList({ value, onChange, placeholder }) {
  const update = (i, v) => onChange(value.map((s, idx) => (idx === i ? v : s)))
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, ''])

  return (
    <div className="edit-list">
      {value.map((item, i) => (
        <div className="edit-row" key={i}>
          <input
            className="edit-input"
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
          <button className="edit-remove" onClick={() => remove(i)} aria-label="删除">
            ×
          </button>
        </div>
      ))}
      <button className="edit-add" onClick={add}>
        ＋ 添加
      </button>
    </div>
  )
}

function MottoList({ value, onChange }) {
  const update = (i, patch) => onChange(value.map((m, idx) => (idx === i ? { ...m, ...patch } : m)))
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, { text: '', author: '' }])

  return (
    <div className="edit-list">
      {value.map((m, i) => (
        <div className="edit-object" key={i}>
          <div className="edit-object-head">
            <span className="edit-object-index">#{i + 1}</span>
            <button className="edit-remove" onClick={() => remove(i)} aria-label="删除">
              ×
            </button>
          </div>
          <Field label="名言原文">
            <input
              className="edit-input"
              value={m.text}
              onChange={(e) => update(i, { text: e.target.value })}
            />
          </Field>
          <Field label="作者">
            <input
              className="edit-input"
              value={m.author}
              onChange={(e) => update(i, { author: e.target.value })}
            />
          </Field>
        </div>
      ))}
      <button className="edit-add" onClick={add}>
        ＋ 添加座右铭
      </button>
    </div>
  )
}

function VibeList({ value, onChange }) {
  const update = (i, patch) => onChange(value.map((v, idx) => (idx === i ? { ...v, ...patch } : v)))
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, { label: '', icon: 'sparkle' }])

  return (
    <div className="edit-list">
      {value.map((v, i) => (
        <div className="edit-object" key={i}>
          <div className="edit-object-head">
            <span className="edit-object-index">#{i + 1}</span>
            <button className="edit-remove" onClick={() => remove(i)} aria-label="删除">
              ×
            </button>
          </div>
          <div className="edit-grid">
            <Field label="文字">
              <input
                className="edit-input"
                value={v.label}
                onChange={(e) => update(i, { label: e.target.value })}
              />
            </Field>
            <Field label="图标">
              <select
                className="edit-select"
                value={v.icon}
                onChange={(e) => update(i, { icon: e.target.value })}
              >
                {ICON_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      ))}
      <button className="edit-add" onClick={add}>
        ＋ 添加标签
      </button>
    </div>
  )
}

function ProjectList({ value, onChange }) {
  const update = (i, patch) => onChange(value.map((p, idx) => (idx === i ? { ...p, ...patch } : p)))
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const add = () =>
    onChange([
      ...value,
      { title: '', description: '', tags: [], link: '', live: '', status: '', muted: false },
    ])

  return (
    <div className="edit-list">
      {value.map((p, i) => (
        <div className="edit-object" key={i}>
          <div className="edit-object-head">
            <span className="edit-object-index">#{i + 1}</span>
            <button className="edit-remove" onClick={() => remove(i)} aria-label="删除">
              ×
            </button>
          </div>
          <div className="edit-grid">
            <Field label="标题">
              <input
                className="edit-input"
                value={p.title}
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </Field>
            <Field label="状态（在线 / 进行中…）">
              <input
                className="edit-input"
                value={p.status}
                onChange={(e) => update(i, { status: e.target.value })}
              />
            </Field>
          </div>
          <Field label="描述">
            <textarea
              className="edit-textarea"
              rows={2}
              value={p.description}
              onChange={(e) => update(i, { description: e.target.value })}
            />
          </Field>
          <Field label="标签（用逗号分隔）">
            <input
              className="edit-input"
              value={(p.tags || []).join(', ')}
              onChange={(e) =>
                update(i, {
                  tags: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
          <div className="edit-grid">
            <Field label="源码链接">
              <input
                className="edit-input"
                value={p.link || ''}
                onChange={(e) => update(i, { link: e.target.value })}
              />
            </Field>
            <Field label="在线演示">
              <input
                className="edit-input"
                value={p.live || ''}
                onChange={(e) => update(i, { live: e.target.value })}
              />
            </Field>
          </div>
          <label className="edit-check">
            <input
              type="checkbox"
              checked={!!p.muted}
              onChange={(e) => update(i, { muted: e.target.checked })}
            />
            灰色占位样式
          </label>
        </div>
      ))}
      <button className="edit-add" onClick={add}>
        ＋ 添加项目
      </button>
    </div>
  )
}

function TimelineList({ value, onChange }) {
  const update = (i, patch) => onChange(value.map((t, idx) => (idx === i ? { ...t, ...patch } : t)))
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, { time: '', title: '', text: '' }])

  return (
    <div className="edit-list">
      {value.map((t, i) => (
        <div className="edit-object" key={i}>
          <div className="edit-object-head">
            <span className="edit-object-index">#{i + 1}</span>
            <button className="edit-remove" onClick={() => remove(i)} aria-label="删除">
              ×
            </button>
          </div>
          <div className="edit-grid">
            <Field label="时间">
              <input
                className="edit-input"
                value={t.time}
                onChange={(e) => update(i, { time: e.target.value })}
              />
            </Field>
            <Field label="标题">
              <input
                className="edit-input"
                value={t.title}
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </Field>
          </div>
          <Field label="描述">
            <textarea
              className="edit-textarea"
              rows={2}
              value={t.text}
              onChange={(e) => update(i, { text: e.target.value })}
            />
          </Field>
        </div>
      ))}
      <button className="edit-add" onClick={add}>
        ＋ 添加时间线
      </button>
    </div>
  )
}

function SocialList({ value, onChange }) {
  const update = (i, patch) => onChange(value.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, { label: '', value: '', href: '', icon: 'link' }])

  return (
    <div className="edit-list">
      {value.map((s, i) => (
        <div className="edit-object" key={i}>
          <div className="edit-object-head">
            <span className="edit-object-index">#{i + 1}</span>
            <button className="edit-remove" onClick={() => remove(i)} aria-label="删除">
              ×
            </button>
          </div>
          <div className="edit-grid">
            <Field label="名称">
              <input
                className="edit-input"
                value={s.label}
                onChange={(e) => update(i, { label: e.target.value })}
              />
            </Field>
            <Field label="图标">
              <select
                className="edit-select"
                value={s.icon}
                onChange={(e) => update(i, { icon: e.target.value })}
              >
                {ICON_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="edit-grid">
            <Field label="显示文字">
              <input
                className="edit-input"
                value={s.value}
                onChange={(e) => update(i, { value: e.target.value })}
              />
            </Field>
            <Field label="链接（https:// 或 mailto:）">
              <input
                className="edit-input"
                value={s.href}
                onChange={(e) => update(i, { href: e.target.value })}
              />
            </Field>
          </div>
        </div>
      ))}
      <button className="edit-add" onClick={add}>
        ＋ 添加社交链接
      </button>
    </div>
  )
}

export default function Edit() {
  const { updateContent, resetContent, clearDraft, ...content } = useContent()
  const showToast = useToast()
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    document.title = '叶泽楷 | 编辑内容'
  }, [])

  const set = (key, value) => updateContent((c) => ({ ...c, [key]: value }))
  const patchProfile = (patch) => updateContent((c) => ({ ...c, profile: { ...c.profile, ...patch } }))

  const saveToken = () => {
    localStorage.setItem(TOKEN_KEY, token.trim())
    showToast('Token 已保存')
  }

  const publish = async () => {
    if (!token.trim()) {
      showToast('请先填写并保存 GitHub Token')
      return
    }
    setPublishing(true)
    try {
      await commitContent(token.trim(), content)
      showToast('发布成功，约 1-2 分钟后对所有人可见')
    } catch (err) {
      showToast('发布失败：' + err.message)
    } finally {
      setPublishing(false)
    }
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('已导出 content.json')
  }

  const importJson = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        updateContent(parsed)
        showToast('已导入内容')
      } catch (err) {
        showToast('导入失败：JSON 格式错误')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const reset = () => {
    resetContent()
    showToast('已重置为默认内容')
  }

  const clearLocal = () => {
    clearDraft()
    window.location.reload()
  }

  return (
    <div className="container">
      <h1 className="page-head">编辑内容</h1>
      <p className="page-sub">
        改动会先保存在本浏览器预览；点「发布到网站」提交到 GitHub 并自动部署，让所有人都能看到。
      </p>

      <section className="panel edit-section">
        <h3 className="section-label">发布</h3>
        <div className="edit-toolbar">
          <button className="btn btn-primary" onClick={publish} disabled={publishing}>
            {publishing ? '发布中…' : '发布到网站'}
          </button>
          <button className="btn btn-secondary" onClick={exportJson}>
            <Icon name="external" /> 导出 JSON
          </button>
          <label className="btn btn-secondary">
            <Icon name="refresh" /> 导入 JSON
            <input type="file" accept="application/json,.json" onChange={importJson} hidden />
          </label>
          <button className="btn btn-secondary" onClick={clearLocal}>
            清除草稿
          </button>
          <button className="btn btn-secondary" onClick={reset}>
            重置为默认
          </button>
        </div>
        <div className="edit-grid">
          <Field label="GitHub Token（仅保存在本浏览器）">
            <input
              className="edit-input"
              type="password"
              value={token}
              placeholder="ghp_… 或 github_pat_…"
              onChange={(e) => setToken(e.target.value)}
            />
          </Field>
        </div>
        <div className="edit-token-row">
          <button className="btn btn-secondary" onClick={saveToken}>
            保存 Token
          </button>
          <a
            className="edit-hint-link"
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noreferrer"
          >
            如何创建 Token <Icon name="external" />
          </a>
        </div>
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">基本信息</h3>
        <div className="edit-grid">
          <Field label="姓名">
            <input
              className="edit-input"
              value={content.profile.name}
              onChange={(e) => patchProfile({ name: e.target.value })}
            />
          </Field>
          <Field label="头像缩写">
            <input
              className="edit-input"
              value={content.profile.monogram}
              onChange={(e) => patchProfile({ monogram: e.target.value })}
            />
          </Field>
          <Field label="头衔">
            <input
              className="edit-input"
              value={content.profile.title}
              onChange={(e) => patchProfile({ title: e.target.value })}
            />
          </Field>
          <Field label="城市">
            <input
              className="edit-input"
              value={content.profile.location}
              onChange={(e) => patchProfile({ location: e.target.value })}
            />
          </Field>
          <Field label="邮箱">
            <input
              className="edit-input"
              value={content.profile.email}
              onChange={(e) => patchProfile({ email: e.target.value })}
            />
          </Field>
          <Field label="GitHub 链接">
            <input
              className="edit-input"
              value={content.profile.github}
              onChange={(e) => patchProfile({ github: e.target.value })}
            />
          </Field>
          <Field label="GitHub 显示文字">
            <input
              className="edit-input"
              value={content.profile.githubHandle}
              onChange={(e) => patchProfile({ githubHandle: e.target.value })}
            />
          </Field>
          <Field label="网站链接">
            <input
              className="edit-input"
              value={content.profile.website}
              onChange={(e) => patchProfile({ website: e.target.value })}
            />
          </Field>
          <Field label="网站显示文字">
            <input
              className="edit-input"
              value={content.profile.websiteHandle}
              onChange={(e) => patchProfile({ websiteHandle: e.target.value })}
            />
          </Field>
        </div>
        <Field label="简介">
          <textarea
            className="edit-textarea"
            rows={3}
            value={content.profile.summary}
            onChange={(e) => patchProfile({ summary: e.target.value })}
          />
        </Field>
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">打字机短语</h3>
        <StringList
          value={content.typewriterPhrases}
          onChange={(v) => set('typewriterPhrases', v)}
          placeholder="例如：前端开发"
        />
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">技术栈</h3>
        <StringList
          value={content.skills}
          onChange={(v) => set('skills', v)}
          placeholder="例如：C/C++"
        />
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">状态短语</h3>
        <StringList
          value={content.statuses}
          onChange={(v) => set('statuses', v)}
          placeholder="例如：正在敲代码"
        />
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">座右铭</h3>
        <MottoList value={content.mottos} onChange={(v) => set('mottos', v)} />
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">关于我 · 性格标签</h3>
        <VibeList value={content.vibes} onChange={(v) => set('vibes', v)} />
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">项目</h3>
        <ProjectList value={content.projects} onChange={(v) => set('projects', v)} />
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">关于我 · 时间线</h3>
        <TimelineList value={content.timeline} onChange={(v) => set('timeline', v)} />
      </section>

      <section className="panel edit-section">
        <h3 className="section-label">社交链接</h3>
        <SocialList value={content.socials} onChange={(v) => set('socials', v)} />
      </section>
    </div>
  )
}
