// 所有文案与内容集中在此，方便修改。

export const profile = {
  name: '叶泽楷',
  monogram: 'YK',
  title: 'Software Engineer',
  location: '温州',
  summary:
    '热爱编程，喜欢把复杂问题拆解成清晰方案。正在持续学习 Python、C 语言开发、交互体验和产品思维。',
  email: '3995479885@qq.com',
  github: 'https://github.com/yezekai-lab',
  githubHandle: 'github.com/yezekai-lab',
  website: 'https://yezekai-lab.github.io/personal-card',
  websiteHandle: 'yezekai-lab.github.io/personal-card',
}

export const typewriterPhrases = ['前端开发', '技术分享', '持续学习', '产品思维']

export const skills = ['C/C++', 'Python', 'Git', 'GitHub Pages']

export const vibes = [
  { label: '咖啡驱动', icon: 'coffee' },
  { label: '夜猫子', icon: 'moon' },
  { label: 'Lo-Fi 循环', icon: 'music' },
  { label: '极简主义', icon: 'sparkle' },
  { label: '好奇心驱动', icon: 'bulb' },
]

export const mottos = [
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Premature optimization is the root of all evil.', author: 'Donald Knuth' },
  { text: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
  {
    text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
    author: 'Harold Abelson',
  },
  { text: 'Debugging is twice as hard as writing the code in the first place.', author: 'Brian Kernighan' },
  { text: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' },
]

export const statuses = [
  '正在敲代码',
  '刚喝了杯咖啡',
  '学习 C/C++ 中',
  '循环着 Lo-Fi',
  '和 Bug 斗智斗勇',
  '构思一个新点子',
]

export const projects = [
  {
    title: '个人名片网站',
    description: '把一张名片做成有质感的产品：多页面、毛玻璃质感、丝滑动画与彩蛋。',
    tags: ['React', 'Vite', 'Framer Motion'],
    link: 'https://github.com/yezekai-lab/personal-card',
    live: 'https://yezekai-lab.github.io/personal-card',
    status: '在线',
    featured: true,
  },
  {
    title: 'Python 小工具',
    description: '用 Python 写点提升效率的小脚本，正在积累中。',
    tags: ['Python'],
    status: '进行中',
  },
  {
    title: 'C 语言练习',
    description: '夯实基础：指针、内存、数据结构，一步一个脚印。',
    tags: ['C'],
    status: '进行中',
  },
  {
    title: '更多作品，敬请期待',
    description: '保持好奇，保持折腾，这里会慢慢被填满。',
    tags: ['…'],
    status: '占位',
    muted: true,
  },
]

export const timeline = [
  {
    time: '现在',
    title: '前端开发与交互体验',
    text: '用 React / Vite 把想法做成能跑起来的产品，打磨每一处动效与细节。',
  },
  {
    time: '进行中',
    title: 'Python 学习',
    text: '写脚本、处理数据，把重复的事情交给代码。',
  },
  {
    time: '进行中',
    title: 'C 语言学习',
    text: '从指针和内存开始，理解计算机的底层逻辑。',
  },
  {
    time: '起步',
    title: 'Git 与 GitHub Pages',
    text: '学会版本管理，把作品部署到互联网上。',
  },
]

export const socials = [
  { label: 'GitHub', value: profile.githubHandle, href: profile.github, icon: 'github' },
  { label: '邮箱', value: profile.email, href: 'mailto:' + profile.email, icon: 'mail' },
  { label: '网站', value: profile.websiteHandle, href: profile.website, icon: 'link' },
]
