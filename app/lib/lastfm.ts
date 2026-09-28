export interface Track {
  name: string;
  artist: string;
  date: string;
  link: string;
}

export interface Artist {
  name: string;
  plays: string;
  link: string;
}

const API = "https://ws.audioscrobbler.com/2.0/";

async function call(method: string, extra: string): Promise<unknown> {
  const key = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USER;
  if (!key || !user) return null;
  try {
    const response = await fetch(`${API}?method=${method}&user=${user}&api_key=${key}&format=json${extra}`, { next: { revalidate: 3600 } });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function getRecentTracks(limit = 8): Promise<Track[]> {
  const data = await call("user.getrecenttracks", `&limit=${limit}`) as { recenttracks?: { track?: { name: string; artist: { "#text": string }; date?: { "#text": string }; url: string }[] } } | null;
  return (data?.recenttracks?.track ?? []).map((t) => ({ name: t.name, artist: t.artist["#text"], date: t.date?.["#text"] ?? "now playing", link: t.url }));
}

export async function getTopArtists(limit = 5): Promise<Artist[]> {
  const data = await call("user.gettopartists", `&period=1month&limit=${limit}`) as { topartists?: { artist?: { name: string; playcount: string; url: string }[] } } | null;
  return (data?.topartists?.artist ?? []).map((a) => ({ name: a.name, plays: a.playcount, link: a.url }));
}
