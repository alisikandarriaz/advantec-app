# AdvanTec Website v4

Short, clean, 4-page studio website. UK-based.

---

## Files

```
index.html     ← Home: hero, apps scroll, reviews, footer
about.html     ← About the studio
apps.html      ← Full app listings with screenshots
contact.html   ← Contact form + email links
privacy.html   ← Privacy policy (linked from footer, required for Google Play)
assets/
  css/style.css
  js/main.js   ← ★ EDIT THIS TO ADD APPS
  images/
    favicon.svg
  screenshots/ ← Put your app screenshots here
```

---

## How to Add a New App

Everything is driven by the `APPS_DATA` array at the top of `assets/js/main.js`.

**Step 1: Add a new object to the array**

```javascript
{
  id: 'habitflow',                        // Unique ID — no spaces
  name: 'HabitFlow',
  tagline: 'Simple Habit Tracker',
  category: 'Health · Lifestyle',
  icon: '🌱',                             // Emoji shown as icon
  iconStyle: 'green',                     // 'green' = live, 'gray' = coming soon
  status: 'live',                         // 'live' or 'soon'
  description:
    'A beautifully simple habit tracker that helps you build consistency, not complexity.',
  features: [
    'Daily habit streaks',
    'Progress charts',
    'Reminder notifications',
    'Works offline',
  ],
  downloadLinks: [
    {
      label: 'Google Play',
      icon: '📱',
      url: 'https://play.google.com/store/apps/details?id=com.habitflow',
      style: 'green',
    },
    // Add App Store link when available:
    // { label: 'App Store', icon: '🍎', url: '...', style: 'outline' },
  ],
  screenshots: [
    'assets/screenshots/habitflow-1.png',
    'assets/screenshots/habitflow-2.png',
    'assets/screenshots/habitflow-3.png',
  ],
  screenshotPlaceholders: 3,   // Placeholder count shown while screenshots are pending
},
```

**Step 2: Add screenshot images (optional)**

Put PNG files in `assets/screenshots/` — file names must match exactly what's in the array.

Recommended screenshot size: portrait, ideally 1080×1920px.

That's it. The app chip appears on the home page scroll bar, and the full detail section appears on the apps page automatically.

---

## Deploy Free

**Netlify (easiest):**
1. Go to netlify.com, sign up free
2. Drag and drop the entire project folder
3. Live in 60 seconds

**GitHub Pages:**
1. Create repo named `yourstudio.github.io`
2. Upload all files
3. Settings → Pages → main branch

**Custom domain:**
Buy `advantec.app` from Cloudflare (~$12/year)

---

## Connecting a Real Contact Form

The contact form shows a success state by default (simulated). To receive real emails:

1. Sign up at formspree.io (free)
2. Create a form → copy your endpoint
3. In `contact.html`, update the form:
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```
4. Remove the `setTimeout` simulation from `main.js`

---

## Before Launch Checklist

- [ ] Replace `https://play.google.com/store/apps/dev?id=AdvanTec` with real Play Store URL
- [ ] Replace `https://advantec.app` in canonical/OG tags with real deployed domain
- [ ] Add real screenshots to `assets/screenshots/` and update paths in `APPS_DATA`
- [ ] Set up real contact form (Formspree)
- [ ] Update Privacy Policy "Last updated" date if you make changes to it
- [ ] Link privacy.html in Google Play Console → App Content → Privacy Policy

---

## Adding Apple App Store

When your app is on iOS, add to `downloadLinks` in the app data:

```javascript
{ label: 'App Store', icon: '🍎', url: 'https://apps.apple.com/...', style: 'outline' }
```

The button renders automatically.
