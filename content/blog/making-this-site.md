---
title: "The making of this website"
date: "2026-09-24"
description: "The process of creating this website, from the initial idea to the final product."
---

## The Idea

Let's start at the beginning. Over the past few months, I've shipped a few different versions of this site. Each one taught me something: what felt right, what felt forced, and what I was still building just because I could.

This time, I wanted to make something with a little more room to breathe. Not just a portfolio or a collection of polished outcomes, but a place to share the process too: the ideas, experiments, lessons, some of my taste in terms of music and movies, and occasional chaos behind the work. A site that feels good to use, looks intentional, and does not become a chore to maintain a month from now.

If you have seen an earlier version of my portfolio, you may have noticed the plot twist: I moved from an exclusively dark, TUI/CLI-inspired interface to a cleaner hybrid light/dark theme. The old design had personality, but this one feels more open, more flexible, and more like where I am now.

<br/>

## The tech stack

Now for the fun nerdy bit. The site is built with [Next.js](https://nextjs.org/), which gives me server-side rendering and static generation without making everything complicated. [Tailwind CSS](https://tailwindcss.com/) handles the styling, so I can iterate quickly without losing track of the design system. Posts are written in Markdown, with [MDX](https://mdxjs.com/) letting me drop interactive React components into the writing when plain text is not enough. Tiny bit magical, honestly.

The whole thing is hosted on [Vercel](https://vercel.com/), and the source is public on [GitHub](https://github.com/francescopeluso/portfolio). Every push to `main` deploys automatically, which is both extremely convenient and a gentle reminder to make sure the build actually works before pushing. If something here helps you, feel free to borrow the approach (or the code).

<br/>

## Attributions

This site was not made entirely solo. I used AI tools as collaborators: to explore ideas, untangle bugs, question design decisions, and get unstuck. Mainly, I used Codex with the GPT-5.6 model family, along with Claude Sonnet 5.6 and open-weight models such as Kimi K3 and DeepSeek V4 (paying by usage, I'm still not rich enough to afford a DGX Spark to run these models).

That does not mean the tools made the site for me. The taste, choices, edits, and responsibility are still mine. But they helped me push further, especially with the topographic animations and some of the visuals. For me, that is the interesting part of this moment in technology: not replacing curiosity, but giving it more range.