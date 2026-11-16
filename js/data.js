/* =============================================================
   站点内容配置 · 只改这一个文件就能换成你自己的作品集
   -------------------------------------------------------------
   1. profile  基本信息 / 首屏文案 / 社交链接
   2. stats    数字看板
   3. about    个人简介
   4. skills   技能分组（bars 为自评学习进度，note 为阶段说明）
   5. projects 项目作品（accent 决定封面渐变，link 为仓库地址）
   6. timeline 经历时间线
   7. marquee  首屏下方的滚动关键词
   ============================================================= */

window.SITE_DATA = {
  profile: {
    name: "凡尘逸事",
    latin: "FANCHEN YISHI",
    initials: "FY",
    role: "Python 学习者 / 开源爱好者",
    location: "抚州 · 中国",
    status: "正在学习 Python，欢迎交流",
    email: "cmsj33071@foxmail.com",
    heroTitle: "从第一行代码开始",
    heroTitleAccent: "把想法写成现实",
    heroDesc:
      "我是凡尘逸事，住在抚州。正在学 Python，也在用 HTML、CSS 和 JavaScript 做点小东西。\n这里记录我的项目、练习和还在生长的想法。",
    focus: "Python / Web / 开源",
    texts: {
      availableBadge: "开放交流"
    },
    socials: [
      { label: "GitHub", handle: "@cmsj33071", href: "https://github.com/cmsj33071", icon: "github" },
      { label: "Email", handle: "cmsj33071@foxmail.com", href: "mailto:cmsj33071@foxmail.com", icon: "mail" }
    ]
  },

  marquee: [
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "GitHub",
    "Markdown",
    "Automation",
    "Learning in Public",
    "Open Source"
  ],

  stats: [
    { value: 3, suffix: "", label: "个公开仓库" },
    { value: 1, suffix: "", label: "个上线作品" },
    { value: 2026, suffix: "", label: "年开始记录" }
  ],

  about: {
    paragraphs: [
      "我是凡尘逸事，住在抚州。现在主要在学 Python，也在用 HTML、CSS 和 JavaScript 做一些小东西。",
      "经历不算多，就把学过的东西、做过的实验和踩过的坑都放在这里。慢一点没关系，持续输出就好。"
    ],
    highlights: [
      { title: "正在学习", desc: "Python 基础、数据结构与自动化脚本" },
      { title: "动手实践", desc: "从静态页面到能运行的小工具" },
      { title: "开源记录", desc: "代码、练习与实验都放在 GitHub" },
      { title: "持续输出", desc: "把学习过程整理成可回看的内容" }
    ]
  },

  skills: [
    {
      icon: "code",
      title: "Python 基础",
      desc: "正在打牢语法与数据结构",
      bars: [
        { name: "Python 基础", level: 55, note: "进行中" },
        { name: "数据结构", level: 40, note: "入门" },
        { name: "文件与数据处理", level: 45, note: "练习中" }
      ],
      stack: ["Python", "pathlib", "json", "requests"]
    },
    {
      icon: "layout",
      title: "Web 基础",
      desc: "能把想法做成可访问的页面",
      bars: [
        { name: "HTML & CSS", level: 70, note: "能上手" },
        { name: "JavaScript", level: 50, note: "学习中" },
        { name: "响应式布局", level: 60, note: "练习中" }
      ],
      stack: ["HTML5", "CSS3", "JavaScript", "Git"]
    },
    {
      icon: "gauge",
      title: "开发工具",
      desc: "让写代码这件事更顺手",
      bars: [
        { name: "Git & GitHub", level: 55, note: "日常在用" },
        { name: "VS Code", level: 70, note: "日常在用" },
        { name: "Markdown", level: 75, note: "常用" }
      ],
      stack: ["Git", "GitHub", "VS Code", "PowerShell", "npm"]
    },
    {
      icon: "sparkles",
      title: "正在探索",
      desc: "下一步想学的东西",
      bars: [
        { name: "自动化脚本", level: 30, note: "想学" },
        { name: "数据分析", level: 25, note: "想学" },
        { name: "后端接口", level: 20, note: "想学" }
      ],
      stack: ["pandas", "FastAPI", "SQLite", "爬虫"]
    }
  ],

  projects: [
    {
      title: "DSH Session Manager",
      category: "开源",
      year: "2026",
      role: "作者 / 维护者",
      featured: false,
      accent: ["#34d399", "#22d3ee"],
      desc: "为 DSH 会话行菜单加上导出备份、归档与安全删除的开源插件。所有破坏性操作先预览再执行，删除只进回收站。",
      tags: ["JavaScript", "Node.js", "DSH"],
      highlights: [
        "预览令牌绑定目录 id、字节数与 revision，会话树一变即拒绝执行",
        "活动会话与跨进程写锁双重拦截，force 操作默认 10 秒超时",
        "删除改为移入回收站并保留 30 天，绝不 unlink，也不触碰共享附件",
        "五个测试套件、200+ 断言，零运行时依赖，客户端无构建步骤"
      ],
      link: "https://github.com/cmsj33071/dsh-plugin-session-manager"
    },
    {
      title: "App Packer",
      category: "工具",
      year: "2026",
      role: "作者 / 开发",
      featured: false,
      accent: ["#fbbf24", "#f472b6"],
      desc: "把任意前端项目打包成 Windows 免安装 exe 的图形化工具：选文件夹、填名字，点几下就出成品。",
      tags: ["Windows", "桌面工具", "Node.js"],
      highlights: [
        "图形化三步打包，不用命令行、不用改配置文件",
        "自动检测系统 Node.js，缺失时下载内置运行时",
        "同时提供便携版与安装版，安装版带快捷方式和卸载入口",
        "内置构建引擎与日志，首次初始化后再次打包秒进"
      ],
      link: "https://github.com/cmsj33071/app-packer"
    },
    {
      title: "Myhome",
      category: "实验",
      year: "2026",
      role: "设计与开发",
      featured: false,
      accent: ["#22d3ee", "#a78bfa"],
      desc: "你正在看的这个站点：无框架、无后端、无外部依赖的纯静态作品集，所有内容由单一数据文件驱动。",
      tags: ["HTML", "CSS", "JavaScript"],
      highlights: [
        "零依赖、约 130KB，双击 index.html 即可本地运行",
        "Canvas 粒子背景、滚动揭示、项目筛选与详情弹窗均为原生实现",
        "内容与视图分离，改 data.js 即可复用为任意个人站点",
        "适配 390–1920px，支持键盘操作与减少动效偏好"
      ],
      link: "https://github.com/cmsj33071/myhome"
    }
  ],

  timeline: [
    {
      date: "2026 — 现在",
      title: "学习 Python",
      org: "自学 · 抚州",
      desc: "从基础语法和数据结构开始，每天写一点；练习、笔记和小工具都会同步到 GitHub。",
      tags: ["Python", "自学", "进行中"],
      now: true
    },
    {
      date: "2026",
      title: "第一个开源插件",
      org: "DSH Session Manager",
      desc: "把日常使用中的需求做成插件：导出备份、归档与安全删除，所有破坏性操作先预览再执行。",
      tags: ["JavaScript", "Node.js", "开源"]
    },
    {
      date: "2026",
      title: "个人站点上线",
      org: "Myhome",
      desc: "从零手写 HTML、CSS 和 JavaScript，把项目与学习记录放进一个自己的角落，并部署到 GitHub Pages。",
      tags: ["HTML", "CSS", "GitHub Pages"]
    },
    {
      date: "2026",
      title: "一键打包工具",
      org: "App Packer",
      desc: "把前端项目打包成 Windows 免安装 exe，做成点点鼠标就能用的图形界面；同时提供便携版和安装版。",
      tags: ["Windows", "桌面工具", "发布"]
    },
    {
      date: "2025",
      title: "注册 GitHub",
      org: "cmsj33071",
      desc: "先注册了账号，偶尔上来看看；真正开始把东西放上去，是 2026 年的事。",
      tags: ["Git", "GitHub"]
    }
  ],

  contact: {
    title: "有想法？",
    titleAccent: "我们聊聊。",
    desc: "不管是在学 Python、做开源，还是想给这个站点提建议，都欢迎写信给我。",
    note: "目前以学习为主，开放交流与建议"
  }
};
