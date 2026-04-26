(function () {
  'use strict';

  /* ---- Year ---- */
  document.getElementById('year').textContent = '2022';

  /* ---- Header scroll ---- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ---- Mobile nav ---- */
  const mobileToggle = document.getElementById('mobileToggle');
  const navClose = document.getElementById('navClose');
  const nav = document.getElementById('nav');
  const navOverlay = document.getElementById('navOverlay');
  const toggleIcon = document.getElementById('toggleIcon');

  function openNav() {
    nav.classList.add('open');
    navOverlay.classList.add('show');
    toggleIcon.className = 'fas fa-times';
  }
  function closeNav() {
    nav.classList.remove('open');
    navOverlay.classList.remove('show');
    toggleIcon.className = 'fas fa-bars';
  }
  mobileToggle.addEventListener('click', openNav);
  navClose.addEventListener('click', closeNav);
  navOverlay.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* ---- Theme toggle ---- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;
  let isDark = true;
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  });

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
      }
    });
  });

  /* ---- Active nav on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav#nav ul li a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }, { passive: true });

  /* ---- Typewriter ---- */
  const words = ['Full Stack Developer', 'Graphic Designer', 'Web App Builder', 'E-Commerce Expert', 'IT Trainer', 'Brand Creator', 'PWA Developer'];
  let wi = 0, ci = 0, deleting = false;
  const typedEl = document.getElementById('typedOutput');
  function typeWriter() {
    const word = words[wi];
    if (!deleting) {
      typedEl.textContent = word.substring(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
    } else {
      typedEl.textContent = word.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(typeWriter, deleting ? 50 : 100);
  }
  typeWriter();

  /* ---- Scroll reveal ---- */
  const allReveal = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-zoom,.reveal-drop,.reveal-bounce');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.style.transitionDelay || '0') * 1000;
        setTimeout(() => e.target.classList.add('visible'), delay);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  allReveal.forEach(el => revealObs.observe(el));

  /* ---- Counter animation ---- */
  function animateCounter(el, target) {
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('.counter-num');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target);
        animateCounter(e.target, target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObs.observe(el));

  /* ---- Offer counter (10%) ---- */
  const offerCounterEl = document.getElementById('offerCounter');
  const offerObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        let v = 0;
        const timer = setInterval(() => {
          v++;
          offerCounterEl.textContent = v + '%';
          if (v >= 10) clearInterval(timer);
        }, 120);
        offerObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  if (offerCounterEl) offerObs.observe(offerCounterEl);

  /* ---- Project filter ---- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  /* ---- Contact form ---- */
  window.submitContact = async function () {
    const name = (document.getElementById('fname').value + ' ' + document.getElementById('lname').value).trim();
    const email = document.getElementById('cemail').value.trim();
    const phone = document.getElementById('cphone').value.trim();
    const service = document.getElementById('cservice').value;
    const message = document.getElementById('cmessage').value.trim();
    const ytSub = document.getElementById('ytSub').checked;
    const status = document.getElementById('formStatus');
    if (!name || !email || !message) {
      status.className = 'form-status error';
      status.textContent = 'Please fill in your name, email, and message.';
      return;
    }
    status.className = 'form-status';
    status.textContent = 'Sending...';
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}\nYouTube Subscriber: ${ytSub ? 'Yes – apply 10% discount' : 'No'}`;
    const fd = new FormData();
    fd.append('name', name); fd.append('email', email);
    fd.append('_subject', `New Enquiry from ${name}${ytSub ? ' [10% Discount]' : ''}`);
    fd.append('message', body);
    try {
      await fetch('https://formspree.io/f/mqabnddv', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      status.className = 'form-status success';
      status.textContent = ytSub
        ? '🎉 Message sent! Your 10% YouTube subscriber discount has been noted.'
        : '✅ Message sent! I\'ll get back to you within 24 hours.';
      ['fname','lname','cemail','cphone','cmessage'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('cservice').value = '';
      document.getElementById('ytSub').checked = false;
    } catch {
      status.className = 'form-status error';
      status.textContent = 'Oops! Something went wrong. Please email directly.';
    }
  };

})();