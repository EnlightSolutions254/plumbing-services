# Plumbing Services — Website

A complete, production-ready website for a premium plumbing company in Nairobi, Kenya. Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build tools. Just open `index.html` in a browser.

---

## 1. Project Structure

```
/plumbing-services
├── index.html          Homepage
├── about.html           About / company story
├── services.html        17 detailed services
├── emergency.html        24/7 emergency page + request form
├── testimonials.html      Reviews & ratings
├── contact.html          Contact form, hours, map
├── quote.html            Quotation request form
│
├── css/
│   ├── style.css        Core design system (colors, type, components)
│   ├── responsive.css    Breakpoints (laptop → mobile)
│   └── animations.css    Reveal/scroll/hover animations
│
├── js/
│   ├── navbar.js         Injects header, mobile menu & footer on every page
│   ├── main.js            Scroll reveals, counters, floating buttons, before/after slider
│   ├── gallery.js         Masonry gallery filtering + lightbox
│   ├── testimonials.js     Reviews carousel
│   ├── faq.js             FAQ accordion
│   └── quote.js           Form validation + success modal
│
├── images/               Placeholder SVG images (see section 3 below)
├── seo/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── schema.json       LocalBusiness / Plumber structured data (also embedded per-page)
└── README.md
```

**Note on architecture:** the header and footer are injected by `js/navbar.js` into the `<div id="site-header"></div>` and `<div id="site-footer"></div>` placeholders found near the top and bottom of every page. Edit navigation links, phone numbers or footer content **once** in `js/navbar.js` and it updates across all seven pages.

---

## 2. Quick Start

No installation needed.

1. Unzip the project.
2. Double-click `index.html` (or right-click → Open with → your browser).
3. Click through the site — all pages, forms and animations work locally.

---

## 3. Replacing Images

Every image slot on the site already points to a `.jpg` filename under `/images/` (e.g. `hero-plumber.jpg`, `bathroom-renovation.jpg`) — the HTML has been pre-wired for you. Right now those filenames hold placeholder graphics so nothing looks broken; to swap in real photos:

1. Source or take a real photograph at a similar aspect ratio (see sizes below).
2. Export/save it as a `.jpg` with **the exact same filename** as the placeholder it's replacing (e.g. your new photo must be named `hero-plumber.jpg`).
3. Drop it into the matching subfolder, overwriting the placeholder file.
4. That's it — no HTML edits needed, the page already references that exact path.
5. Compress images before uploading (tools like Squoosh or TinyPNG) to keep the site fast.

A full slot-by-slot list of filenames with suggested search terms for free stock photo sites is in `image-shopping-list.md` (provided alongside this project).

**Where the two hero images specifically render:**
- `images/hero/hero-plumber.jpg` — the large image on the right side of the **homepage hero** (`index.html`), with the "22 min avg. response" radar card floating over its bottom-left corner. It's also reused as the Open Graph / social-share preview image. Since the container crops to a tall 4:5 ratio on desktop (shifting to wider ratios on tablet/mobile), pick a vertical or centered shot — see `image-shopping-list.md` for exact minimum dimensions.
- `images/hero/hero-plumber-2.jpg` — the photo in the **About page's** "Our Story" section (`about.html`), next to the founding-story copy. This one crops to a 4:3 landscape box.

Recommended sizes:
- Hero image (homepage, `hero-plumber.jpg`): portrait-leaning, minimum ~1400×1750px
- Hero image (About page, `hero-plumber-2.jpg`): landscape, minimum ~1600×1200px
- Service card images: 800×600px
- Gallery images: 700×700px or 700×900px
- Team photos: 500×500px (square)

---

## 4. Changing the Phone Number / WhatsApp / Email

Phone numbers and WhatsApp links appear in multiple places. To update them everywhere at once:

1. Open `js/navbar.js` and edit the constants at the top:
   ```js
   const PHONE = "0793016084";
   const PHONE_ALT = "0731981336";
   const WHATSAPP = "254793016084"; // international format, no + or spaces
   const EMAIL = "sisuthelegend@gmail.com";
   ```
2. Open `js/main.js` and update the same `PHONE` / `WHATSAPP` constants near the top (used for the floating call/WhatsApp buttons).
3. For phone numbers written directly into page copy (e.g. the emergency page's alt line, or the contact page), use your editor's "Find in Files" for `0793016084` / `0731981336` and replace.

---

## 5. Changing Colors

All colors are defined as CSS custom properties at the top of `css/style.css`:

```css
:root {
  --navy: #0b1f3a;      /* primary */
  --royal: #1d4ed8;     /* secondary */
  --gold: #c9a15a;      /* accent */
  --white: #ffffff;
  --gray-50: #f6f8fb;   /* light background */
  --ink: #0f1826;       /* body text */
}
```

Change a value once here and it updates across the entire site — buttons, headings, gradients, icons and hover states all reference these tokens.

---

## 6. Editing Content

- **Text content** — edit directly inside each `.html` file; all copy is plain HTML, no templating engine.
- **Services list** — each of the 17 services in `services.html` is a `.service-detail` block with a unique `id` (e.g. `id="leak-detection"`) used for anchor links from the homepage and quick-jump cards.
- **FAQ items** — duplicate a `.faq-item` block in any page and edit the question/answer text; `js/faq.js` automatically wires up the new item.
- **Testimonials** — duplicate a `.testi-card` (carousel) or `.service-card` (grid) block in `testimonials.html` or `index.html`.
- **Reviews used are lightly-edited, realistic placeholder reviews** — replace with your actual Google reviews as they come in.

---

## 7. Accessibility & SEO Notes

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`) with a skip-to-content link on every page.
- All interactive icons include `aria-label`s; decorative icons are `aria-hidden`.
- Color contrast follows WCAG AA guidelines throughout.
- Every page has a unique `<title>`, meta description, canonical URL, Open Graph and Twitter Card tags.
- `seo/schema.json` contains full LocalBusiness/Plumber structured data (also embedded as inline JSON-LD on key pages) — update the `telephone`, `address`, and `geo` coordinates to match your exact business details.
- `seo/sitemap.xml` and `seo/robots.txt` are included. **For production, copy both files to your site's root directory** (i.e. `https://yourdomain.com/sitemap.xml`) since most search engines expect them there rather than in a subfolder.
- Images use `loading="lazy"` and descriptive `alt` text throughout.

---

## 8. Hosting

This is a fully static site — any static host will work.

### GitHub Pages
1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set the source branch to `main` and folder to `/ (root)`.
4. Your site will be live at `https://yourusername.github.io/repo-name/`.

### Netlify
1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. Drag and drop the `plumbing-services` folder onto the "Deploy" area, **or** connect your GitHub repo.
3. Netlify auto-deploys — no build command needed (leave the build command blank, publish directory is `/`).

### Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**.
2. Import your GitHub repository (or drag-and-drop via the Vercel CLI).
3. Framework preset: **Other**. Leave build command blank, output directory `/`.

### cPanel (traditional shared hosting)
1. Log into cPanel → **File Manager**.
2. Navigate to `public_html` (or your domain's document root).
3. Upload the ZIP file and extract it directly into that folder (so `index.html` sits at the root).
4. Visit your domain — the site is live immediately.

---

## 9. Performance Tips

- The site loads a single Google Font (Manrope, 5 weights) — remove unused weights in the `<link>` tag if you want to trim load time further.
- All images are lazy-loaded except the hero.
- CSS is split into three files (core, responsive, animations) purely for maintainability — for maximum production performance, consider concatenating and minifying them into one file.
- JavaScript is vanilla and dependency-free — no libraries to load.

---

## 10. Support

This project was built as a complete, ready-to-launch deliverable. For further customization (adding new pages, integrating a real backend for form submissions, connecting a CMS, etc.), any front-end developer familiar with HTML/CSS/JS can extend it — there is no framework lock-in.
