# Ingars Neija / QvarcY Portfolio

Source code for the personal portfolio at:

https://kas.id.lv/portfolio/

## Stack

- static HTML
- CSS
- vanilla JavaScript
- Latvian and English versions
- GitHub Actions

## Open-source contributions

Merged pull requests to projects owned by others are collected from GitHub using:

`author:QvarcY is:pr is:merged -user:QvarcY`

The data is stored in `data/contributions.json` and refreshed automatically every 12 hours.

## Local preview

```powershell
py -m http.server 8080
```

Then open:

`http://localhost:8080/`

## Structure

- `index.html` — Latvian portfolio
- `en/index.html` — English portfolio
- `assets/` — styles, scripts and images
- `data/contributions.json` — generated contribution data
- `scripts/sync-contributions.mjs` — GitHub contribution sync
- `.github/workflows/` — automation