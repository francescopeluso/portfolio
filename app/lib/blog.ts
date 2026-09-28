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

export interface Post extends PostMeta {
  html: string;
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
    html: marked.parse(content, { async: false }),
  };
}
