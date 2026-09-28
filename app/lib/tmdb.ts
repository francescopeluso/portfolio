export async function getPoster(title: string, year: string): Promise<string | null> {
  const key = process.env.TMDB_API_KEY;
  if (!key) return null;
  try {
    const query = new URLSearchParams({ api_key: key, query: title, ...(year ? { year } : {}) });
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?${query}`);
    if (!response.ok) return null;
    const data = await response.json() as { results?: { poster_path?: string }[] };
    const path = data.results?.[0]?.poster_path;
    return path ? `https://image.tmdb.org/t/p/w342${path}` : null;
  } catch {
    return null;
  }
}
