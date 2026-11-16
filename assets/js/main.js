document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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

  setupReveal();
  setupScrollSpy();

  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...'; btn.disabled = true;
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          form.reset();
          const s = form.querySelector('.form-success');
          if (s) s.style.display = 'block';
        } else {
          alert('Something went wrong. Please try emailing us directly at info@advantec.app');
        }
      } catch {
        alert('Something went wrong. Please try emailing us directly at info@advantec.app');
      }
      btn.textContent = 'Send Message'; btn.disabled = false;
    });
  });

  localStorage.removeItem('at_consent');
  setupCookieConsent();

  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});

function setupReveal() {
  const targets = '.reveal:not(.visible), .slide-in-left:not(.visible), .slide-in-right:not(.visible)';
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(targets).forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll(targets).forEach(el => obs.observe(el));
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  if (!navLinks.length) return;

  const update = () => {
    let current = '';
    const offset = 120;
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - offset) current = s.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current || href === '/#' + current);
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function getConsent() {
  try {
    const raw = localStorage.getItem('advantec_consent');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveConsent(analytics, affiliate) {
  const obj = { v: 1, analytics: !!analytics, affiliate: !!affiliate, date: new Date().toISOString() };
  try { localStorage.setItem('advantec_consent', JSON.stringify(obj)); } catch {}
  applyConsent(obj);
}

function applyConsent(c) {
  if (!c) return;
  document.querySelectorAll('script[data-consent]').forEach(s => {
    const cat = s.getAttribute('data-consent');
    if ((cat === 'analytics' && c.analytics) || (cat === 'affiliate' && c.affiliate)) {
      const live = document.createElement('script');
      live.src = s.getAttribute('data-src');
      document.head.appendChild(live);
    }
  });
}

function setupCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const existing = getConsent();
  if (existing) { applyConsent(existing); return; }

  banner.classList.remove('hidden');

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    saveConsent(true, true);
    banner.classList.add('hidden');
  });
  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    saveConsent(false, false);
    banner.classList.add('hidden');
  });

  document.querySelectorAll('.cookie-settings-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      try { localStorage.removeItem('advantec_consent'); } catch {}
      banner.classList.remove('hidden');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  });
}
