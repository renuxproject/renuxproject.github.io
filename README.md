# Renux Website

The official website of the [Renux Project](https://renuxproject.github.io),
a modern BSD operating system derived from the FreeBSD source tree with a
NetBSD-style `build.sh`.

## Structure

```
site/
├── index.html           # homepage
├── logo.svg             # Renux daemon logo
├── favicon.svg          # site favicon
├── LICENSE              # BSD-2-Clause (same license as the OS)
├── README.md
└── css/
    ├── base.css         # design tokens, dark/light themes, typography
    └── components.css   # layout components and responsive rules
```

## Development

Open `index.html` in a browser or serve the directory with any static server:

```sh
python3 -m http.server 8000
```

The color theme follows the system preference automatically
(`prefers-color-scheme`). There is no build step or dependency.

## Deployment

This repository is published with GitHub Pages from the `main` branch at
`https://renuxproject.github.io`.

## License

BSD-2-Clause, matching the Renux operating system. See `LICENSE`.
