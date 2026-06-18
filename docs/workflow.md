# 博客编写与发布流程

这个项目现在只使用一个工作目录：

```text
E:\project\cyberfox-lab.github.io
```

源码、本地开发和 Markdown 文章都在：

```text
E:\project\cyberfox-lab.github.io\app
```

线上 GitHub Pages 使用仓库根目录的 `index.html` 和 `assets\`。

## 目录说明

```text
E:\project\cyberfox-lab.github.io
├─ app\
│  ├─ src\
│  │  ├─ App.jsx                  # 页面结构、每日 AI 热点数据
│  │  ├─ styles.css               # 页面样式
│  │  └─ content\
│  │     ├─ posts.js              # Markdown 文章读取和解析
│  │     └─ posts\                # 个人博客文章 Markdown
│  ├─ package.json
│  └─ vite.config.mjs
├─ assets\                        # 构建后的线上资源
├─ index.html                     # 构建后的线上首页
├─ publish.ps1                    # 一键构建、提交、推送
└─ README.md
```

## 写个人博客文章

文章目录：

```text
E:\project\cyberfox-lab.github.io\app\src\content\posts
```

新建一个 `.md` 文件，例如：

```text
2026-06-18-my-new-article.md
```

文章模板：

```md
---
slug: my-new-article
title: 我的新文章标题
summary: 首页和文章列表里显示的摘要。
category: AI 应用
tags: AI 应用, 工程实践, 产品思考
date: 2026-06-18
read: 阅读 6 分钟
deck: 文章详情页标题下面的导语。
source: 作者笔记
---

## 第一节标题

这里写正文第一段。

这里写正文第二段。

## 第二节标题

继续写正文。
```

字段说明：

- `slug`：文章链接，例如 `#/posts/my-new-article`
- `title`：文章标题
- `summary`：首页和列表页摘要
- `category`：文章分类
- `tags`：标签，用英文逗号分隔
- `date`：发布日期
- `read`：阅读时长
- `deck`：文章详情页标题下方导语
- `source`：参考来源，默认可写 `作者笔记`
- `featured: true`：可选，表示主推文章，会排在更前面

正文规则：

- 用 `##` 写章节标题
- 每个 `##` 会自动出现在文章目录里
- 普通段落之间空一行

## 写每日 AI 热点

每日 AI 热点目前还在代码里维护，位置是：

```text
E:\project\cyberfox-lab.github.io\app\src\App.jsx
```

搜索：

```text
const hotspotByDate = {
```

新增一天的格式：

```jsx
"06-18": {
  title: "今天的热点标题",
  summary: "今天的热点总述。",
  items: [
    {
      type: "模型发布",
      text: "第一条热点内容。",
      source: "来源名称",
      url: "https://example.com/article",
    },
    {
      type: "产品更新",
      text: "第二条热点内容。",
      source: "来源名称",
      url: "https://example.com/article",
    },
    {
      type: "产业观察",
      text: "第三条热点内容。",
      source: "来源名称",
      url: "https://example.com/article",
    },
  ],
},
```

注意：

- 日期 key 目前使用 `MM-DD`，例如 `06-18`
- 新日期建议放在 `hotspotByDate` 最上方
- 首页和详情页会自动显示日期按钮
- `url` 暂时没有链接时可以写 `"#"`

## 本地预览

进入 app 目录：

```powershell
cd E:\project\cyberfox-lab.github.io\app
```

第一次使用或依赖缺失时：

```powershell
npm install
```

启动本地服务：

```powershell
npm run dev
```

打开：

```text
http://127.0.0.1:5173/
```

检查重点：

- 首页是否正常加载
- 个人博客文章数量是否正确
- 新文章能否点开
- 新文章目录是否正常
- 每日 AI 热点日期是否出现
- 每日 AI 详情页是否能打开

## 发布到 GitHub Pages

发布前确认你在仓库根目录：

```powershell
cd E:\project\cyberfox-lab.github.io
```

运行一键发布：

```powershell
.\publish.ps1 "Add new post"
```

脚本会自动做这些事：

1. 进入 `app`
2. 必要时安装依赖
3. 执行 `npm run build`
4. 把 `app\dist` 复制到仓库根目录
5. `git add`
6. `git commit`
7. `git push origin main`

如果没有任何改动，脚本会显示：

```text
No changes to publish.
```

线上地址：

```text
https://cyberfox-lab.github.io/
```

GitHub Pages 有时需要几十秒到几分钟刷新。

## 常用命令

本地预览：

```powershell
cd E:\project\cyberfox-lab.github.io\app
npm run dev
```

只构建不发布：

```powershell
cd E:\project\cyberfox-lab.github.io\app
npm run build
```

发布：

```powershell
cd E:\project\cyberfox-lab.github.io
.\publish.ps1 "Update blog"
```

查看 Git 状态：

```powershell
cd E:\project\cyberfox-lab.github.io
git status --short
```

## 推荐日常流程

1. 在 `app\src\content\posts` 写个人博客 Markdown
2. 如有每日热点，编辑 `app\src\App.jsx` 里的 `hotspotByDate`
3. 本地运行 `npm run dev` 预览
4. 浏览器确认没问题
5. 回到仓库根目录运行 `.\publish.ps1 "本次更新说明"`
6. 等 GitHub Pages 刷新
