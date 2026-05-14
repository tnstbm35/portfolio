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

/* ---------- Lightbox with Navigation ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.still-masonry__item img');
  if (!thumbs.length) return;

  const gallery = Array.from(thumbs).map(img => ({ src: img.src, alt: img.alt }));
  let idx = 0;

  // ── CSSをheadに注入 ──
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    dialog.lb-dialog {
      padding: 0; border: none; background: transparent;
      width: 100vw; height: 100vh;
      max-width: none; max-height: none;
      margin: 0; overflow: hidden;
    }
    dialog.lb-dialog::backdrop {
      background: rgba(255,255,255,0.97);
    }
    .lb-wrap {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .lb-photo {
      max-width: 90vw; max-height: 88vh;
      object-fit: contain; display: block;
    }
    .lb-close {
      position: absolute; top: 20px; right: 24px;
      background: none; border: none; cursor: pointer;
      font-size: 22px; color: #aaa; padding: 8px; line-height: 1;
    }
    .lb-close:hover { color: #222; }
    .lb-prev, .lb-next {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      font-size: 64px; color: #bbb; line-height: 1; padding: 0 14px;
    }
    .lb-prev:hover, .lb-next:hover { color: #333; }
    .lb-prev { left: 8px; }
    .lb-next { right: 8px; }
  `;
  document.head.appendChild(styleEl);

  // ── <dialog>構造を作成 ──
  const dialog = document.createElement('dialog');
  dialog.className = 'lb-dialog';

  const wrap = document.createElement('div');
  wrap.className = 'lb-wrap';

  const photo = document.createElement('img');
  photo.className = 'lb-photo';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lb-close';
  closeBtn.textContent = '✕';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'lb-prev';
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'lb-next';
  nextBtn.textContent = '›';

  wrap.append(photo, closeBtn, prevBtn, nextBtn);
  dialog.appendChild(wrap);
  document.body.appendChild(dialog);

  // ── 写真切り替え ──
  function showPhoto() {
    photo.src = gallery[idx].src;
    photo.alt = gallery[idx].alt || '';
  }

  // ── 開く・閉じる ──
  function openLB(i) {
    idx = i;
    showPhoto();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    dialog.close();
  }

  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    photo.src = '';
  });

  // ── イベント ──
  thumbs.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLB(i));
  });

  wrap.addEventListener('click', e => { if (e.target === wrap) closeLB(); });
  closeBtn.addEventListener('click', closeLB);
  prevBtn.addEventListener('click', () => { idx = (idx - 1 + gallery.length) % gallery.length; showPhoto(); });
  nextBtn.addEventListener('click', () => { idx = (idx + 1) % gallery.length; showPhoto(); });

  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); idx = (idx - 1 + gallery.length) % gallery.length; showPhoto(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); idx = (idx + 1) % gallery.length; showPhoto(); }
  });
});

/* ---------- Page fade-in ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-fade');
});
