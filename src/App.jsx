import { useEffect, useMemo, useState } from "react";
import { posts } from "./content/posts";


const projects = [
  {
    slug: "ai-daily-digest",
    name: "ai-daily-digest",
    desc: "每日 AI 热点采集、分类、摘要和静态页生成工具。",
    lang: "TypeScript",
    stars: 128,
    status: "维护中",
    url: "https://github.com/CyberFox-lab/cyberfox-lab.github.io",
    details: [
      "将新闻源、摘要、分类和站点发布拆成稳定流程。",
      "适合后续接入 RSS、人工审核和 GitHub Actions 自动提交。",
    ],
  },
  {
    slug: "prompt-lab-notes",
    name: "prompt-lab-notes",
    desc: "面向真实产品场景的 prompt 实验记录与评估模板。",
    lang: "Markdown",
    stars: 86,
    status: "文档优先",
    url: "https://github.com/CyberFox-lab/cyberfox-lab.github.io",
    details: [
      "记录 prompt 版本、输入样本、输出质量和人工判断。",
      "让 AI 产品实验从感觉驱动变成证据驱动。",
    ],
  },
  {
    slug: "portfolio-site-kit",
    name: "portfolio-site-kit",
    desc: "适合 GitHub Pages 的个人技术博客与作品集 starter。",
    lang: "React",
    stars: 214,
    status: "可复用",
    url: "https://github.com/CyberFox-lab/cyberfox-lab.github.io",
    details: [
      "包含首页、文章详情、每日热点、项目详情、归档和标签页。",
      "保持静态部署友好，不依赖服务端路由。",
    ],
  },
];

const hotspotByDate = {
  "06-17": {
    title: "前沿模型发布进入政策敏感区",
    summary:
      "今天的 AI 热点集中在 Anthropic 模型管制争议：能力、开放、商业化和国家安全正在撞到一起。",
    items: [
      {
        type: "政策监管",
        text: "Anthropic 前沿模型管制争议继续发酵，AI 发布节奏开始受到出口控制与国家安全框架影响。",
        source: "The Guardian",
        url: "https://www.theguardian.com/commentisfree/2026/jun/16/anthropic-fable-ai",
      },
      {
        type: "产业观察",
        text: "企业采购 AI 服务时，除了能力和价格，也要重新评估模型可用性、地区限制和供应连续性。",
        source: "Axios",
        url: "https://www.axios.com/2026/06/16/ai-anthropic-export-controls",
      },
      {
        type: "产品启发",
        text: "越强的 agent 能力越需要发布前的分级访问、审计日志、回滚机制和用户侧风险提示。",
        source: "Business Insider",
        url: "https://www.businessinsider.com/anthropic-ai-safety-protocols-white-house-mythos-fable-2026-6",
      },
    ],
  },
  "06-16": {
    title: "开发工具继续前置 AI 规划能力",
    summary: "代码工具正在从补全走向任务规划、审查和批量评测。",
    items: [
      { type: "产品更新", text: "主流开发工具继续把任务规划和代码审查前置。", source: "行业观察", url: "#" },
      { type: "开源项目", text: "本地推理 UI 新增批量评测视图。", source: "开源社区", url: "#" },
      { type: "研究论文", text: "关于 RAG 记忆压缩的实验报告获得关注。", source: "论文速读", url: "#" },
    ],
  },
  "06-15": {
    title: "语音、多模态和静态发布工具升温",
    summary: "本地 AI 工作流正在更靠近内容生产和个人发布场景。",
    items: [
      { type: "模型发布", text: "语音到语音模型优化低延迟对话场景。", source: "模型观察", url: "#" },
      { type: "产品更新", text: "AI 笔记应用开始强调可引用来源和版本历史。", source: "产品观察", url: "#" },
      { type: "开源项目", text: "一个 Markdown 到站点生成器发布 GitHub Actions 模板。", source: "GitHub", url: "#" },
    ],
  },
};

const dates = Object.keys(hotspotByDate);

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "/");

  useEffect(() => {
    const handleHash = () => {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return route;
}

function goTo(path) {
  window.location.hash = path;
}

function routeInfo(route) {
  const cleanRoute = route.replace(/^#/, "") || "/";
  const parts = cleanRoute.split("/").filter(Boolean);
  return {
    name: parts[0] || "home",
    slug: decodeURIComponent(parts[1] || ""),
  };
}

function sectionId(heading) {
  return `section-${heading.replace(/\s+/g, "-")}`;
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Header() {
  const nav = [
    ["文章", "/archive"],
    ["项目", "/projects"],
    ["每日 AI 热点", "/daily-ai/06-17"],
    ["关于", "/about"],
  ];

  return (
    <header className="site-header">
      <button className="brand brand-button" type="button" onClick={() => goTo("/")} aria-label="ai_worker 首页">
        <span className="brand-mark">AI</span>
        <span>
          <strong>AI_WORKER</strong>
          <small>AI Product Notes</small>
        </span>
      </button>

      <nav className="nav" aria-label="主导航">
        {nav.map(([label, path]) => (
          <button key={path} type="button" onClick={() => goTo(path)}>
            {label}
          </button>
        ))}
      </nav>

    </header>
  );
}

function MetaRow({ post }) {
  return (
    <p className="meta-row">
      <span>{post.category}</span>
      <span>{post.date}</span>
      <span>{post.read}</span>
    </p>
  );
}

function DailyHotspots({ activeDate, setActiveDate }) {
  const day = hotspotByDate[activeDate];

  return (
    <section id="daily-ai" className="daily-strip" aria-labelledby="daily-title">
      <div className="daily-head">
        <div>
          <p className="section-kicker">Daily AI</p>
          <h2 id="daily-title">每日 AI 热点</h2>
        </div>
        <div className="date-tabs" role="tablist" aria-label="选择日期">
          {dates.map((date) => (
            <button
              key={date}
              type="button"
              className={activeDate === date ? "active" : ""}
              onClick={() => setActiveDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      <div className="hotspot-grid">
        {day.items.map((item) => (
          <article className="hotspot-item" key={`${activeDate}-${item.type}`}>
            <span>{item.type}</span>
            <p>{item.text}</p>
            <button type="button" onClick={() => goTo(`/daily-ai/${activeDate}`)}>
              查看详情
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArticleList({ posts }) {
  return (
    <section id="articles" className="article-list" aria-labelledby="article-title">
      <div className="section-heading">
        <p className="section-kicker">Writing</p>
        <h2 id="article-title">个人博客</h2>
      </div>
      {posts.length > 0 ? (
        posts.map((post) => <ArticleRow post={post} key={post.slug} />)
      ) : (
        <div className="empty-state">
          <h3>没有匹配的文章</h3>
          <p>换一个关键词，或切回「全部」主题继续浏览。</p>
        </div>
      )}
    </section>
  );
}

function ArticleRow({ post }) {
  return (
    <article className="article-row">
      <button type="button" className="article-link" onClick={() => goTo(`/posts/${post.slug}`)}>
        <MetaRow post={post} />
        <h3>{post.title}</h3>
        <p>{post.summary}</p>
      </button>
      <button type="button" className="read-link" onClick={() => goTo(`/posts/${post.slug}`)}>
        阅读全文
      </button>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <button type="button" onClick={() => goTo(`/projects/${project.slug}`)}>
        <div className="project-top">
          <h3>{project.name}</h3>
          <span>{project.status}</span>
        </div>
        <p>{project.desc}</p>
        <div className="project-meta">
          <span className={`lang ${project.lang.toLowerCase()}`}></span>
          <span>{project.lang}</span>
          <span>{project.stars} stars</span>
        </div>
      </button>
    </article>
  );
}

function HomePage({ query, setQuery, activeDate, setActiveDate, filteredPosts }) {
  return (
    <>
      <section className="masthead" aria-labelledby="site-title">
        <div className="masthead-copy">
          <p className="date-line">最近更新 · 2026 年 6 月 17 日</p>
          <h1 id="site-title">写给工程实践者的 AI 产品化笔记。</h1>
          <p className="lead">
            这里记录 AI 应用、前端架构、工具链调试和产品设计复盘。文章像工程日志一样具体，也像专栏一样保持观点。
          </p>
        </div>

        <aside className="author-panel" id="about" aria-label="作者信息">
          <p className="section-kicker">About</p>
          <h2>独立开发者 / AI 产品观察者</h2>
          <p>
            关注从模型能力到真实工作流的落地路径，偏爱可复现的实验、清晰的信息架构和能长期维护的工具。
          </p>
          <div className="author-stats">
            <span>{posts.length} 篇文章</span>
            <span>{projects.length} 个项目</span>
            <span>每日更新</span>
          </div>
        </aside>
      </section>

      <div className="search-panel" aria-label="站内检索">
        <div className="search-wrap">
          <label htmlFor="search">搜索文章、项目或标签</label>
          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索文章、项目或标签"
          />
        </div>
      </div>

      <DailyHotspots activeDate={activeDate} setActiveDate={setActiveDate} />

      <ArticleList posts={filteredPosts} />

      <section id="projects" className="projects" aria-labelledby="project-title">
        <div className="section-heading">
          <p className="section-kicker">Portfolio</p>
          <h2 id="project-title">精选项目</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </section>
    </>
  );
}

function ArticlePage({ post }) {
  if (!post) return <NotFound />;
  const postIndex = posts.findIndex((item) => item.slug === post.slug);
  const previous = posts[postIndex + 1];
  const next = posts[postIndex - 1];

  return (
    <article className="detail-page">
      <button className="back-link" type="button" onClick={() => goTo("/")}>
        返回首页
      </button>
      <header className="article-hero">
        <MetaRow post={post} />
        <h1>{post.title}</h1>
        <p>{post.deck}</p>
        <div className="tag-list detail-tags">
          {post.tags.map((tag) => (
            <button type="button" key={tag} onClick={() => goTo(`/tags/${encodeURIComponent(tag)}`)}>
              {tag}
            </button>
          ))}
        </div>
      </header>

      <div className="reader-layout">
        <aside className="toc" aria-label="文章目录">
          <p className="section-kicker">Contents</p>
          {post.body.map((section) => (
            <button type="button" key={section.heading} onClick={() => scrollToSection(sectionId(section.heading))}>
              {section.heading}
            </button>
          ))}
        </aside>
        <div className="article-body">
          {post.body.map((section) => (
            <section key={section.heading} id={sectionId(section.heading)}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <div className="article-source">
            <strong>参考来源：</strong>
            <span>{post.source || "作者笔记"}</span>
          </div>
        </div>
      </div>

      <nav className="post-nav" aria-label="文章切换">
        {previous ? (
          <button type="button" onClick={() => goTo(`/posts/${previous.slug}`)}>
            上一篇：{previous.title}
          </button>
        ) : (
          <span></span>
        )}
        {next ? (
          <button type="button" onClick={() => goTo(`/posts/${next.slug}`)}>
            下一篇：{next.title}
          </button>
        ) : (
          <span></span>
        )}
      </nav>
    </article>
  );
}

function DailyPage({ date }) {
  const day = hotspotByDate[date] || hotspotByDate[dates[0]];
  const resolvedDate = hotspotByDate[date] ? date : dates[0];
  const resolvedIndex = dates.indexOf(resolvedDate);
  const previousDate = dates[resolvedIndex + 1];
  const nextDate = dates[resolvedIndex - 1];
  const dailySections = day.items.map((item) => ({
    heading: item.type,
    paragraphs: [
      item.text,
      `来源：${item.source}`,
    ],
    url: item.url,
  }));

  return (
    <article className="detail-page">
      <button className="back-link" type="button" onClick={() => goTo("/")}>
        返回首页
      </button>
      <header className="article-hero">
        <p className="section-kicker">Daily AI · {resolvedDate}</p>
        <h1>{day.title}</h1>
        <p>{day.summary}</p>
        <div className="date-tabs detail-date-tabs" aria-label="选择日期">
          {dates.map((itemDate) => (
            <button
              className={itemDate === resolvedDate ? "active" : ""}
              type="button"
              key={itemDate}
              onClick={() => goTo(`/daily-ai/${itemDate}`)}
            >
              {itemDate}
            </button>
          ))}
        </div>
      </header>

      <div className="reader-layout">
        <aside className="toc" aria-label="每日 AI 目录">
          <p className="section-kicker">Contents</p>
          {dailySections.map((section) => (
            <button type="button" key={section.heading} onClick={() => scrollToSection(sectionId(section.heading))}>
              {section.heading}
            </button>
          ))}
        </aside>
        <div className="article-body">
          {dailySections.map((section) => (
            <section key={section.heading} id={sectionId(section.heading)}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.url !== "#" && (
                <a href={section.url} target="_blank" rel="noreferrer">
                  查看原文
                </a>
              )}
            </section>
          ))}
          <div className="article-source">
            <strong>日期：</strong>
            <span>{resolvedDate}</span>
          </div>
        </div>
      </div>

      <nav className="post-nav" aria-label="每日 AI 日期切换">
        {previousDate ? (
          <button type="button" onClick={() => goTo(`/daily-ai/${previousDate}`)}>
            前一天：{previousDate}
          </button>
        ) : (
          <span></span>
        )}
        {nextDate ? (
          <button type="button" onClick={() => goTo(`/daily-ai/${nextDate}`)}>
            后一天：{nextDate}
          </button>
        ) : (
          <span></span>
        )}
      </nav>
    </article>
  );
}

function ArchivePage() {
  return (
    <section className="detail-page">
      <header className="list-hero">
        <p className="section-kicker">Archive</p>
        <h1>文章归档</h1>
        <p>按时间浏览全部文章，适合回看某个阶段的技术笔记和产品观察。</p>
      </header>
      <ArticleList posts={posts} />
    </section>
  );
}

function TagPage({ tag }) {
  const matched = posts.filter((post) => post.tags.includes(tag) || post.category === tag);
  return (
    <section className="detail-page">
      <header className="list-hero">
        <p className="section-kicker">Tag</p>
        <h1>{tag || "标签"}</h1>
        <p>当前主题下共有 {matched.length} 篇文章。</p>
      </header>
      <ArticleList posts={matched} />
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="detail-page">
      <header className="list-hero">
        <p className="section-kicker">Portfolio</p>
        <h1>项目作品集</h1>
        <p>把文章里的思考落到可复用工具、站点模板和实验记录里。</p>
      </header>
      <div className="project-grid expanded">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}

function ProjectPage({ project }) {
  if (!project) return <NotFound />;
  return (
    <section className="detail-page">
      <button className="back-link" type="button" onClick={() => goTo("/projects")}>
        返回项目
      </button>
      <header className="article-hero">
        <p className="section-kicker">{project.lang} · {project.status}</p>
        <h1>{project.name}</h1>
        <p>{project.desc}</p>
      </header>
      <div className="project-detail">
        {project.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
        <a href={project.url} target="_blank" rel="noreferrer">
          打开 GitHub 仓库
        </a>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="detail-page">
      <header className="article-hero">
        <p className="section-kicker">About</p>
        <h1>关于技术手记</h1>
        <p>
          这是一个个人技术与作品集博客，关注 AI 应用、工程实践、前端架构和产品设计。
        </p>
      </header>
      <div className="article-body single-column">
        <section>
          <h2>写作方向</h2>
          <p>
            我会把每日 AI 热点沉淀成可追踪的观察，把工程实践整理成可复用的判断，也把项目作品放在同一个站点里，方便长期维护。
          </p>
        </section>
        <section>
          <h2>发布方式</h2>
          <p>
            站点采用轻量静态构建，所有页面都可以直接分享，适合从个人博客逐步演进成完整知识库。
          </p>
        </section>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="detail-page">
      <header className="list-hero">
        <p className="section-kicker">404</p>
        <h1>没有找到这个页面</h1>
        <p>可能是链接已经变化，或内容还没有发布。</p>
        <button type="button" onClick={() => goTo("/")}>
          回到首页
        </button>
      </header>
    </section>
  );
}

export function App() {
  const [query, setQuery] = useState("");
  const [activeDate, setActiveDate] = useState("06-17");
  const route = useHashRoute();
  const current = routeInfo(route);
  const [readingProgress, setReadingProgress] = useState(0);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const text = `${post.title} ${post.summary} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
      return !normalized || text.includes(normalized);
    });
  }, [query]);

  const content = (() => {
    if (current.name === "home") {
      return (
        <HomePage
          query={query}
          setQuery={setQuery}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          filteredPosts={filteredPosts}
        />
      );
    }
    if (current.name === "posts") return <ArticlePage post={posts.find((post) => post.slug === current.slug)} />;
    if (current.name === "daily-ai") return <DailyPage date={current.slug} />;
    if (current.name === "archive") return <ArchivePage />;
    if (current.name === "tags") return <TagPage tag={current.slug} />;
    if (current.name === "projects" && current.slug) {
      return <ProjectPage project={projects.find((project) => project.slug === current.slug)} />;
    }
    if (current.name === "projects") return <ProjectsPage />;
    if (current.name === "about") return <AboutPage />;
    return <NotFound />;
  })();

  useEffect(() => {
    const labels = {
      home: "技术手记｜个人技术与作品集博客",
      archive: "文章归档｜技术手记",
      "daily-ai": "每日 AI 热点｜技术手记",
      tags: `${current.slug || "标签"}｜技术手记`,
      projects: current.slug ? `${current.slug}｜项目｜技术手记` : "项目作品集｜技术手记",
      about: "关于｜技术手记",
      posts: `${posts.find((post) => post.slug === current.slug)?.title || "文章"}｜技术手记`,
    };
    document.title = labels[current.name] || "技术手记";
  }, [current.name, current.slug]);

  useEffect(() => {
    const updateProgress = () => {
      if (current.name !== "posts") {
        setReadingProgress(0);
        return;
      }
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [current.name, current.slug]);

  return (
    <div className="app" id="top">
      <div className="reading-progress" style={{ transform: `scaleX(${readingProgress / 100})` }} />
      <Header />

      <main>{content}</main>

      <footer className="footer">
        <span>© 2026 技术手记</span>
        <span>专注 AI 产品化、工程实践与长期写作</span>
      </footer>
    </div>
  );
}

