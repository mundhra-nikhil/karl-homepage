// ── ADJUST HERO FOR ANNOUNCE BAR ──
function adjustHero() {
  const abarH = document.getElementById('abar-wrap').offsetHeight;
  document.querySelector('.hero-sticky').style.top = abarH + 'px';
}
adjustHero();
window.addEventListener('resize', adjustHero);

// ── CURSOR ──
function initCursor() {
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;
  
  document.addEventListener('mousemove', e => { 
    mx = e.clientX; 
    my = e.clientY; 
  });
  
  function cursorLoop() {
    dx += (mx - dx) * 0.18;
    dy += (my - dy) * 0.18;
    rx += (mx - rx) * 0.07;
    ry += (my - ry) * 0.07;
    dot.style.left = dx + 'px';
    dot.style.top = dy + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(cursorLoop);
  }
  
  cursorLoop();
  
  document.querySelectorAll('a,button,.aclose').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
  });
}

// ── SCROLL EFFECT ──
function initScrollEffect() {
  const vidEl      = document.getElementById('bgvid');
  const overlayX   = document.getElementById('overlay-extra');
  const heroContent = document.getElementById('hero-content');
  const scrollHint = document.getElementById('scroll-hint');
  const abarWrap   = document.getElementById('abar-wrap');

  const SCROLL_ZONE = 400;

  function ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });

  function update() {
    ticking = false;

    const raw      = window.scrollY;
    const progress = Math.min(raw / SCROLL_ZONE, 1);
    const eased    = ease(progress);

    // 1. Blur the video: 0px → 5px
    const blurVal = eased * 5;
    vidEl.style.filter = `blur(${blurVal}px)`;

    // 2. Darken overlay: opacity 0 → 0.8
    overlayX.style.opacity = eased * 0.8;

    // 3. Fade IN hero content: opacity 0→1, translateY 28→0
    const textProgress = eased * eased * eased;
    heroContent.style.opacity   = textProgress;
    heroContent.style.transform = `translateY(${28 - textProgress * 28}px)`;

    // 4. Fade OUT scroll hint
    scrollHint.style.opacity = Math.max(0, 1 - progress * 1.5);
  }

  // Set spacer height
  function setSpacerHeight() {
    const abarH = abarWrap.offsetHeight || 38;
    const spacerHeight = SCROLL_ZONE + 'px';
    document.getElementById('hero-spacer').style.height = spacerHeight;
    console.log('Spacer height set to:', spacerHeight);
  }
  
  setSpacerHeight();
  window.addEventListener('resize', setSpacerHeight);

  // Run once on load
  update();
}

// ── ANNOUNCE BAR CLOSE ──
function initAnnounceBar() {
  const aclose = document.querySelector('.aclose');
  if (aclose) {
    aclose.addEventListener('click', () => {
      document.getElementById('abar-wrap').style.display = 'none';
      adjustHero();
    });
  }
}

// ── INITIALIZE ON DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollEffect();
  initAnnounceBar();
});
