# Renux Website

The website of the [Renux Project](https://renuxproject.github.io): three
pages, with a menu, in English, Portuguese and Spanish, and one stylesheet.

```
index.html          Home: what Renux is, how to build it, its principles
screenshots.html    Screenshots of the installer and the installed system
download.html       Download: the nightly build, and Renux 0.1 "Aurora"
pt/                 the same pages in Portuguese
es/                 the same pages in Spanish
css/site.css        the only stylesheet
screenshots/        the screenshots (PNG, 1280x800, from QEMU)
banners/            the banners of the nightly builds and of Aurora, from
                    the source's .github/nightly and .github/release
logos/              the Renux logo (main-logo.svg) and its PNG versions
favicon.svg
```

## Keeping it simple

- The site says what changes rarely: what Renux is, how to build it, its
  principles and its links.  What changes often (what builds, what comes
  next) is in the [README of the source](https://github.com/renuxproject/renux#readme),
  and the site links to it.
- Each page has the same structure in the three languages: a change to one
  is made to the other two.
- No JavaScript, no build step and nothing from other sites: the pages work
  opened straight from the disk.  The theme follows the system's (light or
  dark).

Open `index.html` in a browser to see a change.

## Deployment

GitHub Pages publishes the `main` branch at <https://renuxproject.github.io>.

## License

Mozilla Public License 2.0, as Renux's own work: see [`LICENSE`](LICENSE).
