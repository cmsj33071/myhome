/* =============================================================
   站点内容配置 · 只改这一个文件就能换成你自己的作品集
   -------------------------------------------------------------
   1. profile  基本信息 / 首屏文案 / 社交链接
   2. stats    数字看板
   3. about    个人简介
   4. skills   技能分组（bars 为熟练度进度条，stack 为技术标签）
   5. projects 项目作品（accent 决定封面渐变，cover 可选真实图片）
   6. timeline 经历时间线
   7. marquee  首屏下方的滚动关键词
   ============================================================= */

window.SITE_DATA = {
  profile: {
    name: "林川",
    latin: "LIN CHUAN",
    initials: "LC",
    role: "全栈工程师 / 创意开发者",
    location: "杭州 · 中国",
    status: "开放远程与长期合作",
    email: "hi@linchuan.dev",
    heroTitle: "用代码构建",
    heroTitleAccent: "有质感的产品",
    heroDesc:
      "六年全栈经验，擅长把复杂业务拆成清晰的系统，再用细节把界面打磨到像素级。在性能、动效与可维护性之间，找到那个刚好的平衡点。",
    focus: "Web / 设计系统 / 动效",
    texts: {
      availableBadge: "可合作"
    },
    socials: [
      { label: "GitHub", handle: "@linchuan", href: "https://github.com/", icon: "github" },
      { label: "掘金", handle: "@林川", href: "https://juejin.cn/", icon: "juejin" },
      { label: "X / Twitter", handle: "@linchuan_dev", href: "https://x.com/", icon: "x" },
      { label: "Email", handle: "hi@linchuan.dev", href: "mailto:hi@linchuan.dev", icon: "mail" }
    ]
  },

  marquee: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Design System",
    "WebGL",
    "Motion Design",
    "Performance",
    "PostgreSQL",
    "Accessibility"
  ],

  stats: [
    { value: 6, suffix: "+", label: "年工程经验" },
    { value: 42, suffix: "", label: "个上线项目" },
    { value: 12, suffix: "", label: "个开源仓库" },
    { value: 5, suffix: "", label: "支长期合作团队" }
  ],

  about: {
    paragraphs: [
      "我是林川，一名常驻杭州的全栈工程师。过去六年，我参与过从 0 到 1 的产品搭建，也在成熟团队里做过设计系统、性能治理与前端架构升级。",
      "技术上我偏向 TypeScript 生态，习惯用数据和度量驱动决策；设计上我在意留白、层级与动效的节奏感。写代码之外，我会维护一些开源小工具，也写一点工程实践笔记。"
    ],
    highlights: [
      { title: "端到端交付", desc: "需求拆解、架构设计、上线与可观测性" },
      { title: "设计系统", desc: "从 Token 到组件库的完整落地" },
      { title: "性能治理", desc: "Core Web Vitals 与构建体积优化" },
      { title: "团队协作", desc: "技术方案评审与工程规范建设" }
    ]
  },

  skills: [
    {
      icon: "layout",
      title: "前端工程",
      desc: "构建稳定、可维护的界面系统",
      bars: [
        { name: "TypeScript", level: 95 },
        { name: "React / Next.js", level: 92 },
        { name: "CSS 架构与动效", level: 90 }
      ],
      stack: ["Vue 3", "Vite", "Tailwind", "Zustand", "TanStack", "Astro"]
    },
    {
      icon: "sparkles",
      title: "视觉与交互",
      desc: "让界面有节奏，也有记忆点",
      bars: [
        { name: "交互动效", level: 88 },
        { name: "设计系统", level: 90 },
        { name: "数据可视化", level: 82 }
      ],
      stack: ["GSAP", "Framer Motion", "Three.js", "D3", "Figma", "Lottie"]
    },
    {
      icon: "server",
      title: "服务端与数据",
      desc: "把业务抽象成清晰的数据流",
      bars: [
        { name: "Node.js / NestJS", level: 86 },
        { name: "PostgreSQL / Redis", level: 80 },
        { name: "API 设计与建模", level: 85 }
      ],
      stack: ["Prisma", "GraphQL", "Docker", "Nginx", "Supabase", "WebSocket"]
    },
    {
      icon: "gauge",
      title: "工程化与质量",
      desc: "让交付可预期，让协作更轻",
      bars: [
        { name: "CI / CD", level: 84 },
        { name: "性能优化", level: 93 },
        { name: "测试与可观测性", level: 78 }
      ],
      stack: ["Turborepo", "Playwright", "Vitest", "Sentry", "Lighthouse", "GitHub Actions"]
    }
  ],

  projects: [
    {
      title: "Nebula Analytics",
      category: "产品",
      year: "2025",
      role: "前端负责人",
      featured: true,
      accent: ["#38bdf8", "#a78bfa"],
      desc: "面向增长团队的实时数据分析工作台，把多源指标汇聚成可探索的看板，支持百万级数据点的流畅渲染与协作标注。",
      tags: ["React", "TypeScript", "WebGL", "D3"],
      highlights: [
        "自研增量渲染管线，10 万点图表稳定 60fps",
        "设计指标 DSL 与查询缓存，平均查询耗时下降 68%",
        "以 Design Token 驱动 40+ 图表主题，交付周期缩短一半"
      ]
    },
    {
      title: "Flowform",
      category: "产品",
      year: "2024",
      role: "全栈开发",
      featured: true,
      accent: ["#5eead4", "#38bdf8"],
      desc: "无代码表单与审批流构建器。拖拽即得的数据模型、条件逻辑与多人协作，让业务团队自己就能把流程跑起来。",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Zod"],
      highlights: [
        "可视化流程编辑器，支持分支、并行与回退",
        "基于 CRDT 的多人在线协作，冲突自动合并",
        "权限模型细到字段级，覆盖 3 种企业角色"
      ]
    },
    {
      title: "Aurora UI",
      category: "开源",
      year: "2024",
      role: "作者 / 维护者",
      featured: false,
      accent: ["#a78bfa", "#f472b6"],
      desc: "面向中后台场景的开源设计系统，60+ 组件、完整 Token 体系与暗色主题，配套可交互文档。",
      tags: ["TypeScript", "Radix", "Storybook"],
      highlights: [
        "60+ 可访问组件，WCAG AA 对比度",
        "Token 分层：语义层与品牌层解耦",
        "文档站支持实时主题切换与代码预览"
      ]
    },
    {
      title: "Pulse Monitor",
      category: "开源",
      year: "2023",
      role: "独立开发",
      featured: false,
      accent: ["#fbbf24", "#f472b6"],
      desc: "轻量前端性能监控 SDK，采集 Core Web Vitals、长任务与错误堆栈，体积压缩后仅 3.2KB。",
      tags: ["TypeScript", "Web Vitals", "Rollup"],
      highlights: [
        "零依赖，gzip 后 3.2KB，支持按需加载",
        "基于 sendBeacon 的可靠上报与采样策略",
        "提供漏斗式性能归因面板"
      ]
    },
    {
      title: "墨迹 Inkline",
      category: "实验",
      year: "2023",
      role: "设计与开发",
      featured: false,
      accent: ["#60a5fa", "#22d3ee"],
      desc: "本地优先的 Markdown 笔记应用，数据全部留在浏览器里，支持双向链接、全文检索与离线安装。",
      tags: ["Vue 3", "IndexedDB", "PWA"],
      highlights: [
        "离线可用，PWA 安装后秒开",
        "基于倒排索引的本地全文检索",
        "Markdown 即时渲染与双向链接图谱"
      ]
    },
    {
      title: "Signal",
      category: "实验",
      year: "2022",
      role: "独立开发",
      featured: false,
      accent: ["#34d399", "#a3e635"],
      desc: "为远程团队设计的异步站会工具：用结构化卡片代替会议，把进度、阻塞与决策沉淀成可检索的记录。",
      tags: ["React", "Supabase", "Realtime"],
      highlights: [
        "每日站会模板，3 分钟完成填写",
        "阻塞项自动升级提醒",
        "周报自动汇总，支持导出 Markdown"
      ]
    }
  ],

  timeline: [
    {
      date: "2024 — 现在",
      title: "高级前端工程师",
      org: "星野科技 · 杭州",
      desc: "负责核心数据产品的前端架构与设计系统，推动性能预算与可访问性标准落地，带 4 人小组完成两代产品重构。",
      tags: ["设计系统", "性能", "团队"],
      now: true
    },
    {
      date: "2022 — 2024",
      title: "全栈工程师",
      org: "云栖实验室 · 上海",
      desc: "从 0 到 1 搭建面向企业的协作工具，负责前端架构、Node 服务与部署链路，产品服务 200+ 团队。",
      tags: ["0→1", "全栈", "架构"]
    },
    {
      date: "2020 — 2022",
      title: "前端工程师",
      org: "微光互动 · 杭州",
      desc: "参与多个品牌官网与互动营销项目，负责动效实现、移动端适配与首屏性能优化，拿过两次行业奖项。",
      tags: ["动效", "移动端", "品牌"]
    },
    {
      date: "2019 — 2020",
      title: "前端开发实习生",
      org: "矩阵工作室 · 远程",
      desc: "在小团队里完成从设计稿到上线的完整开发，养成对细节的偏执，也第一次把开源项目送进生产环境。",
      tags: ["实习", "开源"]
    },
    {
      date: "2016 — 2020",
      title: "计算机科学与技术 · 学士",
      org: "杭州 · 本科",
      desc: "主修 Web 技术与人机交互，毕业设计是基于力导向图的知识图谱可视化，图书馆的常驻人口。",
      tags: ["可视化", "HCI"]
    }
  ],

  contact: {
    title: "有想法？",
    titleAccent: "我们聊聊。",
    desc: "无论是产品从 0 到 1、设计系统落地，还是单纯想交流技术与设计，都欢迎写信给我。通常会在 24 小时内回复。",
    note: "目前接受远程合作与长期顾问项目"
  }
};
