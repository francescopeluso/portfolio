import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { TopographicField } from "../components/TopographicField";
import { CoverFlow } from "../components/CoverFlow";
import { getAllRatings, stars } from "../lib/letterboxd";
import { getPoster } from "../lib/tmdb";
import { getRecentTracks } from "../lib/lastfm";
import { getVinylCollection } from "../lib/discogs";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Space",
  description: "Francesco Peluso's film ratings, recent music listens, vinyl collection, and personal favourites.",
  path: "/space",
});

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

export default async function SpacePage() {
  const [films, tracks, vinyls] = await Promise.all([getAllRatings(), getRecentTracks(), getVinylCollection()]);
  const posters = await Promise.all(films.map((film) => getPoster(film.title, film.year)));
  const filmItems = shuffle(films.map((film, index) => ({
    id: `${film.link}-${film.date}`,
    href: film.link,
    image: posters[index],
    imageAlt: `${film.title} poster`,
    title: film.title,
    subtitle: film.year,
    meta: stars(film.rating),
  })));
  const vinylItems = shuffle(vinyls.map((vinyl) => ({
    id: vinyl.id,
    href: vinyl.link,
    image: vinyl.cover,
    imageAlt: `${vinyl.artist} — ${vinyl.title} cover`,
    title: vinyl.title,
    subtitle: vinyl.artist,
    meta: [vinyl.year, vinyl.format].filter(Boolean).join(" · "),
  })));
  const profile = process.env.LETTERBOXD_USER ? `https://letterboxd.com/${process.env.LETTERBOXD_USER}/` : null;
  const lastfmProfile = process.env.LASTFM_USER ? `https://www.last.fm/user/${process.env.LASTFM_USER}` : null;
  const discogsProfile = process.env.DISCOGS_USER ? `https://www.discogs.com/user/${process.env.DISCOGS_USER}/collection` : null;
  return <PageLayout
    eyebrow="~/space"
    title="space"
    description={<>Films, music, and other favourites. Film ratings live on {profile ? <Link href={profile} target="_blank" rel="noreferrer">Letterboxd</Link> : "Letterboxd"}.</>}
  >
    <section className="space-section" aria-labelledby="films-title">
      <h2 id="films-title" className="space-title">films · {films.length > 0 ? `${films.length} ratings` : "ratings"}</h2>
      {films.length === 0
        ? <p className="lede">No ratings yet — export your data from letterboxd (settings → import &amp; export) and drop <code>ratings.csv</code> into <code>content/letterboxd/</code>.</p>
        : <CoverFlow
            label="Film ratings"
            shape="poster"
            items={filmItems}
          />}
      <p className="tmdb-credit">Poster data and images from <Link href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</Link>. This page uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </section>

    <TopographicField variant="space" className="space-field" />

    <section className="space-section" aria-labelledby="music-title">
      <h2 id="music-title" className="space-title">music · recent listens</h2>
      {tracks.length === 0
        ? <p className="lede">Music stats are not connected yet.</p>
        : <div className="recent-listens">
            {tracks.map((track, i) => <Link key={`${track.name}-${i}`} className="pt-row music-row" href={track.link} target="_blank" rel="noreferrer">
              <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="listen-copy"><h3>{track.name}</h3><p>{track.artist}</p></div>
              <span className="listen-date">{track.date}</span><span className="row-arrow">↗</span>
            </Link>)}
          </div>}
      {lastfmProfile && <p className="lastfm-credit">Listening data from <Link href={lastfmProfile} target="_blank" rel="noreferrer">Last.fm</Link>.</p>}
    </section>

    <section className="space-section" aria-labelledby="vinyls-title">
      <h2 id="vinyls-title" className="space-title">vinyls i own · {vinyls.length} records</h2>
      {vinyls.length === 0
        ? <p className="lede">The Discogs collection is not available yet.</p>
        : <CoverFlow
            label="Vinyl collection"
            shape="square"
            items={vinylItems}
          />}
      <p className="discogs-credit">{discogsProfile && <><Link href={discogsProfile} target="_blank" rel="noreferrer">Data provided by Discogs</Link>. </>}This application uses Discogs&apos; API but is not affiliated with, sponsored or endorsed by Discogs. Discogs is a trademark of Zink Media, LLC.</p>
    </section>
  </PageLayout>;
}
