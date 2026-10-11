import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import hljs from "highlight.js/lib/common";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

marked.use(
  markedKatex({ throwOnError: false }),
  {
    renderer: {
      code({ text, lang }) {
        const requestedLanguage = lang?.trim().split(/\s+/)[0] ?? "";
        const language = requestedLanguage && hljs.getLanguage(requestedLanguage) ? requestedLanguage : "plaintext";
        const highlighted = language === "plaintext"
          ? escapeHtml(text)
          : hljs.highlight(text, { language, ignoreIllegals: true }).value;
        const label = escapeHtml(requestedLanguage || "text");
        return `<pre data-language="${label}"><code class="hljs language-${language}">${highlighted}</code></pre>`;
      },
    },
  },
);

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface TocItem {
  id: string;
  text: string;
}

export interface Post extends PostMeta {
  html: string;
  toc: TocItem[];
}

function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&#39;/g, "'").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
    const base = text.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
    let id = base;
    for (let i = 2; used.has(id); i++) id = `${base}-${i}`;
    used.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8"));
      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title ?? filename,
        date: data.date ?? "",
        description: data.description ?? "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    ...addHeadingIds(marked.parse(content, { async: false })),
  };
}
