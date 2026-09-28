export interface Vinyl {
  id: string;
  releaseId: number;
  title: string;
  artist: string;
  year: number | null;
  format: string;
  cover: string | null;
  link: string;
}

type DiscogsRelease = {
  instance_id: number;
  basic_information: {
    id: number;
    title: string;
    year?: number;
    cover_image?: string;
    artists?: { name: string }[];
    formats?: { name?: string; descriptions?: string[] }[];
  };
};

type DiscogsResponse = {
  pagination?: { page: number; pages: number };
  releases?: DiscogsRelease[];
};

const API = "https://api.discogs.com";

function cleanArtist(name: string): string {
  return name.replace(/ \(\d+\)$/, "");
}

function formatRelease(release: DiscogsRelease): Vinyl {
  const info = release.basic_information;
  const descriptions = info.formats?.flatMap((format) => format.descriptions ?? []) ?? [];
  const format = descriptions.filter((description) => description !== "Album").slice(0, 2).join(" · ")
    || info.formats?.[0]?.name
    || "Vinyl";
  const cover = info.cover_image && !info.cover_image.includes("spacer.gif") ? info.cover_image : null;
  return {
    id: `${info.id}-${release.instance_id}`,
    releaseId: info.id,
    title: info.title,
    artist: (info.artists ?? []).map((artist) => cleanArtist(artist.name)).join(", "),
    year: info.year || null,
    format,
    cover,
    link: `https://www.discogs.com/release/${info.id}`,
  };
}

export async function getVinylCollection(): Promise<Vinyl[]> {
  const username = process.env.DISCOGS_USER;
  const token = process.env.DISCOGS_TOKEN;
  if (!username || !token) return [];

  const releases: DiscogsRelease[] = [];
  try {
    let page = 1;
    let pages = 1;
    do {
      const query = new URLSearchParams({ page: String(page), per_page: "100", sort: "added", sort_order: "desc" });
      const response = await fetch(`${API}/users/${encodeURIComponent(username)}/collection/folders/0/releases?${query}`, {
        headers: {
          Authorization: `Discogs token=${token}`,
          "User-Agent": "FrancescoPelusoPortfolio/1.0",
        },
        next: { revalidate: 3600 },
      });
      if (!response.ok) return [];
      const data = await response.json() as DiscogsResponse;
      releases.push(...(data.releases ?? []));
      pages = Math.min(data.pagination?.pages ?? 1, 10);
      page += 1;
    } while (page <= pages);
    return releases.map(formatRelease);
  } catch {
    return [];
  }
}
