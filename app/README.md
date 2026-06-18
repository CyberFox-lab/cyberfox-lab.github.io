# AI_WORKER

个人技术与作品集博客，包含文章、项目作品集和每日 AI 热点栏目。

## 唯一工作目录

以后整个项目只放在这个仓库目录下：

```text
E:\project\cyberfox-lab.github.io
```

源码和文章在：

```text
E:\project\cyberfox-lab.github.io\app
```

## 本地开发

```powershell
cd E:\project\cyberfox-lab.github.io
cd app
npm install
npm run dev
```

本地预览地址：

```text
http://127.0.0.1:5173/
```

## 写新文章

在这里新建 `.md` 文件：

```text
E:\project\cyberfox-lab.github.io\app\src\content\posts
```

文章格式参考：

```md
---
slug: my-new-article
title: 我的新文章标题
summary: 首页和列表里显示的摘要。
category: AI 应用
tags: AI 应用, 工程实践
date: 2026-06-18
read: 阅读 6 分钟
deck: 文章详情页标题下方的导语。
source: 作者笔记
---

## 第一节标题

这里写正文。
```

## 写每日 AI 热点

在这里新建 `.md` 文件：

```text
E:\project\cyberfox-lab.github.io\app\src\content\daily-ai
```

格式参考：

```md
---
slug: 06-18
date: 2026-06-18
title: 今日 AI 热点标题
summary: 今日热点摘要。
---

## 模型发布

第一条热点正文。

来源：来源名称

链接：https://example.com/article
```

## 发布到 GitHub Pages

写完文章后运行：

```powershell
cd E:\project\cyberfox-lab.github.io
.\publish.ps1 "Add new post"
```

也可以使用：

```powershell
npm run publish -- "Add new post"
```

线上地址：

https://cyberfox-lab.github.io/
