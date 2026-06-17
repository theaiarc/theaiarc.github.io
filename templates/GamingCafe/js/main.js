// NEXUS Gaming Lounge — shared interactivity

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Mobile menu toggle ---- */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
    );
  }

  /* ---- Navbar background on scroll ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('bg-[#0a0a12]/90', 'shadow-lg', 'backdrop-blur', 'border-b', 'border-white/10');
        navbar.classList.remove('bg-transparent');
      } else if (navbar.dataset.transparent === 'true') {
        navbar.classList.remove('bg-[#0a0a12]/90', 'shadow-lg', 'backdrop-blur', 'border-b', 'border-white/10');
        navbar.classList.add('bg-transparent');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ---- Scroll reveal animations ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---- Category filter (events / pricing menus) ---- */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');
  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach((b) => b.classList.remove('filter-active'));
        btn.classList.add('filter-active');
        filterItems.forEach((item) => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact form (demo only — no backend) ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      if (status) {
        status.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => status.classList.add('hidden'), 5000);
      }
    });
  }

  /* ---- Newsletter form (demo only) ---- */
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
    });
  });
});
