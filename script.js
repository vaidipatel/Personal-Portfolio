// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 5 + 'px';
  cursor.style.top = mouseY - 5 + 'px';
});

function animateCursorRing() {
  ringX += (mouseX - ringX - 16) * 0.12;
  ringY += (mouseY - ringY - 16) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Scale cursor on hover over interactive elements
document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    cursorRing.style.transform = 'scale(1.5)';
    cursorRing.style.borderColor = 'var(--cyan)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorRing.style.transform = 'scale(1)';
    cursorRing.style.borderColor = 'var(--blue)';
  });
});

// =====================
// SCROLL REVEAL
// =====================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay based on position among siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let i = 0;
      siblings.forEach((el, idx) => { if (el === entry.target) i = idx; });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => revealObserver.observe(el));

// =====================
// ACTIVE NAV HIGHLIGHT
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => sectionObserver.observe(section));

// =====================
// NAVBAR SCROLL EFFECT
// =====================
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(59,130,246,0.25)';
    nav.style.background = 'rgba(8,12,20,0.97)';
  } else {
    nav.style.borderBottomColor = 'rgba(59,130,246,0.15)';
    nav.style.background = 'rgba(8,12,20,0.9)';
  }
});

// =====================
// TYPING EFFECT (Terminal)
// =====================
const terminalLines = document.querySelectorAll('.terminal-body .t-line');

function typewriterEffect() {
  terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s ease';
      line.style.opacity = '1';
    }, index * 180);
  });
}

// Run after page loads
window.addEventListener('load', () => {
  setTimeout(typewriterEffect, 800);
});

// =====================
// SMOOTH SCROLL FOR NAV LINKS
// =====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =====================
// SKILL BAR ANIMATION ON SCROLL
// =====================
const skillBars = document.querySelectorAll('.sbar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.width = width;
      }, 100);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach((bar) => barObserver.observe(bar));
