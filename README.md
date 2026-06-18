# AI_WORKER

这是博客和 GitHub Pages 发布仓库。

## 目录约定

以后只使用这个目录：

```text
E:\project\cyberfox-lab.github.io
```

目录说明：

```text
E:\project\cyberfox-lab.github.io
├─ app\                  # 源码、Markdown 文章、本地开发项目
├─ assets\               # GitHub Pages 线上静态资源
├─ index.html            # GitHub Pages 线上首页
├─ .nojekyll
└─ publish.ps1           # 一键构建、提交、推送
```

## 写文章

在这里新建 Markdown 文件：

```text
E:\project\cyberfox-lab.github.io\app\src\content\posts
```

文章格式：

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

## 本地预览

```powershell
cd E:\project\cyberfox-lab.github.io\app
npm install
npm run dev
```

打开：

```text
http://127.0.0.1:5173/
```

## 发布

写完文章后在仓库根目录运行：

```powershell
cd E:\project\cyberfox-lab.github.io
.\publish.ps1 "Add new post"
```

线上地址：

https://cyberfox-lab.github.io/
