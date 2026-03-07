/* ═══════════════════════════════════════════════════════════════
   CampusLaunch — Shared JavaScript
   ═══════════════════════════════════════════════════════════════ */

// ── Scroll Progress Bar ────────────────────────────────────────
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}


// ── Navbar scroll effect ───────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}


// ── Active nav link ────────────────────────────────────────────
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


// ── Mobile nav toggle ──────────────────────────────────────────
function toggleNav() {
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (links && hamburger) {
    links.classList.toggle('open');
    hamburger.classList.toggle('open');
  }
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (links) links.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  });
});


// ── Scroll Reveal ──────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .stagger');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}


// ── Counter Animation (hero stats) ────────────────────────────
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(animateCounter);
      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });
  statsObserver.observe(statsEl);
}


// ── AI Idea Generator ──────────────────────────────────────────
const businessIdeas = [
  { text: 'Sell AI-generated design templates for student presentations' },
  { text: 'Offer online tutoring for programming and web development' },
  { text: 'Create and sell exam revision notes for your course' },
  { text: 'Launch a coding bootcamp mini-course for beginners' },
  { text: 'Build a resume and cover letter template pack' },
  { text: 'Sell social media content templates for student clubs' },
  { text: 'Create a budget meal prep guide for students' },
  { text: 'Offer freelance data analysis using Python or Excel' },
  { text: 'Sell photography and Lightroom presets for campus life' },
  { text: 'Build a productivity planner template with study timers' },
  { text: 'Create video editing templates for YouTube beginners' },
  { text: 'Sell language learning flashcard decks by subject' },
];

let lastIdeaIdx = -1;

function generateIdea() {
  const output = document.getElementById('ideaOutput');
  if (!output) return;

  let idx;
  do { idx = Math.floor(Math.random() * businessIdeas.length); } while (idx === lastIdeaIdx);
  lastIdeaIdx = idx;

  const idea = businessIdeas[idx];
  output.innerHTML = `<div class="idea-pill">${idea.text}</div>`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const pill = output.querySelector('.idea-pill');
      if (pill) pill.classList.add('show');
    });
  });
}


// ── Pricing Toggle ─────────────────────────────────────────────
let isYearly = false;

function togglePricing() {
  isYearly = !isYearly;
  const track  = document.getElementById('toggleTrack');
  const price  = document.getElementById('proPrice');
  const period = document.getElementById('proPeriod');
  const labelM = document.getElementById('labelMonthly');
  const labelY = document.getElementById('labelYearly');

  if (track)  track.classList.toggle('yearly', isYearly);
  if (labelM) labelM.classList.toggle('active', !isYearly);
  if (labelY) labelY.classList.toggle('active', isYearly);

  if (price && period) {
    if (isYearly) {
      price.textContent  = '90';
      period.textContent = 'per year · $7.50/mo';
    } else {
      price.textContent  = '9';
      period.textContent = 'per month';
    }
  }
}


// ── Smooth scroll for anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── Subtle parallax on hero visual ────────────────────────────
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < 800) {
      heroVisual.style.transform = `translateY(${scrollY * 0.04}px)`;
    }
  }, { passive: true });
}
