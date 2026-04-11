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

## For the Region's Site Q (Managing Logos)

Your region has a file called `sites.json` that contains all of your workout
site names and logos. You manage it with a simple tool called `admin.html`.

### Adding or Removing Sites

1. Download `admin.html` to your computer (don't put it on the website — it's
   a local tool)
2. Double-click it to open in your browser
3. Click "Load existing sites.json" and pick your current `sites.json` file
4. To **add a site**: type the name, upload the logo PNG, click "Add Site"
5. To **remove a site**: click the red "Remove" button next to it
6. Click **Export** to download your updated `sites.json`
7. Upload the new `sites.json` to your website (replacing the old one)

### Logo Tips

- Use PNG files with transparent backgrounds (they look best on photos)
- Square logos work best
- Any size works — the app will resize them automatically

---

## Setting This Up for Your Region

The whole app is just 5 files. Drop them onto any website and it works.

```
index.html          ← The app
style.css           ← How it looks
app.js              ← How it works
sites.json          ← Your sites and logos (you build this with admin.html)
f3-enc-logo.png     ← Your region's logo for the header
```

You'll also want these for the home screen icon:
```
manifest.json
apple-touch-icon.png
icon-192.png
icon-512.png
```

### Step 1: Get Your Files Ready

1. Download all the files from this repository
2. Replace `f3-enc-logo.png` with your region's logo
3. Replace the icon files (`apple-touch-icon.png`, `icon-192.png`,
   `icon-512.png`) with your logo on a dark background
4. Open `admin.html` on your computer and build your `sites.json` with
   your region's workout sites and logos
5. Edit `manifest.json` and change the name if you want (it says "F3 Photo"
   by default)

### Step 2: Put It on a Website

Pick whichever option works for you:

#### Option A: Cloudflare Pages (Free, Recommended)

1. Create a free account at [cloudflare.com](https://www.cloudflare.com)
2. Go to Workers & Pages → Create → Pages → Upload assets
3. Drag all your files in
4. Done — you'll get a URL like `your-project.pages.dev`

#### Option B: Netlify (Free)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your folder of files onto the page
3. Done — you'll get a URL like `random-name.netlify.app`
4. You can set a custom name in site settings

#### Option C: GitHub Pages (Free)

1. Create a GitHub account and a new repository
2. Upload all your files to the repository
3. Go to Settings → Pages → set source to "main" branch
4. Done — you'll get a URL like `username.github.io/repo-name`

#### Option D: Drop into an Existing Website

If your region already has a website (WordPress, Squarespace, etc.):

1. Create a new folder on your site (e.g., `/photo/`)
2. Upload all the files into that folder
3. The app will be at `yoursite.com/photo/`

For WordPress specifically: use a file manager plugin or FTP to upload
the files to a folder in your site's root directory.

### Important: HTTPS Required

The camera feature only works over HTTPS (the secure padlock in the browser).
All of the hosting options above provide HTTPS automatically. If you're
dropping files into an existing site, make sure your site already uses HTTPS.

If someone can't access the camera, they can still use the upload button
to pick a photo from their camera roll.

---

## Questions?

This was built for F3 ENC. If your region sets it up and runs into issues,
reach out to the PAX who shared it with you.
