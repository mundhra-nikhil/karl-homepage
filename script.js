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

// ── VIDEO SECTION ──
function initVideoSection() {
  const video = document.getElementById('demo-video');
  const progressBar = document.getElementById('progress-bar');
  const chapterItems = document.querySelectorAll('.chapter-item');
  
  if (!video) return;

  // Update progress bar as video plays
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = progress + '%';
      
      // Update active chapter based on current time
      updateActiveChapter(video.currentTime);
    }
  });

  // Click on progress bar to seek
  const progressContainer = document.querySelector('.video-progress');
  progressContainer.addEventListener('click', (e) => {
    if (video.duration) {
      const rect = progressContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      video.currentTime = percent * video.duration;
    }
  });

  // Chapter item clicks
  chapterItems.forEach(item => {
    item.addEventListener('click', () => {
      const timestamp = parseFloat(item.dataset.timestamp);
      video.currentTime = timestamp;
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  function updateActiveChapter(currentTime) {
    let activeChapter = null;
    
    chapterItems.forEach(item => {
      const timestamp = parseFloat(item.dataset.timestamp);
      if (timestamp <= currentTime) {
        activeChapter = item;
      }
    });

    chapterItems.forEach(item => item.classList.remove('active'));
    if (activeChapter) {
      activeChapter.classList.add('active');
    }
  }
}

// ── INITIALIZE ON DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollEffect();
  initAnnounceBar();
  initVideoSection();
});
