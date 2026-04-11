# F3 Photo — Site Logo Overlay Tool

A simple web app that lets F3 members take or upload a photo and overlay their
workout site's logo onto it. Share the result straight to Slack, save it to your
camera roll, or send it anywhere.

**No accounts. No app store. No setup.** Just open the link and go.

---

## For PAX (Using the App)

1. Open the link your region shared with you
2. Tap your workout site from the list
3. Take a photo or upload one from your camera roll
4. Drag the logo to move it, pinch to resize it
5. Tap **Share** to post it to Slack, save to Photos, or send anywhere

**Add it to your home screen** for quick access — it works just like an app:
- **iPhone:** Open in Safari → tap the Share button → "Add to Home Screen"
- **Android:** Open in Chrome → tap the three-dot menu → "Add to Home screen"

---

## Setting This Up for Your Region

Everything runs in the browser. No server, no database, no build tools.
Fork this repo, customize it with your region's logos, and deploy.

### What's in the Repo

```
index.html            ← The app (this is what PAX use)
style.css             ← Styles
app.js                ← App logic (camera, canvas, sharing)
sites.json            ← Your workout sites + logos (built with admin.html)
admin.html            ← Local tool for managing sites.json (not hosted)
f3-enc-logo.png       ← Header logo (replace with your region's)
manifest.json         ← Home screen app name and icons
apple-touch-icon.png  ← iPhone home screen icon
icon-192.png          ← Android home screen icon
icon-512.png          ← Android splash screen icon
```

### Step 1: Fork the Repo

1. Click the **Fork** button at the top of this page
2. You now have your own copy to customize

### Step 2: Add Your Region's Logos

The `admin.html` file is a simple tool that builds your `sites.json`.
You run it on your computer — it never goes on your website.

1. Clone your fork to your computer
2. Open `admin.html` by double-clicking it (opens in your browser)
3. For a fresh setup, skip the "Load" step — just start adding sites
4. For each workout site: type the name, upload the logo PNG, click **Add Site**
5. Click **View** next to any site to preview the logo on a dark background
6. When you're done, click **Export** — this downloads your `sites.json`
7. Move the exported `sites.json` into your repo folder (replacing the
   starter one)

**Logo tips:**
- PNG with transparent background works best (shows clean on any photo)
- Square logos look the best
- Any size is fine — the app resizes automatically

### Step 3: Add Your Region's Branding

1. Replace `f3-enc-logo.png` with your region's logo (this shows in the
   header bar at the top of the app)
2. Replace the icon files with your logo on a dark background:
   - `apple-touch-icon.png` (180x180)
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)
3. Edit `manifest.json` and change the name if you want (defaults to
   "F3 Photo")

### Step 4: Deploy

**GitHub Pages (easiest if you forked the repo):**

1. Go to your fork's **Settings → Pages**
2. Set source to **GitHub Actions**
3. Push to main — your site will be live at `username.github.io/f3-logo-overlay`
4. Every push to main auto-deploys

The repo already includes the GitHub Pages workflow file, so it just works.

**Other free options:**

- **Netlify:** Go to [app.netlify.com/drop](https://app.netlify.com/drop),
  drag your folder in. Done.
- **Cloudflare Pages:** Create a free account → Workers & Pages → Create →
  Pages → Upload assets. Drag your files in. Done.
- **Existing website:** Create a folder (e.g. `/photo/`), upload all files.
  App lives at `yoursite.com/photo/`.

### Step 5: Share the Link

Send your PAX the URL. Tell them to add it to their home screen.
That's it.

---

## Updating Sites Later

When you need to add or remove a workout site:

1. Open `admin.html` on your computer
2. Load your current `sites.json` (from your repo folder)
3. Add or remove sites
4. Export the updated `sites.json`
5. Replace the old `sites.json` in your repo and push
6. Site updates automatically

---

## HTTPS Required for Camera

The camera feature only works over HTTPS (the padlock in the browser).
GitHub Pages, Netlify, and Cloudflare Pages all provide HTTPS automatically.

If someone can't access the camera, they can still use the **Upload** button
to pick a photo from their camera roll.

---

## License

This project is open source under the [MIT License](LICENSE). Use it, fork it,
modify it, share it — no permission needed. If your region builds something
cool with it, let us know.

---

## Questions?

This was built by **F3 Short Sale** (F3 ENC) and his AI assistant.

If your region sets it up and runs into issues, reach out:
- **Email:** f3shortsale@gmail.com
- **Phone/Text:** (252) 253-2200
