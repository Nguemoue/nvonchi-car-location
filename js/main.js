/* ============================================================
   Nvonchi Car Location — Main JS v2
   Premium interactions: particles, 3D tilt, scroll reveal,
   carousel, FAQ, theme switcher, counters, form
   ============================================================ */

(function () {
  'use strict';

  /* ─── DOM CACHE ─── */
  const navbar       = document.getElementById('navbar');
  const burger       = document.getElementById('burger');
  const navLinks     = document.getElementById('nav-links');
  const backToTop    = document.getElementById('back-to-top');
  const paletteToggle= document.getElementById('palette-toggle');
  const palettePanel = document.getElementById('palette-panel');
  const contactForm  = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const yearEl       = document.getElementById('year');
  const tcTrack      = document.getElementById('tc-track');
  const tcPrev       = document.getElementById('tc-prev');
  const tcNext       = document.getElementById('tc-next');
  const tcDotsEl     = document.getElementById('tc-dots');
  const tabBtns      = document.querySelectorAll('.tab-btn');
  const fleetCards   = document.querySelectorAll('.fleet-card');
  const faqItems     = document.querySelectorAll('.faq-item');
  const swatches     = document.querySelectorAll('.swatch');
  const heroCard     = document.getElementById('hero-card');
  const particlesCtn = document.getElementById('particles');

  /* ─── FOOTER YEAR ─── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── PARTICLES ─── */
  function createParticles() {
    if (!particlesCtn) return;
    const count = window.innerWidth < 768 ? 18 : 38;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1.5;
      Object.assign(p.style, {
        left:            Math.random() * 100 + '%',
        width:           size + 'px',
        height:          size + 'px',
        animationDuration:(Math.random() * 14 + 8) + 's',
        animationDelay:  (Math.random() * -18) + 's',
        opacity:          Math.random() * 0.6 + 0.2,
      });
      particlesCtn.appendChild(p);
    }
  }
  createParticles();

  /* ─── NAVBAR ─── */
  function updateNavbar() {
    if (window.scrollY > 60) { navbar.classList.add('scrolled'); }
    else                      { navbar.classList.remove('scrolled'); }
    if (window.scrollY > 400) { backToTop.classList.add('visible'); }
    else                      { backToTop.classList.remove('visible'); }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ─── BURGER MENU ─── */
  burger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ─── BACK TO TOP ─── */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── SCROLL REVEAL (Intersection Observer) ─── */
  const revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ─── ANIMATED COUNTERS ─── */
  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 1400;
    const step     = Math.max(1, Math.ceil(target / (duration / 16)));
    let current = 0;
    const timer = setInterval(function () {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 16);
  }
  let countersRan = false;
  const counterObs = new IntersectionObserver(function (entries) {
    if (countersRan) return;
    if (entries.some(function (e) { return e.isIntersecting; })) {
      countersRan = true;
      document.querySelectorAll('.count').forEach(animateCount);
      counterObs.disconnect();
    }
  }, { threshold: 0.3 });
  const statsRibbon = document.querySelector('.stats-ribbon');
  if (statsRibbon) counterObs.observe(statsRibbon);

  /* ─── ACTIVE NAV LINK ─── */
  const sections       = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-links .nav-link');
  function highlightNav() {
    let current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 90) current = s.id;
    });
    navAnchorLinks.forEach(function (a) {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) a.style.color = 'var(--primary)';
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ─── 3D HERO CARD MOUSE TILT ─── */
  if (heroCard) {
    const face = heroCard.querySelector('.card-front');
    heroCard.addEventListener('mousemove', function (e) {
      const rect = heroCard.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      face.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 14}deg)`;
    });
    heroCard.addEventListener('mouseleave', function () {
      face.style.transform = 'rotateY(-8deg) rotateX(4deg)';
    });
  }

  /* ─── GENERIC TILT CARDS ─── */
  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) scale(1.01) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ─── FLEET TABS ─── */
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const cat = btn.getAttribute('data-category');
      fleetCards.forEach(function (card) {
        const show = cat === 'all' || card.getAttribute('data-category') === cat;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ─── TESTIMONIALS CAROUSEL ─── */
  if (tcTrack) {
    const CAROUSEL_BREAKPOINT = 900; // must match CSS @media (max-width: 900px)
    const slides     = tcTrack.querySelectorAll('.tc-slide');
    const total      = slides.length;
    let   visible    = getVisibleSlides();
    let   currentIdx = 0;
    let   autoTimer;

    // Build dots
    function buildDots() {
      if (!tcDotsEl) return;
      tcDotsEl.innerHTML = '';
      const v = Math.max(1, visible);
      const pages = Math.ceil(total / v);
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'tc-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Diapositive ' + (i + 1));
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function () { goTo(parseInt(this.getAttribute('data-index'), 10)); });
        tcDotsEl.appendChild(dot);
      }
    }

    function getVisibleSlides() {
      return window.innerWidth < CAROUSEL_BREAKPOINT ? 1 : 3;
    }

    function goTo(pageIdx) {
      visible = Math.max(1, getVisibleSlides());
      const pages      = Math.ceil(total / visible);
      currentIdx       = Math.max(0, Math.min(pageIdx, pages - 1));
      const slideWidth = 100 / visible;
      tcTrack.style.transform = `translateX(-${currentIdx * slideWidth * visible}%)`;
      // Slide widths
      slides.forEach(function (s) { s.style.flex = `0 0 calc(${slideWidth}% - 16px)`; });
      // Dots
      if (tcDotsEl) {
        tcDotsEl.querySelectorAll('.tc-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === currentIdx);
        });
      }
    }

    function pages() { return Math.ceil(total / Math.max(1, visible)); }
    function next() { goTo((currentIdx + 1) % pages()); }
    function prev() { goTo((currentIdx - 1 + pages()) % pages()); }

    function startAuto() { autoTimer = setInterval(next, 4500); }
    function stopAuto()  { clearInterval(autoTimer); }

    if (tcNext) tcNext.addEventListener('click', function () { stopAuto(); next(); startAuto(); });
    if (tcPrev) tcPrev.addEventListener('click', function () { stopAuto(); prev(); startAuto(); });

    // Touch / swipe
    let touchStartX = 0;
    tcTrack.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    tcTrack.addEventListener('touchend',   function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { stopAuto(); if (diff > 0) next(); else prev(); startAuto(); }
    }, { passive: true });

    window.addEventListener('resize', function () {
      visible = Math.max(1, getVisibleSlides());
      buildDots();
      goTo(0);
    });

    buildDots();
    goTo(0);
    startAuto();
  }

  /* ─── FAQ ACCORDION ─── */
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      const open = btn.getAttribute('aria-expanded') === 'true';
      // Close all others
      faqItems.forEach(function (other) {
        const ob = other.querySelector('.faq-q');
        const oa = other.querySelector('.faq-a');
        if (ob && oa) { ob.setAttribute('aria-expanded', 'false'); oa.classList.remove('open'); }
      });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); ans.classList.add('open'); }
    });
  });

  /* ─── THEME SWITCHER ─── */
  // Load saved theme
  const saved = localStorage.getItem('nvonchi-theme') || 'red';
  applyTheme(saved);
  document.querySelector(`.swatch[data-theme="${saved}"]`)?.classList.add('active');

  paletteToggle.addEventListener('click', function () {
    const open = palettePanel.classList.toggle('open');
    paletteToggle.setAttribute('aria-expanded', String(open));
  });

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (!palettePanel.contains(e.target) && e.target !== paletteToggle) {
      palettePanel.classList.remove('open');
      paletteToggle.setAttribute('aria-expanded', 'false');
    }
  });

  swatches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      const theme = sw.getAttribute('data-theme');
      swatches.forEach(function (s) { s.classList.remove('active'); });
      sw.classList.add('active');
      applyTheme(theme);
      localStorage.setItem('nvonchi-theme', theme);
    });
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /* ─── CONTACT FORM ─── */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = contactForm.querySelector('#f-name');
      const phone   = contactForm.querySelector('#f-phone');
      const start   = contactForm.querySelector('#f-start');
      const end     = contactForm.querySelector('#f-end');
      const vehicle = contactForm.querySelector('#f-vehicle');
      const errors  = [];

      if (!name.value.trim())  errors.push('Le nom est requis.');
      if (!phone.value.trim()) errors.push('Le téléphone est requis.');
      if (!vehicle.value)      errors.push('Veuillez choisir un type de véhicule.');
      if (!start.value)        errors.push('La date de début est requise.');
      if (!end.value)          errors.push('La date de fin est requise.');
      if (start.value && end.value && new Date(end.value) < new Date(start.value)) {
        errors.push('La date de fin doit être postérieure à la date de début.');
      }

      if (errors.length) {
        formFeedback.style.color = 'var(--primary)';
        formFeedback.textContent = errors[0];
        return;
      }

      formFeedback.style.color = '#2ecc71';
      formFeedback.textContent = '✅ Demande envoyée ! Nous vous contacterons très bientôt.';
      contactForm.reset();
      setTimeout(function () { formFeedback.textContent = ''; }, 7000);
    });
  }

}());
