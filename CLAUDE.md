---
name: f3-logo-overlay
description: Portable web app for F3 members to overlay workout site logos onto photos — pure static files, no backend
status: active
stage: building
tags: [f3, web-app, static, canvas-api, image-processing]
depends_on: []
input: Site logos (PNG), photos from camera/upload
output: Composited 1080px images with logo overlay
data_sources: [sites.json]
updated: 2026-04-11
---

# F3 Logo Overlay

## What This Is
A portable web app that lets F3 members take or upload a photo and overlay their workout site's logo onto it. Pure static files — no backend, no build step, no accounts.

## Tech Stack
- Pure HTML/CSS/JS (index.html, style.css, app.js, sites.json, admin.html)
- Canvas API for all image processing (client-side)
- Hosted on GitHub Pages

## Project Structure
```
index.html      — Main app (public-facing)
style.css       — All styles
app.js          — All app logic (Canvas API, drag/pinch, share)
sites.json      — Array of {name, logo (base64)} objects
admin.html      — Local-only utility for managing sites.json
```

## GitHub Pages
- Repo: sdjohnso/f3-logo-overlay (public)
- URL: https://sdjohnso.github.io/f3-logo-overlay/
- Auto-deploys on push to main

## Key Design Decisions
- Canvas output always 1080px wide, height preserves aspect ratio
- Logo default: 25% canvas width (270px), upper-left corner
- Mobile-first, white background, F3 dark blue/black accents
- Web Share API with download fallback
