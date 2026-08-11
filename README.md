# Renux Website

The official website of the [Renux Project](https://renuxproject.github.io),
a modern BSD operating system derived from the FreeBSD source tree with a
NetBSD-style `build.sh`.

## Structure

```
site/
├── index.html           # homepage
├── about.html           # about the project
├── get.html             # download and build instructions
├── features.html        # feature overview
├── documentation.html   # documentation index
├── community.html       # community and development
├── support.html         # support and bug reporting
├── news.html            # news and announcements
├── development.html     # live commits (GitHub API)
├── feed.xml             # RSS feed for the news
├── logo.svg             # Renux daemon logo
├── favicon.svg          # site favicon
├── LICENSE              # BSD-2-Clause (same license as the OS)
├── README.md
├── css/
│   ├── base.css         # design tokens, dark/light themes, typography
│   └── components.css   # layout components and responsive rules
└── js/
    └── commits.js       # fetches the latest commits from the GitHub API
```

## Development

Open `index.html` in a browser or serve the directory with any static server:

```sh
python3 -m http.server 8000
```

The color theme follows the system preference automatically
(`prefers-color-scheme`). There is no build step or dependency.

## Live commits

The Development page (`development.html`) fetches the latest commits from
`https://api.github.com/repos/renuxproject/src/commits` via `js/commits.js`.
The repository is configurable with the `REPO` constant in that file. Results
are cached in `localStorage` for five minutes to respect the GitHub API rate
limit (60 requests/hour per IP unauthenticated).

## Deployment

This repository is published with GitHub Pages from the `main` branch at
`https://renuxproject.github.io`.

## License

BSD-2-Clause, matching the Renux operating system. See `LICENSE`.
