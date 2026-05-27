// ── Carousel ──
(function () {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!track || slides.length === 0) return;

  let current = 0;
  let timer;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  document.querySelector('.carousel-btn.next')?.addEventListener('click', () => { next(); startTimer(); });
  document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => { prev(); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  // touch support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); startTimer(); }
  });

  goTo(0);
  startTimer();
})();

// ── Research Carousel ──
(function () {
  const track = document.querySelector('.research-carousel-track');
  const dotsContainer = document.querySelector('.research-carousel-dots');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.research-card'));
  const visible = window.innerWidth <= 768 ? 1 : 3;
  const max = cards.length - visible;
  let current = 0;
  let timer;

  // generate dots
  for (let i = 0; i <= max; i++) {
    const dot = document.createElement('button');
    dot.className = 'research-carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
    dotsContainer.appendChild(dot);
  }
  const dots = () => dotsContainer.querySelectorAll('.research-carousel-dot');

  function cardStep() {
    return cards[0].offsetWidth + 20;
  }

  function goTo(i) {
    current = Math.max(0, Math.min(i, max));
    track.style.transform = `translateX(-${current * cardStep()}px)`;
    dots().forEach((d, j) => d.classList.toggle('active', j === current));
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current < max ? current + 1 : 0), 4000);
  }

  document.querySelector('.research-carousel-btn.next')?.addEventListener('click', () => { goTo(current + 1); startTimer(); });
  document.querySelector('.research-carousel-btn.prev')?.addEventListener('click', () => { goTo(current - 1); startTimer(); });

  window.addEventListener('resize', () => goTo(current));

  goTo(0);
  startTimer();
})();

// ── Notice Image Banner ──
(function () {
  const slides = document.querySelectorAll('.notice-banner-slide');
  const dots = document.querySelectorAll('.notice-banner-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  document.querySelector('.notice-banner-btn.next')?.addEventListener('click', () => { goTo(current + 1); startTimer(); });
  document.querySelector('.notice-banner-btn.prev')?.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startTimer(); }));

  startTimer();
})();

// ── Active nav link ──
(function () {
  const links = document.querySelectorAll('.nav-menu a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
})();
