# 写新文章

在这个目录中新建一个 `.md` 文件即可发布新文章。

文件名建议和 `slug` 一致，例如：

```text
my-new-article.md
```

文章格式：

```md
---
slug: my-new-article
title: 我的新文章标题
summary: 这是一句话摘要，会显示在列表页。
category: AI 应用
tags: AI 应用, 工程实践, 产品思考
date: 2026-06-18
read: 阅读 6 分钟
deck: 这是文章详情页标题下面的导语。
source: 作者笔记
---

## 第一节标题

第一段正文。

第二段正文。

## 第二节标题

继续写正文。
```

说明：

- `slug` 决定文章链接：`#/posts/my-new-article`
- `tags` 用英文逗号分隔
- `featured: true` 可把文章标为主推文章
- 正文里的二级标题 `##` 会自动生成文章目录
