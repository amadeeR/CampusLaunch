/* ═══════════════════════════════════════════════════════════════
    Shared JavaScript
   ═══════════════════════════════════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
  // Check on load
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}

// ── Active nav link ───────────────────────────────────────────
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── Mobile nav toggle ─────────────────────────────────────────
function toggleNav() {
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (links && hamburger) {
    links.classList.toggle('open');
    hamburger.classList.toggle('open');
  }
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (links) links.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  });
});

// ── Scroll Reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .stagger');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ── AI Idea Generator ─────────────────────────────────────────
const businessIdeas = [
  { text: 'Sell AI-generated design templates for student presentations' },
  {text: 'Offer online tutoring for programming and web development' },
  {text: 'Create and sell exam revision notes for your course' },
  {text: 'Launch a coding bootcamp mini-course for beginners' },
  { text: 'Build a resume and cover letter template pack' },
  { text: 'Sell social media content templates for student clubs' },
  { text: 'Create a budget meal prep guide for students' },
  { text: 'Offer freelance data analysis using Python or Excel' },
  {  text: 'Sell photography and Lightroom presets for campus life' },
  {  text: 'Build a productivity planner template with study timers' },
  {  text: 'Create video editing templates for YouTube beginners' },
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

// ── Pricing Toggle ────────────────────────────────────────────
let isYearly = false;

function togglePricing() {
  isYearly = !isYearly;
  const track = document.getElementById('toggleTrack');
  const price = document.getElementById('proPrice');
  const period = document.getElementById('proPeriod');
  const labelM = document.getElementById('labelMonthly');
  const labelY = document.getElementById('labelYearly');

  if (track) track.classList.toggle('yearly', isYearly);
  if (labelM) labelM.classList.toggle('active', !isYearly);
  if (labelY) labelY.classList.toggle('active', isYearly);

  if (price && period) {
    if (isYearly) {
      price.textContent = '90';
      period.textContent = 'per year · $7.50/mo';
    } else {
      price.textContent = '9';
      period.textContent = 'per month';
    }
  }
}

// ── Counter Animation (homepage hero stats) ───────────────────
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = target / 45;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }, 28);
  });
}

const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });
  statsObserver.observe(statsEl);
}

// ── Smooth scroll for same-page anchors ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
