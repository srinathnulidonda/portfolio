/* static/js/projects.js */
const projectsData = [
  {
    id: 'savlink-personal-web-library',
    title: 'Savlink - Personal Web Library',
    category: 'Full Stack Web App',
    filters: ['web'],
    description: 'A beautiful, fast, and secure personal library for your important links. Save once, use forever. Features smart folders, tagging, lightning-fast search, real-time sync, and custom branded short links with analytics.',
    techStack: ['React', 'Tailwind CSS', 'Flask', 'PostgreSQL', 'Firebase', 'Redis', 'Vite', 'Framer Motion'],
    imageSrc: 'assets/images/projects/savlink.png',
    imageAlt: 'Savlink Personal Web Library Dashboard',
    liveUrl: 'https://savlink.vercel.app',
    codeUrl: 'https://github.com/srinathnulidonda/savlink'
  },
  {
    id: 'cinebrain-entertainment-platform',
    title: 'CineBrain - AI Entertainment Platform',
    category: 'AI/ML Web App',
    filters: ['web', 'ml'],
    description: 'AI-powered entertainment recommendation platform with personalized movie, TV show, and anime suggestions. Features advanced user management, reviews, and intelligent content discovery.',
    techStack: ['Flask', 'PostgreSQL', 'Redis', 'JavaScript ES6+', 'Bootstrap', 'TMDB API', 'JWT', 'Cloudinary'],
    imageSrc: 'assets/images/projects/cinebrain.png',
    imageAlt: 'CineBrain Entertainment Platform',
    liveUrl: 'https://cinebrain.vercel.app/',
    codeUrl: 'https://github.com/srinathnulidonda/cinebrain'
  },
  {
    id: 'weather-web',
    title: 'Weatherly Web App',
    category: 'Full Stack Web App',
    filters: ['web'],
    description: 'Modern weather application with real-time data, dynamic theming, weather animations, and PWA support. Features Flask backend and responsive frontend.',
    techStack: ['Flask', 'Python', 'JavaScript', 'CSS3', 'OpenWeather API', 'PWA'],
    imageSrc: 'assets/images/projects/weatherly-web.png',
    imageAlt: 'Weatherly Weather Application',
    liveUrl: 'https://getweatherly.vercel.app/',
    codeUrl: 'https://github.com/Srinathnulidonda/weatherly'
  },
  {
    id: 'weatherly-flutter-app',
    title: 'Weatherly Mobile App',
    category: 'Mobile Application',
    filters: ['mobile'],
    description: 'Native Flutter weather app with dynamic theming, weather animations, and real-time forecasts. Built with Material 3 design and offline support.',
    techStack: ['Flutter', 'Dart', 'Material 3', 'REST API'],
    imageSrc: 'assets/images/projects/weatherly-app.png',
    imageAlt: 'Weatherly Flutter Weather Application',
    liveUrl: 'https://drive.google.com/uc?export=download&id=10lPOkrf2HACA6ht-cirq_ubcW6adB_W2',
    codeUrl: 'https://github.com/Srinathnulidonda/weatherly'
  },
  {
    id: 'manga-app',
    title: 'Manga Reading App',
    category: 'Mobile App',
    filters: ['mobile'],
    description: 'A feature-rich mobile application for manga enthusiasts built with Flutter. Includes reading features, bookmarks, and offline reading capabilities.',
    techStack: ['Flutter', 'Dart', 'Mobile'],
    imageSrc: 'assets/images/projects/manga-app.png',
    imageAlt: 'Manga App Screenshot',
    liveUrl: 'https://drive.google.com/uc?export=download&id=1ROMiwMhnldXHI2kZCt9bnl9j4ESQlVZD',
    codeUrl: 'https://github.com/Srinathnulidonda/manga-app'
  },
  {
    id: 'agriprice-tracker',
    title: 'AgriPrice Tracker',
    category: 'Web App',
    filters: ['web', 'ml'],
    description: 'AI-powered agricultural price prediction platform with real-time market data, trend analysis, and 7-day price forecasting using Random Forest ML model.',
    techStack: ['Flask', 'Python', 'Scikit-learn', 'Bootstrap', 'jQuery'],
    imageSrc: 'assets/images/projects/agriprice-tracker.png',
    imageAlt: 'AgriPrice Tracker',
    liveUrl: 'https://agriprice-tracker.onrender.com',
    codeUrl: 'https://github.com/srinathnulidonda/agriprice-tracker'
  },
  {
    id: 'nalanda-school-website',
    title: 'Nalanda High School Armoor Website',
    category: 'Educational Website',
    filters: ['web'],
    description: 'Comprehensive educational website for Nalanda High School Armoor featuring responsive design, interactive galleries, admission forms, academic program showcases, and integrated contact management system.',
    techStack: ['HTML5', 'CSS3', 'Bootstrap 5.3', 'AOS', 'Lightbox2', 'JavaScript'],
    imageSrc: 'assets/images/projects/nhs.png',
    imageAlt: 'Nalanda High School Armoor Website',
    liveUrl: 'https://nalandahighschool.vercel.app/',
    codeUrl: 'https://github.com/srinathnulidonda/nalandahighschool'
  },
  {
    id: 'drug-discovery',
    title: 'Drug Discovery Platform',
    category: 'Healthcare AI',
    filters: ['web', 'ml'],
    description: 'AI-powered drug discovery platform using machine learning algorithms to analyze molecular structures and predict drug efficacy.',
    techStack: ['Flask', 'Machine Learning', 'HTML/CSS/JS'],
    imageSrc: 'assets/images/projects/drug.png',
    imageAlt: 'Drug Discovery Platform',
    liveUrl: null,
    codeUrl: 'https://github.com/Srinathnulidonda'
  },
  {
    id: 'travel-recommendation',
    title: 'AI Travel Recommendation System',
    category: 'AI/ML Web App',
    filters: ['web', 'ml'],
    description: 'Intelligent travel recommendation platform using machine learning algorithms to suggest personalized destinations based on user preferences and behavior.',
    techStack: ['Flask', 'TensorFlow', 'Scikit-learn', 'NLTK', 'SQLAlchemy'],
    imageSrc: 'assets/images/projects/travel.png',
    imageAlt: 'Travel Recommendation System',
    liveUrl: 'https://travel-recommendation-wepu.onrender.com/',
    codeUrl: 'https://github.com/Srinathnulidonda/travel-recommendation'
  },
  {
    id: 'travel-newyork',
    title: 'Discover New York',
    category: 'Travel Website',
    filters: ['web', 'travel'],
    description: 'Interactive travel guide website for New York City featuring attractions, restaurants, and travel tips with responsive design and smooth animations.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    imageSrc: 'assets/images/projects/travel-nyc.png',
    imageAlt: 'Travel New York',
    liveUrl: 'https://travel-newyork.vercel.app/',
    codeUrl: 'https://github.com/Srinathnulidonda/travel-newyork'
  },
  {
    id: 'travel-rome',
    title: 'Explore Rome',
    category: 'Travel Website',
    filters: ['web', 'travel'],
    description: "Comprehensive travel website showcasing Rome's historical sites, culture, and cuisine with interactive maps and virtual tours.",
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    imageSrc: 'assets/images/projects/travel-rome.png',
    imageAlt: 'Travel Rome',
    liveUrl: 'https://travel-rome.vercel.app/',
    codeUrl: 'https://github.com/Srinathnulidonda/travel-rome'
  },
  {
    id: 'travel-paris',
    title: 'Visit Paris',
    category: 'Travel Website',
    filters: ['web', 'travel'],
    description: 'Elegant travel guide for Paris featuring iconic landmarks, art galleries, and culinary experiences with a focus on French culture and beauty.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    imageSrc: 'assets/images/projects/travel-paris.png',
    imageAlt: 'Travel Paris',
    liveUrl: 'https://travelparis.vercel.app/',
    codeUrl: 'https://github.com/Srinathnulidonda/travel-paris'
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    category: 'E-commerce',
    filters: ['web'],
    description: 'Full-featured e-commerce website with product catalog, shopping cart, payment integration, and user authentication system.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    imageSrc: 'assets/images/projects/e-commerces.png',
    imageAlt: 'E-commerce Website',
    liveUrl: 'https://e-commerce-two-henna-81.vercel.app/',
    codeUrl: 'https://github.com/Srinathnulidonda/e-commerce'
  }
];

function createProjectCard(project, isMobile = false) {
  const cls = isMobile ? 'project-item show' : 'col-lg-4 col-md-6 project-item show';
  const dataType = project.filters.includes('mobile') ? ' data-type="mobile"' : '';
  const liveBtn = project.liveUrl
    ? `<a href="${project.liveUrl}" class="project-action-btn" aria-label="View Project" target="_blank" rel="noopener"><i class="fas fa-eye"></i></a>`
    : `<span class="project-action-btn" aria-label="No Live Demo" style="opacity:0.4;cursor:default"><i class="fas fa-eye-slash"></i></span>`;
  const codeBtn = project.codeUrl
    ? `<a href="${project.codeUrl}" class="project-action-btn" aria-label="View Code" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>`
    : '';

  return `
    <div class="${cls} ${project.filters.join(' ')}" data-aos="fade-up">
      <div class="project-card"${dataType}>
        <div class="project-image">
          <div class="project-carousel">
            <div class="project-carousel-inner">
              <div class="project-carousel-item active">
                <img src="${project.imageSrc}" alt="${project.imageAlt}" loading="lazy" width="400" height="300">
              </div>
            </div>
          </div>
        </div>
        <div class="project-content">
          <div class="project-header">
            <div class="project-header-left">
              <div class="project-category">${project.category}</div>
              <h3 class="project-title">${project.title}</h3>
            </div>
            <div class="project-header-right">${liveBtn}${codeBtn}</div>
          </div>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        </div>
      </div>
    </div>`;
}

function renderProjects(containerId, isMobile) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = projectsData.map(p => createProjectCard(p, isMobile)).join('');
}

function initProjectCarousels() {
  document.querySelectorAll('.project-card').forEach(card => {
    const carousel = card.querySelector('.project-carousel');
    if (!carousel) return;
    const inner = carousel.querySelector('.project-carousel-inner');
    const items = carousel.querySelectorAll('.project-carousel-item');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prev = carousel.querySelector('.carousel-nav.prev');
    const next = carousel.querySelector('.carousel-nav.next');
    if (!inner || items.length <= 1) return;

    let current = 0;
    let transitioning = false;
    let touchStartX = 0;

    function go(idx, smooth = true) {
      if (transitioning && smooth) return;
      transitioning = true;
      current = idx;
      inner.style.transition = smooth ? 'transform 0.4s ease' : 'none';
      inner.style.transform = `translateX(${-100 * current}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      if (smooth) setTimeout(() => (transitioning = false), 400);
      else transitioning = false;
    }

    prev?.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); go((current - 1 + items.length) % items.length); });
    next?.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); go((current + 1) % items.length); });
    dots.forEach((d, i) => d.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); go(i); }));

    carousel.addEventListener('touchstart', e => (touchStartX = e.touches[0].clientX), { passive: true });
    carousel.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) go(diff > 0 ? (current + 1) % items.length : (current - 1 + items.length) % items.length);
      touchStartX = 0;
    }, { passive: true });

    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') go((current - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') go((current + 1) % items.length);
    });

    go(0, false);
  });
}

function filterProjects(category) {
  const items = document.querySelectorAll('.project-item');
  const delay = 80;
  let visible = 0;

  items.forEach(item => {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9) translateY(20px)';
  });

  setTimeout(() => {
    items.forEach(item => {
      const show = category === 'all' || item.classList.contains(category);
      if (show) {
        item.classList.remove('hide');
        item.classList.add('show');
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1) translateY(0)';
        }, visible * delay);
        visible++;
      } else {
        item.classList.remove('show');
        item.classList.add('hide');
        setTimeout(() => (item.style.display = 'none'), 300);
      }
    });
    rebuildMobileCarousel(category);
  }, 100);

  setTimeout(() => {
    initProjectCarousels();
    attachImageListeners();
  }, 500);
}

function rebuildMobileCarousel(category) {
  const wrapper = document.querySelector('.projects-carousel-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  const filtered = projectsData.filter(p => category === 'all' || p.filters.includes(category));
  filtered.forEach(project => {
    const temp = document.createElement('div');
    temp.innerHTML = createProjectCard(project, true);
    const el = temp.firstElementChild;
    el.style.opacity = '1';
    el.style.transform = 'scale(1) translateY(0)';
    el.style.display = 'block';
    wrapper.appendChild(el);
  });
  wrapper.scrollLeft = 0;
  setTimeout(attachImageListeners, 100);
}

function attachImageListeners() {
  document.querySelectorAll('.project-carousel-item img, .project-image img').forEach(img => {
    const clone = img.cloneNode(true);
    img.parentNode.replaceChild(clone, img);
    clone.style.cursor = 'pointer';
    clone.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const src = clone.src || clone.dataset.src;
      if (src && src !== 'undefined') openImageViewer(src);
    });
    clone.setAttribute('tabindex', '0');
    clone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = clone.src || clone.dataset.src;
        if (src && src !== 'undefined') openImageViewer(src);
      }
    });
  });
}

function openImageViewer(src) {
  const win = window.open('', '_blank');
  if (!win) { alert('Please allow pop-ups to view the image.'); return; }
  win.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Project Image</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0f;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}img{max-width:100%;max-height:95vh;object-fit:contain;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);cursor:zoom-in}img.zoomed{cursor:zoom-out;max-width:none;max-height:none}.close-btn{position:fixed;top:20px;right:20px;width:44px;height:44px;background:rgba(255,255,255,.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:1000;transition:all .3s}.close-btn:hover{background:rgba(255,255,255,.2);transform:scale(1.1)}.close-btn::before,.close-btn::after{content:'';position:absolute;width:20px;height:2px;background:#fff}.close-btn::before{transform:rotate(45deg)}.close-btn::after{transform:rotate(-45deg)}</style></head><body><div class="close-btn" onclick="window.close()"></div><img src="${src}" alt="Project Image" id="img"><script>const i=document.getElementById('img');let z=false;i.onclick=()=>{z=!z;i.classList.toggle('zoomed',z)};document.onkeydown=e=>{if(e.key==='Escape')window.close()};<\/script></body></html>`);
  win.document.close();
}

document.addEventListener('DOMContentLoaded', function () {
  renderProjects('projects-grid', false);
  renderProjects('projects-carousel', true);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterProjects(this.dataset.filter);
      this.style.transform = 'scale(0.95)';
      setTimeout(() => (this.style.transform = ''), 150);
    });
  });

  initProjectCarousels();
  attachImageListeners();
  filterProjects('all');

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const active = document.querySelector('.filter-btn.active');
      if (active && Utils.isMobile()) {
        rebuildMobileCarousel(active.dataset.filter);
      }
    }, 250);
  });

  window.attachProjectImageListeners = attachImageListeners;
  window.initializeProjectCarousels = initProjectCarousels;
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projectsData, createProjectCard, filterProjects };
}