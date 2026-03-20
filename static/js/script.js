/* static/js/script.js */
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });

  const navbar = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const backToTopButton = document.querySelector('.back-to-top');
  const heroBgParallax = document.querySelector('.hero-bg-parallax');

  function updateNavbar() {
    if (window.scrollY > 100) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 50;
    sections.forEach(section => {
      const top = section.offsetTop;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  function toggleBackToTop() {
    if (!backToTopButton) return;
    backToTopButton.classList.toggle('show', window.scrollY > 300);
  }

  const onScroll = Utils.throttle(() => {
    updateNavbar();
    updateActiveNavLink();
    toggleBackToTop();
  }, 100);

  window.addEventListener('scroll', onScroll);
  updateNavbar();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      window.scrollTo({ top: target.offsetTop - navbar.offsetHeight, behavior: 'smooth' });
      if (navbarCollapse?.classList.contains('show')) navbarToggler?.click();
    });
  });

  if (backToTopButton) {
    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: [
        'Full Stack Development',
        'React Development',
        'Mobile App Development',
        'Machine Learning',
        'Web Design',
        'UI/UX Design',
        'Problem Solving'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  if (heroBgParallax) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking && window.innerWidth > 768) {
        window.requestAnimationFrame(() => {
          heroBgParallax.style.transform = `translateY(${window.pageYOffset * -0.2}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function () {
      this.classList.toggle('active');
    });
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  }

  if (Utils.supportsIntersectionObserver()) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length) {
      const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            img.classList.remove('lazy');
            obs.unobserve(img);
          }
        });
      }, { rootMargin: '50px 0px', threshold: 0.01 });
      lazyImages.forEach(img => imgObserver.observe(img));
    }

    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          const increment = target / 200;
          let current = 0;
          const update = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(update);
            } else {
              counter.textContent = target;
            }
          };
          update();
          obs.unobserve(counter);
        });
      }, { threshold: 0.5 });
      counters.forEach(c => counterObserver.observe(c));
    }

    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), i * 100);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      revealEls.forEach(el => revealObserver.observe(el));
    }
  }

  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => (preloader.style.display = 'none'), 500);
    });
  }
});

window.addEventListener('error', e => console.error('Error:', e.error));
window.addEventListener('unhandledrejection', e => console.error('Unhandled:', e.reason));