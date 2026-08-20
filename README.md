# YES株式会社 Corporate Site

Static corporate website for YES Ltd.

## Hosting

Served via GitHub Pages from the `main` branch root:

- **Live:** https://jaysoniglopas23.github.io/yesltd/

`.nojekyll` is present so GitHub serves the files as-is instead of running them
through Jekyll.

## Notes

- All asset paths are relative, so the site works both at a subpath and at a
  domain root.
- Canonical, `og:url`, and `sitemap.xml` entries point at `https://yesltd.jp/`,
  the intended production domain. Update these if the final domain changes.
- `.htaccess` applies only to Apache hosting and is ignored by GitHub Pages.
