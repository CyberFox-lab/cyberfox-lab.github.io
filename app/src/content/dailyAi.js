const dailyModules = import.meta.glob("./daily-ai/*.md", {
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

function parseDailyItems(content) {
  const items = [];
  let currentItem = null;
  let lines = [];

  const pushItem = () => {
    if (!currentItem) return;

    const textLines = [];
    let source = "作者整理";
    let url = "#";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("来源：")) {
        source = trimmed.replace("来源：", "").trim() || source;
      } else if (trimmed.startsWith("链接：")) {
        url = trimmed.replace("链接：", "").trim() || url;
      } else {
        textLines.push(trimmed);
      }
    }

    items.push({
      type: currentItem,
      text: textLines.join(" "),
      source,
      url,
    });

    lines = [];
  };

  for (const line of content.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      pushItem();
      currentItem = heading[1].trim();
      lines = [];
      continue;
    }
    lines.push(line);
  }

  pushItem();
  return items;
}

function parseDailyEntry(path, raw) {
  const { meta, content } = parseFrontmatter(raw);
  const fallbackSlug = path.split("/").pop().replace(/\.md$/, "").slice(5);

  return {
    slug: meta.slug || fallbackSlug,
    date: meta.date || "",
    title: meta.title || fallbackSlug,
    summary: meta.summary || "",
    items: parseDailyItems(content),
  };
}

export const dailyEntries = Object.entries(dailyModules)
  .filter(([path]) => !path.endsWith("/README.md"))
  .map(([path, raw]) => parseDailyEntry(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export const hotspotByDate = Object.fromEntries(dailyEntries.map((entry) => [entry.slug, entry]));

export const dates = dailyEntries.map((entry) => entry.slug);
