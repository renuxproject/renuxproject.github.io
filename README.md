# Renux Website

The official website of the [Renux Project](https://renuxproject.github.io),
a modern BSD operating system derived from the FreeBSD source tree with a
NetBSD-style `build.sh`.

## Principles

- **Simple and direct**: a few pages, no fluff.
- **No JavaScript**: the site works with JS disabled. A strict
  Content-Security-Policy (`script-src 'none'`) enforces this.
- **Privacy-respecting**: no tracking, no analytics, no external fonts or
  scripts. Links leave with `no-referrer`. All assets are served locally.

## Structure

```
site/
├── index.html           # homepage (English)
├── about.html           # about the project
├── get.html             # download and build instructions
├── documentation.html   # documentation, community and support
├── pt/                  # Portuguese (neutral) translations
├── es/                  # Spanish (neutral) translations
├── css/
│   ├── base.css         # design tokens, dark/light themes, typography
│   └── components.css   # layout components and responsive rules
├── favicon.svg          # site favicon
├── logo.svg             # Renux daemon logo
├── LICENSE              # BSD-2-Clause (same license as the OS)
└── README.md
```

The language is chosen manually via the selector in the header (EN / PT / ES);
there is no JavaScript, so no automatic browser-language detection.
`hreflang` alternate links are provided on every page.

## Development

Open `index.html` in a browser or serve the directory with any static server:

```sh
python3 -m http.server 8000
```

The color theme follows the system preference automatically
(`prefers-color-scheme`). There is no build step and no dependency.

## Deployment

This repository is published with GitHub Pages from the `main` branch at
`https://renuxproject.github.io`.

## License

BSD-2-Clause, matching the Renux operating system. See `LICENSE`.
