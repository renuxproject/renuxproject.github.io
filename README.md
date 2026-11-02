# Renux Website

The website of the [Renux Project](https://renuxproject.github.io): three
pages, with a menu, in English, Portuguese and Spanish.

GitHub Pages builds it with Jekyll, so every part of a page is written
once and shared by all the pages in all the languages.

```
index.html          Home: what Renux is, how to build it, its principles
screenshots.html    Screenshots, with a gallery that opens each one larger
download.html       Download: the nightly build, and Renux 0.1 "Aurora"
404.html            The page for an address that is not here
pt/  es/            the same pages in Portuguese and in Spanish

_layouts/default.html   the frame of every page
_includes/              the parts of a page:
  head.html               title, description, Open Graph, hreflang
  header.html             the name, the menu and the languages
  backdrop.html           the blurred screenshots at the top of every page
  hero.html               the top of the page, over the blurred screenshots
  hero-shot.html          the floating screenshot on the home page
  actions.html            a row of buttons
  terminal.html           commands, as the Renux console shows them
  screenshots.html        the screenshots, and the lightbox (CSS only)
  ground.html             the links and the footer
_data/                  what the pages share:
  i18n.yml                the menu, footer and gallery words, per language
  links.yml               every address the site points to
  screenshots.yml         the screenshots and their captions
  commands.yml            the commands shown on the site
css/site.scss           the stylesheet: it imports the modules of _sass/
_sass/                  one module per part: tokens, sky, masthead, hero,
                        buttons, sections, home, terminal, gallery,
                        download, ground, motion
fonts/                  STIX Two Text and Hanken Grotesk (SIL OFL)
screenshots/  banners/  logos/  favicon.svg
sitemap.xml  robots.txt
```

## Making a change

- **Text of a page**: in the page itself (its front matter holds the
  title, the line under it and the buttons).  Each page has the same
  structure in the three languages: a change to one is made to the other
  two.
- **Menu, footer, gallery words**: `_data/i18n.yml`.
- **A screenshot**: put the PNG in `screenshots/` and add it to
  `_data/screenshots.yml`; every gallery follows.  `backdrop: true` puts
  it, blurred, behind the top of the pages; `hero_shot:` in the home
  page's front matter picks the one that floats there.
- **A link**: `_data/links.yml`.
- **A colour or a measure**: `_sass/_tokens.scss`.
- **A new language**: add it to `languages` in `_config.yml` and to
  `_data/i18n.yml`, add its captions to `_data/screenshots.yml`, and copy
  the pages into its folder.

The site says what changes rarely: what Renux is, how to build it, its
principles and its links.  What changes often is in the
[README of the source](https://github.com/renuxproject/renux#readme).

No JavaScript and nothing from other sites: the fonts are served from
`fonts/`, and the theme follows the system's (light or dark).

## Interactivity without JavaScript

What a script would do, the site does with HTML and CSS alone, at build
time with Liquid (Jekyll) or in the browser:

| What                                   | How                                   | Where               |
|----------------------------------------|---------------------------------------|---------------------|
| Gallery: a picture opens larger, with previous/next | `:target`                | `_sass/_gallery`    |
| The menu on a phone                    | the `popover` attribute               | `_sass/_masthead`   |
| Fade from page to page, header in place | cross-document view transitions      | `_sass/_enhance`    |
| A reading bar; content rising into view | scroll-driven animations             | `_sass/_enhance`    |
| One click selects a whole command      | `user-select: all`                    | `_sass/_terminal`   |
| Menus, languages, galleries built from data | Liquid, when the site is built   | `_includes/`        |

Each one is an enhancement: a browser without it shows the site as it
is, and all of it stops moving when the system asks for less motion.

## Seeing it

```
bundle install
bundle exec jekyll serve
```

and open <http://localhost:4000>.

## Deployment

GitHub Pages publishes the `main` branch at <https://renuxproject.github.io>.

## License

Mozilla Public License 2.0, as Renux's own work: see [`LICENSE`](LICENSE).
The fonts are under the SIL Open Font License: see `fonts/OFL-*.txt`.
