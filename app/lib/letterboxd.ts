import fs from "fs";
import path from "path";

export interface Film {
  title: string;
  year: string;
  rating: number;
  date: string;
  link: string;
}

const CSV_PATH = path.join(process.cwd(), "content/letterboxd/ratings.csv");
const FEED_REVALIDATE_SECONDS = 3600;

function parseCsvRow(row: string): string[] {
  const fields: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (quoted) {
      if (char === '"' && row[i + 1] === '"') { current += '"'; i++; }
      else if (char === '"') quoted = false;
      else current += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { fields.push(current); current = ""; }
    else current += char;
  }
  fields.push(current);
  return fields;
}

function getExportedRatings(): Film[] {
  if (!fs.existsSync(CSV_PATH)) return [];
  const lines = fs.readFileSync(CSV_PATH, "utf-8").split(/\r?\n/).filter(Boolean);
  return lines.slice(1).map((line) => {
    const [date, title, year, link, rating] = parseCsvRow(line);
    return { date, title, year, link, rating: Number(rating) };
  }).filter((film) => film.title && !Number.isNaN(film.rating))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function readTag(item: string, tag: string): string {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = item.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

function parseFeed(xml: string): Film[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((match) => ({
      title: readTag(match[1], "letterboxd:filmTitle"),
      year: readTag(match[1], "letterboxd:filmYear"),
      rating: Number(readTag(match[1], "letterboxd:memberRating")),
      date: readTag(match[1], "letterboxd:watchedDate"),
      link: readTag(match[1], "link"),
    }))
    .filter((film) => film.title && film.date && film.link && film.rating > 0);
}

async function getRecentRatings(): Promise<Film[]> {
  const user = process.env.LETTERBOXD_USER?.trim();
  if (!user) return [];

  try {
    const response = await fetch(`https://letterboxd.com/${encodeURIComponent(user)}/rss/`, {
      headers: { "User-Agent": "Francesco Peluso portfolio" },
      next: { revalidate: FEED_REVALIDATE_SECONDS },
    });
    if (!response.ok) return [];
    return parseFeed(await response.text());
  } catch {
    return [];
  }
}

export async function getAllRatings(): Promise<Film[]> {
  const ratings = new Map<string, Film>();

  for (const film of getExportedRatings()) {
    ratings.set(`${film.title.toLocaleLowerCase()}\u0000${film.year}`, film);
  }
  for (const film of await getRecentRatings()) {
    ratings.set(`${film.title.toLocaleLowerCase()}\u0000${film.year}`, film);
  }

  return [...ratings.values()].sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function stars(rating: number): string {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
}
