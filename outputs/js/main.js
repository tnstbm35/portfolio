/* =========================================
   NAOYA TSUJI — Portfolio
   Main JavaScript
   ========================================= */

/* ---------- Nav: transparent on hero, solid on scroll ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const nav  = document.querySelector('.nav');
  const hero = document.querySelector('.hero');
  if (!nav || !hero) return;

  function updateNav() {
    const scrolled = window.scrollY > hero.offsetHeight - 80;
    nav.classList.toggle('nav--transparent', !scrolled);
  }

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
});

/* ---------- Hero Video Slideshow ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length <= 1) return;

  let current = 0;

  function showNext() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');

    const video = slides[current].querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    // data-duration属性（ミリ秒）があればその値、なければ6000msをデフォルトに使用
    const duration = parseInt(slides[current].dataset.duration) || 6000;
    setTimeout(showNext, duration);
  }

  const firstDuration = parseInt(slides[0].dataset.duration) || 6000;
  setTimeout(showNext, firstDuration);
});

/* ---------- Showcase Password Gate ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('gate-form');
  const input    = document.getElementById('gate-input');
  const errorMsg = document.getElementById('gate-error');
  const gate     = document.getElementById('gate');
  const content  = document.getElementById('showcase-content');
  if (!form) return;

  if (sessionStorage.getItem('showcase_auth') === 'true') {
    gate.style.display = 'none';
    content.classList.add('visible');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === '1340') {
      sessionStorage.setItem('showcase_auth', 'true');
      gate.style.display = 'none';
      content.classList.add('visible');
    } else {
      errorMsg.classList.add('visible');
      input.value = '';
      input.focus();
      setTimeout(() => errorMsg.classList.remove('visible'), 2500);
    }
  });
});

/* ---------- Hamburger Menu ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});

/* ---------- Scroll to Top ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const topBtn = document.querySelector('.footer__top');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

/* ---------- Page fade-in ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-fade');
});
