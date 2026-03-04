/* ===================================================
   Nvonchi Car Location – Main JavaScript
   =================================================== */

(function () {
  'use strict';

  /* ---------- Back to top ---------- */
  const backToTopBtn = document.getElementById('back-to-top');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Navbar scroll behaviour ---------- */
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    toggleBackToTop();
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Burger / mobile menu ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  burger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 16);
  }

  const counters = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      countersStarted = true;
      counters.forEach(animateCounter);
    }
  }

  window.addEventListener('scroll', startCounters, { passive: true });
  startCounters(); // run once on load in case already visible

  /* ---------- Fleet filter tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active tab
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      fleetCards.forEach(function (card) {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name = contactForm.querySelector('#name');
      const phone = contactForm.querySelector('#phone');
      const dateDebut = contactForm.querySelector('#date-debut');
      const dateFin = contactForm.querySelector('#date-fin');

      const errors = [];

      if (!name.value.trim()) errors.push('Le nom est requis.');
      if (!phone.value.trim()) errors.push('Le téléphone est requis.');
      if (!dateDebut.value) errors.push('La date de début est requise.');
      if (!dateFin.value) errors.push('La date de fin est requise.');
      if (dateDebut.value && dateFin.value && new Date(dateFin.value) < new Date(dateDebut.value)) {
        errors.push('La date de fin doit être après la date de début.');
      }

      if (errors.length > 0) {
        formSuccess.style.color = '#e63946';
        formSuccess.textContent = errors[0];
        return;
      }

      // Simulate submission success
      formSuccess.style.color = '#2ecc71';
      formSuccess.textContent = '✅ Votre demande a bien été envoyée. Nous vous contacterons sous peu !';
      contactForm.reset();

      setTimeout(function () {
        formSuccess.textContent = '';
      }, 6000);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Scroll-reveal (lightweight) ---------- */
  const revealEls = document.querySelectorAll('.card, .fleet-card, .testimonial-card');

  function revealOnScroll() {
    revealEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  // Set initial state
  revealEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // run once on load

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-links a:not(.btn-nav)');

  function highlightNavLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach(function (link) {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.style.color = 'var(--primary)';
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

}());
