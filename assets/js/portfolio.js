(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navToggle.classList.toggle('is-open', !open);
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('is-open');
      nav.classList.remove('is-open');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // External web destinations open in a new tab. Internal anchors, mailto and tel remain native.
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (a.dataset.forceNewTab === 'true') {
      a.target = '_blank';
      const rel = new Set((a.rel || '').split(/\s+/).filter(Boolean));
      rel.add('noopener'); rel.add('noreferrer');
      a.rel = [...rel].join(' ');
      return;
    }
    try {
      const url = new URL(href, location.href);
      if ((url.protocol === 'http:' || url.protocol === 'https:') && !href.startsWith('#')) {
        a.target = '_blank';
        const rel = new Set((a.rel || '').split(/\s+/).filter(Boolean));
        rel.add('noopener'); rel.add('noreferrer'); rel.add('external');
        a.rel = [...rel].join(' ');
      }
    } catch (_) {}
  });

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .07, rootMargin: '0px 0px -4% 0px' });
    reveal.forEach(el => observer.observe(el));
  } else {
    reveal.forEach(el => el.classList.add('is-visible'));
  }

  document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // TikTok portfolio preview: custom dark kaleidoscope + native dialog.
  // No third-party TikTok script is loaded, keeping the page visually consistent and lighter.
  const tiktokDialog = document.getElementById('tiktokPreviewDialog');
  const tiktokPreviewImage = document.getElementById('tiktokPreviewImage');
  const tiktokPreviewTitle = document.getElementById('tiktokPreviewTitle');
  const tiktokPreviewCopy = document.getElementById('tiktokPreviewCopy');
  let lastTiktokTrigger = null;

  const closeTiktokDialog = () => {
    if (!tiktokDialog) return;
    if (typeof tiktokDialog.close === 'function' && tiktokDialog.open) tiktokDialog.close();
    else tiktokDialog.removeAttribute('open');
    document.documentElement.classList.remove('dialog-open');
    if (lastTiktokTrigger) lastTiktokTrigger.focus({ preventScroll: true });
  };

  document.querySelectorAll('[data-tiktok-preview]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (!tiktokDialog) return;
      lastTiktokTrigger = trigger;
      const image = trigger.dataset.image || '';
      const title = trigger.dataset.title || 'TikTok priekšskatījums';
      const copy = trigger.dataset.copy || '';
      const sourceImage = trigger.querySelector('img');

      if (tiktokPreviewImage) {
        tiktokPreviewImage.src = image;
        tiktokPreviewImage.alt = sourceImage?.alt || title;
      }
      if (tiktokPreviewTitle) tiktokPreviewTitle.textContent = title;
      if (tiktokPreviewCopy) tiktokPreviewCopy.textContent = copy;

      document.documentElement.classList.add('dialog-open');
      if (typeof tiktokDialog.showModal === 'function') tiktokDialog.showModal();
      else tiktokDialog.setAttribute('open', '');
    });
  });

  document.querySelectorAll('[data-tiktok-close]').forEach(button => {
    button.addEventListener('click', closeTiktokDialog);
  });

  if (tiktokDialog) {
    tiktokDialog.addEventListener('click', event => {
      if (event.target === tiktokDialog) closeTiktokDialog();
    });
    tiktokDialog.addEventListener('cancel', event => {
      event.preventDefault();
      closeTiktokDialog();
    });
    tiktokDialog.addEventListener('close', () => {
      document.documentElement.classList.remove('dialog-open');
    });
  }

  // A reliable return-to-top action. The old target lived on the sticky header,
  // which some browsers considered already visible and therefore did not scroll.
  document.querySelectorAll('a[href="#top"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', '#top');
    });
  });

  const progress = document.querySelector('.page-progress span');
  const mainSections = [...document.querySelectorAll('main section[id]')];
  const workChapters = [...document.querySelectorAll('.work-chapter[id]')];
  const workIndexLinks = [...document.querySelectorAll('.work-index a[href^="#"]')];

  const onScroll = () => {
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    }

    let current = '';
    mainSections.forEach(section => {
      if (scrollY >= section.offsetTop - 145) current = section.id;
    });
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(a => {
      const href = a.getAttribute('href');
      const isWorks = href === '#projekti' && ['projekti','digitalie-projekti','github-projekti','darbnicas-darbi'].includes(current);
      a.classList.toggle('is-active', href === `#${current}` || isWorks);
    });

    let currentWork = '';
    workChapters.forEach(chapter => {
      if (scrollY >= chapter.offsetTop - 190) currentWork = chapter.id;
    });
    workIndexLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === `#${currentWork}`));
  };

  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
})();
