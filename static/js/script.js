// static/js/script.js
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });

  const navbar = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const backToTopButton = document.querySelector('.back-to-top');

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
      const targetId = this.getAttribute('href').slice(1);
      if (!document.getElementById(targetId)) return;
      e.preventDefault();
      Utils.scrollTo(targetId);
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
        'React & Next.js',
        'AI-Powered Applications',
        'Mobile App Development',
        'Backend Engineering',
        'Machine Learning',
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
});