/* ============================================================
   ADVANTEC — main.js
   To add a new app: add one object to APPS_DATA below.
   ============================================================ */

const APPS_DATA = [
  {
    id: 'focusai',
    name: 'FocusAI',
    tagline: 'Smart Task Planner and Focus App',
    category: 'Productivity · AI',
    icon: '🎯',
    iconStyle: 'green',
    status: 'live',
    description: 'Your intelligent productivity companion. FocusAI combines AI-powered task management, Pomodoro focus timers, XP gamification, daily streaks, ambient music, analytics, and cloud sync into one beautifully designed app.',
    features: ['Built-in AI task assistant', 'Pomodoro timer and Focus Mode', 'XP and streak gamification', '7 themes and ambient music', 'Cloud sync across devices', 'Analytics dashboard', 'Works fully offline', 'GDPR compliant'],
    downloadLinks: [
      { label: 'Google Play', icon: '▶', url: 'https://play.google.com/store/apps/dev?id=AdvanTec', style: 'green' },
    ],
    screenshots: [],
    screenshotPlaceholders: 4,
  },
  {
    id: 'timedot',
    name: 'TimeDot',
    tagline: 'Life Visualisation App',
    category: 'Lifestyle · Wellbeing',
    icon: '⏰',
    iconStyle: 'gray',
    status: 'soon',
    description: 'TimeDot visualises your year as 365 dots and your life as a grid of years. A calm, minimal reminder to make time count. Simple by design, quietly powerful in practice.',
    features: ['365-dot year view', 'Life grid perspective', 'Events and milestones', 'Clean minimal design', 'No account required', 'Works offline'],
    downloadLinks: [
      { label: 'Join Waitlist', icon: '✉', url: 'contact.html', style: 'outline' },
    ],
    screenshots: [],
    screenshotPlaceholders: 3,
  },
  {
    id: 'digestive',
    name: 'Digestive Health',
    tagline: 'Gut Health and Meal Tracker',
    category: 'Health · Wellness',
    icon: '🌿',
    iconStyle: 'gray',
    status: 'soon',
    description: 'A simple daily tracker for gut health, meals, symptoms, and hydration. Log what you eat, track how you feel, and spot patterns over time to understand your body better.',
    features: ['Daily meal and symptom logging', 'Hydration tracker', 'Weekly health summaries', 'Pattern insights', 'Simple and fast', 'Private and offline-first'],
    downloadLinks: [
      { label: 'Join Waitlist', icon: '✉', url: 'contact.html', style: 'outline' },
    ],
    screenshots: [],
    screenshotPlaceholders: 3,
  },
];

/* RENDER HOME CHIPS */
function renderHomeChips() {
  const container = document.getElementById('apps-scroll');
  if (!container) return;
  container.innerHTML = APPS_DATA.map(app => `
    <a class="app-chip" href="apps.html#${app.id}">
      <div class="app-chip-top">
        <div class="app-chip-icon ${app.iconStyle === 'green' ? 'chip-icon-green' : 'chip-icon-gray'}">${app.icon}</div>
        <div>
          <div class="app-chip-name">${app.name}</div>
          <div class="app-chip-cat">${app.category}</div>
        </div>
      </div>
      <div class="app-chip-desc">${app.tagline}</div>
      <span class="chip-badge ${app.status === 'live' ? 'badge-live' : 'badge-soon'}">
        ${app.status === 'live' ? '● Live' : '◌ Coming Soon'}
      </span>
    </a>
  `).join('');
}

/* RENDER APPS PAGE */
function renderAppsPage() {
  const container = document.getElementById('apps-list');
  if (!container) return;
  container.innerHTML = APPS_DATA.map(app => {
    const features = app.features.map(f => `<span class="feat-tag">${f}</span>`).join('');
    const links = app.downloadLinks.map(l => `
      <a href="${l.url}" ${l.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} class="btn ${l.style === 'green' ? 'btn-green' : 'btn-outline'}">
        ${l.icon} ${l.label}
      </a>
    `).join('');
    let screenshots = '';
    if (app.screenshots && app.screenshots.length > 0) {
      screenshots = app.screenshots.map(src => `<div class="screenshot-frame"><img src="${src}" alt="${app.name}" loading="lazy" /></div>`).join('');
    } else {
      screenshots = Array.from({ length: app.screenshotPlaceholders || 3 }, (_, i) => `
        <div class="screenshot-frame">
          <div class="screenshot-placeholder">${app.icon}<span>Screenshot ${i + 1}</span></div>
        </div>
      `).join('');
    }
    const badge = app.status === 'live'
      ? `<span class="chip-badge badge-live" style="margin-bottom:6px;">● Live</span>`
      : `<span class="chip-badge badge-soon" style="margin-bottom:6px;">◌ Coming Soon</span>`;
    return `
      <div class="app-detail reveal" id="${app.id}">
        <div class="app-detail-header">
          <div class="app-detail-icon ${app.iconStyle === 'green' ? 'icon-green' : 'icon-gray'}">${app.icon}</div>
          <div>${badge}<div class="app-detail-title">${app.name}</div><div class="app-detail-cat">${app.category}</div></div>
        </div>
        <p class="app-detail-desc">${app.description}</p>
        <div class="app-detail-features">${features}</div>
        <div class="app-detail-actions">${links}</div>
        <div class="screenshots-label">Screenshots</div>
        <div class="screenshots-scroll">${screenshots}</div>
      </div>
    `;
  }).join('');
  setupReveal();
}

/* CORE */
document.addEventListener('DOMContentLoaded', () => {
  renderHomeChips();
  renderAppsPage();

  /* Nav scroll shadow */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Hamburger */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* Active nav */
  const file = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === file || (file === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* Scroll reveal */
  setupReveal();

  /* Forms */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...'; btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Message'; btn.disabled = false;
        const s = form.querySelector('.form-success');
        if (s) s.style.display = 'block';
      }, 1200);
    });
  });

  /* Cookie */
  const banner = document.getElementById('cookie-banner');
  if (banner && !localStorage.getItem('at_consent')) banner.classList.remove('hidden');
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('at_consent', '1');
    document.getElementById('cookie-banner')?.classList.add('hidden');
  });
  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('at_consent', '0');
    document.getElementById('cookie-banner')?.classList.add('hidden');
  });

  /* Back to top */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});

function setupReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

/* CHIP STYLES (added by JS since chips are rendered dynamically) */
const chipStyle = document.createElement('style');
chipStyle.textContent = `
  .apps-scroll { display: flex; gap: 20px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: thin; scrollbar-color: #D1FADF transparent; }
  .apps-scroll::-webkit-scrollbar { height: 4px; }
  .apps-scroll::-webkit-scrollbar-thumb { background: #D1FADF; border-radius: 4px; }
  .app-chip { flex-shrink: 0; background: #fff; border: 1px solid #EAECF0; border-radius: 20px; padding: 24px 28px; width: 250px; display: flex; flex-direction: column; gap: 12px; transition: .22s cubic-bezier(.4,0,.2,1); cursor: pointer; }
  .app-chip:hover { border-color: #D1FADF; box-shadow: 0 12px 16px -4px rgba(16,24,40,.08); transform: translateY(-3px); }
  .app-chip-top { display: flex; align-items: center; gap: 14px; }
  .app-chip-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
  .chip-icon-green { background: linear-gradient(135deg, #12B76A 0%, #027A48 100%); box-shadow: 0 4px 12px rgba(18,183,106,.25); }
  .chip-icon-gray { background: #F2F4F7; }
  .app-chip-name { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; color: #101828; }
  .app-chip-cat { font-size: 12px; color: #667085; margin-top: 2px; }
  .app-chip-desc { font-size: 13px; line-height: 1.7; color: #667085; }
  .chip-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 6px; font-family: 'Outfit', sans-serif; align-self: flex-start; }
  .badge-live { background: #ECFDF3; color: #027A48; }
  .badge-soon { background: #FFFAEB; color: #B54708; }
`;
document.head.appendChild(chipStyle);