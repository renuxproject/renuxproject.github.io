# Renux Website

The official website of the [Renux Project](https://renuxproject.github.io),
a modern BSD operating system derived from the FreeBSD source tree with a
Renux Build System (`renux`).

## Principles

- **Simple and direct**: a few pages, no fluff.
- **Minimal JavaScript**: the site is fully usable with JS disabled. A strict
  Content-Security-Policy keeps script and network use to a minimum. The only
  script is `geo-block.js`, which shows a regional availability notice (see
  below).
- **Privacy-respecting**: no tracking, no analytics, no external fonts or
  scripts. Links leave with `no-referrer`. All assets are served locally.

## Regional availability

`geo-block.js` performs a client-side IP geolocation lookup (`ipwho.is`). In
regions the project does not serve due to governmental requirements (currently
Brazil), the normal content is replaced with a notice explaining that Renux is
decentralized and that the source remains open. If the lookup fails, the site
loads normally. This is the only way to geo-restrict a static Pages site
without fronting it with infrastructure such as Cloudflare.

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
├── geo-block.js         # regional availability notice
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
