# Renux Website

The website of the [Renux Project](https://renuxproject.github.io): one short
page in English, Portuguese and Spanish, and one stylesheet.

```
index.html       English
pt/index.html    Portuguese
es/index.html    Spanish
css/site.css     the only stylesheet
logos/           the Renux logo (main-logo.svg) and its PNG versions
favicon.svg
```

## Keeping it simple

- The site says what changes rarely: what Renux is, how to build it, its
  principles and its links.  What changes often (what builds, what comes
  next) is in the [README of the source](https://github.com/renuxproject/renux#readme),
  and the site links to it.
- The three pages have the same structure: a change to one is made to the
  other two.
- No JavaScript, no build step and nothing from other sites: the pages work
  opened straight from the disk.  The theme follows the system's (light or
  dark).

Open `index.html` in a browser to see a change.

## Deployment

GitHub Pages publishes the `main` branch at <https://renuxproject.github.io>.

## License

Mozilla Public License 2.0, as Renux's own work: see [`LICENSE`](LICENSE).
