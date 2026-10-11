---
title: "The making of this website"
date: "2026-09-24"
description: "How I built this site: stack, dotted animations, live data and AI help."
---

## The idea

This isn't my first attempt. Over the past few months I've shipped a few versions of this site, and each one taught me something about what felt right and what felt forced.

This time I wanted more than a shelf of polished outcomes: a place for ideas, experiments, things I got wrong, and some of my taste in music and movies. It also had to be something I won't hate maintaining in a month.

The older version was fully dark and TUI/CLI-inspired. It had personality, but it felt like a costume. This one is lighter, more open, and closer to where I'm at now.

<br/>

## The design

I wanted it to feel like a printed page that happens to run in a browser. Serif headlines (Instrument Serif), DM Mono for everything small, a warm monochrome palette, and thin rules between things instead of boxes and shadows. The type does the work, so I tried not to decorate.

The one exception is the dots. The topographic fields on the homepage are drawn on a plain canvas: a grid of points displaced by a moving height field, so it looks like contour lines slowly breathing. It's also an easy way to wreck performance, so there are some rules. It's capped at 30 fps, it only runs while it's actually on screen, and the dots are batched into a handful of layers by brightness, so a frame is a few fills instead of thousands. It also respects `prefers-reduced-motion`, because a background should never be the reason someone can't read the page.

<br/>

## The tech stack

It's [Next.js](https://nextjs.org/) with React and TypeScript, and I kept the dependency list short on purpose. The styling is one hand-written stylesheet, with no Tailwind and no UI kit. It's more work up front, but I know where every rule lives.

Posts (like this one) are just Markdown files in the repo. `gray-matter` reads the frontmatter, `marked` renders the body, [KaTeX](https://katex.org/) handles math and `highlight.js` does the code blocks. No MDX, no CMS. Writing a post means creating a file.

The Space page pulls from Last.fm, Letterboxd, Discogs and TMDB, with responses cached and revalidated about once an hour, so it stays fresh without hitting those APIs on every visit. The contact form hits a small API route that sends mail with Nodemailer, plus a hidden honeypot field to keep the bots out.

It's hosted on [Vercel](https://vercel.com/) and the source is public on [GitHub](https://github.com/francescopeluso/portfolio). Every push to `main` deploys automatically, which is convenient, as long as I check the build passes first. If anything here is useful, feel free to reuse the approach or the code.

<br/>

## What I'd do differently

I spent far too long tuning the dots. A few pixels of amplitude or a slightly different speed changes the feel of the page, and it eats evenings. Next time: layout and content first, animation last.

<br/>

## Attributions

I didn't build this alone. I used AI tools to explore ideas, untangle bugs and question design decisions. Mainly Codex with the GPT-5.6 model family, plus Claude Sonnet 5.6 and open-weight models like Kimi K3 and DeepSeek V4 (pay-per-use, I'm still not rich enough for a DGX Spark to run these locally).

The taste, the choices and the edits are mine, but the tools let me push further, especially on the topographic animations and some of the visuals.
