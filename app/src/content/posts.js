const postModules = import.meta.glob("./posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, content: raw };
  }

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    meta[key] = parseValue(value);
  }

  return { meta, content: match[2].trim() };
}

function parseBody(content) {
  const sections = [];
  let currentSection = null;
  let paragraphBuffer = [];

  const pushParagraph = () => {
    const paragraph = paragraphBuffer.join(" ").trim();
    if (paragraph && currentSection) {
      currentSection.paragraphs.push(paragraph);
    }
    paragraphBuffer = [];
  };

  for (const line of content.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      pushParagraph();
      currentSection = { heading: heading[1].trim(), paragraphs: [] };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection && line.trim()) {
      currentSection = { heading: "正文", paragraphs: [] };
      sections.push(currentSection);
    }

    if (!line.trim()) {
      pushParagraph();
      continue;
    }

    paragraphBuffer.push(line.trim());
  }

  pushParagraph();
  return sections;
}

function parsePost(path, raw) {
  const { meta, content } = parseFrontmatter(raw);
  const fallbackSlug = path.split("/").pop().replace(/\.md$/, "");

  return {
    slug: meta.slug || fallbackSlug,
    title: meta.title || fallbackSlug,
    summary: meta.summary || "",
    category: meta.category || "文章",
    tags: typeof meta.tags === "string" ? meta.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
    date: meta.date || "",
    read: meta.read || "阅读 5 分钟",
    featured: Boolean(meta.featured),
    source: meta.source || "作者笔记",
    deck: meta.deck || meta.summary || "",
    body: parseBody(content),
  };
}

export const posts = Object.entries(postModules)
  .filter(([path]) => !path.endsWith("/README.md"))
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.date.localeCompare(a.date);
  });
