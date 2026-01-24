const projectsData = [



  {
    id: 'cinebrain-entertainment-platform',
    title: 'CineBrain - AI Entertainment Platform',
    category: 'AI/ML Web App',
    filters: ['web', 'ml', 'fullstack'],
    description: 'AI-powered entertainment recommendation platform with personalized movie, TV show, and anime suggestions. Features advanced user management, reviews, and intelligent content discovery.',
    techStack: ['Flask', 'PostgreSQL', 'Redis', 'JavaScript ES6+', 'Bootstrap', 'TMDB API', 'JWT', 'Cloudinary'],
    imageSrc: 'assets/images/projects/cinebrain.png',
    imageAlt: 'CineBrain Entertainment Platform',
    liveUrl: 'https://cinebrain.vercel.app/',
    codeUrl: 'https://github.com/yourusername/cinebrain',
    aosDelay: 300
  },
  {
    id: 'weather-web',
    title: 'Weatherly Web App',
    category: 'Full Stack Web App',
    filters: ['web', 'api'],
    description: 'Modern weather application with real-time data, dynamic theming, weather animations, and PWA support. Features Flask backend and responsive frontend.',
    techStack: ['Flask', 'Python', 'JavaScript', 'CSS3', 'OpenWeather API', 'PWA'],
    imageSrc: 'assets/images/projects/weatherly-web.png',
    imageAlt: 'Weatherly Weather Application',
    liveUrl: "https://getweatherly.vercel.app/",
    codeUrl: 'https://github.com/Srinathnulidonda/weatherly',
    aosDelay: 300
  },
  {
    id: 'weatherly-flutter-app',
    title: 'Weatherly Mobile App',
    category: 'Mobile Application',
    filters: ['mobile', 'flutter'],
    description: 'Native Flutter weather app with dynamic theming, weather animations, and real-time forecasts. Built with Material 3 design and offline support.',
    techStack: ['Flutter', 'Dart', 'Material 3', 'REST API'],
    imageSrc: 'assets/images/projects/weatherly-app.png',
    imageAlt: 'Weatherly Flutter Weather Application',
    liveUrl: 'https://drive.google.com/uc?export=download&id=10lPOkrf2HACA6ht-cirq_ubcW6adB_W2',
    codeUrl: 'https://github.com/Srinathnulidonda/weatherly',
    aosDelay: 300
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
    liveUrl: "https://drive.google.com/uc?export=download&id=1ROMiwMhnldXHI2kZCt9bnl9j4ESQlVZD",
    codeUrl: 'https://github.com/Srinathnulidonda/manga-app',
    aosDelay: 100
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
    codeUrl: 'https://github.com/srinathnulidonda/agriprice-tracker',
    aosDelay: 300
  },
  {
    id: 'nalanda-school-website',
    title: 'Nalanda High School Armoor Website',
    category: 'Educational Website',
    filters: ['web', 'responsive', 'education'],
    description: 'Comprehensive educational website for Nalanda High School Armoor featuring responsive design, interactive galleries, admission forms, academic program showcases, and integrated contact management system.',
    techStack: ['HTML5', 'CSS3', 'Bootstrap 5.3', 'AOS', 'Lightbox2', 'JavaScript'],
    imageSrc: 'assets/images/projects/nhs.png',
    imageAlt: 'Nalanda High School Armoor Website',
    liveUrl: 'https://nalandahighschool.vercel.app/',
    codeUrl: 'https://github.com/srinathnulidonda/nalandahighschool',
    aosDelay: 200
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
    codeUrl: 'https://github.com/Srinathnulidonda',
    aosDelay: 200
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
    codeUrl: 'https://github.com/Srinathnulidonda/travel-recommendation',
    aosDelay: 200
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
    codeUrl: 'https://github.com/Srinathnulidonda/travel-newyork',
    aosDelay: 100
  },
  {
    id: 'travel-rome',
    title: 'Explore Rome',
    category: 'Travel Website',
    filters: ['web', 'travel'],
    description: 'Comprehensive travel website showcasing Rome\'s historical sites, culture, and cuisine with interactive maps and virtual tours.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    imageSrc: 'assets/images/projects/travel-rome.png',
    imageAlt: 'Travel Rome',
    liveUrl: 'https://travel-rome.vercel.app/',
    codeUrl: 'https://github.com/Srinathnulidonda/travel-rome',
    aosDelay: 200
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
    codeUrl: 'https://github.com/Srinathnulidonda/travel-paris',
    aosDelay: 300
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
    codeUrl: 'https://github.com/Srinathnulidonda/e-commerce',
    aosDelay: 100
  },




];

function createProjectCard(project, isMobile = false) {
  const cardClasses = isMobile ? 'project-item show' : 'col-lg-4 col-md-6 project-item show';
  const filterClasses = project.filters.join(' ');
  const dataType = project.filters.includes('mobile') ? ' data-type="mobile"' : '';

  return `
    <div class="${cardClasses} ${filterClasses}" data-aos="fade-up" data-aos-delay="${project.aosDelay}">
      <div class="project-card"${dataType}>
        <div class="project-image">
          <div class="project-carousel">
            <div class="project-carousel-inner">
              <div class="project-carousel-item active">
                <img src="${project.imageSrc}" alt="${project.imageAlt}" loading="lazy">
              </div>
            </div>
          </div>
        </div>
        <div class="project-content">
          <div class="project-header">
            <div class="project-header-left">
              <div class="project-category">${project.category}</div>
              <h5 class="project-title">${project.title}</h5>
            </div>
            <div class="project-header-right">
              ${project.liveUrl ?
      `<a href="${project.liveUrl}" class="project-action-btn" aria-label="View Project" target="_blank">
                  <i class="fas fa-eye"></i>
                </a>` :
      `<a href="#" class="project-action-btn" aria-label="View Project">
                  <i class="fas fa-eye"></i>
                </a>`
    }
              ${project.codeUrl ?
      `<a href="${project.codeUrl}" class="project-action-btn" aria-label="View Code" target="_blank">
                  <i class="fab fa-github"></i>
                </a>` : ''
    }
            </div>
          </div>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProjectsGrid() {
  const gridContainer = document.getElementById('projects-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = projectsData
    .map(project => createProjectCard(project, false))
    .join('');
}

function renderProjectsCarousel() {
  const carouselContainer = document.getElementById('projects-carousel');
  if (!carouselContainer) return;

  carouselContainer.innerHTML = projectsData
    .map(project => createProjectCard(project, true))
    .join('');
}

function initializeProjectCarousels() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const carousel = card.querySelector('.project-carousel');
    if (!carousel) return;

    const carouselInner = carousel.querySelector('.project-carousel-inner');
    const items = carousel.querySelectorAll('.project-carousel-item');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-nav.prev');
    const nextBtn = carousel.querySelector('.carousel-nav.next');

    if (!carouselInner || items.length <= 1) return;

    let currentIndex = 0;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel(index, smooth = true) {
      if (isTransitioning && smooth) return;
      isTransitioning = true;

      currentIndex = index;
      const translateX = -100 * currentIndex;

      if (smooth) {
        carouselInner.style.transition = 'transform 0.4s ease';
      } else {
        carouselInner.style.transition = 'none';
      }

      carouselInner.style.transform = `translateX(${translateX}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      if (smooth) {
        setTimeout(() => {
          isTransitioning = false;
        }, 400);
      } else {
        isTransitioning = false;
      }
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % items.length;
      updateCarousel(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel(prevIndex);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateCarousel(index);
      });
    });

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      if (!touchStartX) return;

      const touchCurrentX = e.touches[0].clientX;
      const diff = touchStartX - touchCurrentX;

      if (Math.abs(diff) > 5) {
        e.preventDefault();
        const currentTranslate = -100 * currentIndex;
        const swipeTranslate = currentTranslate - (diff / carousel.offsetWidth) * 100;
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = `translateX(${swipeTranslate}%)`;
      }
    }, { passive: false });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else {
        updateCarousel(currentIndex);
      }

      touchStartX = 0;
      touchEndX = 0;
    }

    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    updateCarousel(0, false);
  });
}

function filterProjects(category) {
  const projectItems = document.querySelectorAll('.project-item');
  const projectsCarousel = document.querySelector('.projects-carousel-wrapper');
  let visibleCount = 0;
  const animationDelay = 80;

  projectItems.forEach(item => {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9) translateY(20px)';
  });

  setTimeout(() => {
    projectItems.forEach((item, index) => {
      const shouldShow = category === 'all' || item.classList.contains(category);

      if (shouldShow) {
        item.classList.remove('hide');
        item.classList.add('show');
        item.style.display = 'block';

        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1) translateY(0)';
        }, visibleCount * animationDelay);

        visibleCount++;
      } else {
        item.classList.remove('show');
        item.classList.add('hide');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });

    updateMobileCarousel(category);

  }, 100);

  setTimeout(() => {
    if (typeof initializeProjectCarousels === 'function') {
      initializeProjectCarousels();
    }
    if (window.attachProjectImageListeners) {
      window.attachProjectImageListeners();
    }
  }, 500);
}

function updateMobileCarousel(category) {
  const projectsCarousel = document.querySelector('.projects-carousel-wrapper');
  if (!projectsCarousel) return;

  projectsCarousel.innerHTML = '';

  const filteredProjects = projectsData.filter(project => {
    return category === 'all' || project.filters.includes(category);
  });

  filteredProjects.forEach((project, index) => {
    const projectCard = createProjectCard(project, true);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = projectCard;
    const cardElement = tempDiv.firstElementChild;

    cardElement.style.opacity = '1';
    cardElement.style.transform = 'scale(1) translateY(0)';
    cardElement.style.display = 'block';

    projectsCarousel.appendChild(cardElement);
  });

  projectsCarousel.scrollLeft = 0;

  if (window.attachProjectImageListeners) {
    setTimeout(() => {
      window.attachProjectImageListeners();
    }, 100);
  }
}

function initializeFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterCategory = this.getAttribute('data-filter');
      filterProjects(filterCategory);

      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}

function initializeFiltering() {
  const projectItems = document.querySelectorAll('.project-item');
  const filterButtons = document.querySelectorAll('.filter-btn');

  projectItems.forEach(item => {
    item.classList.remove('hide');
    item.classList.add('show');
    item.style.opacity = '1';
    item.style.transform = 'scale(1) translateY(0)';
    item.style.display = 'block';
  });

  filterButtons.forEach(btn => btn.classList.remove('active'));
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.classList.add('active');
  }

  updateMobileCarousel('all');
}

function initializeMobileCarousel() {
  const container = document.querySelector('.projects-container');
  if (!container) return;

  const grid = container.querySelector('.projects-grid');
  const carouselContainer = container.querySelector('.projects-carousel-container');
  const carouselWrapper = container.querySelector('.projects-carousel-wrapper');

  if (!grid || !carouselContainer || !carouselWrapper) return;

  const visibleItems = grid.querySelectorAll('.project-item.show, .project-item:not(.hide)');

  carouselWrapper.innerHTML = '';

  visibleItems.forEach(item => {
    if (item.style.display !== 'none') {
      const clonedItem = item.cloneNode(true);
      clonedItem.classList.remove('col-lg-4', 'col-md-6');
      clonedItem.style.opacity = '1';
      clonedItem.style.transform = 'scale(1) translateY(0)';
      carouselWrapper.appendChild(clonedItem);
    }
  });

  carouselWrapper.scrollLeft = 0;
}

function attachImageClickListeners() {
  const projectImages = document.querySelectorAll('.project-carousel-item img, .project-image img');

  projectImages.forEach(img => {
    const newImg = img.cloneNode(true);
    img.parentNode.replaceChild(newImg, img);

    newImg.style.cursor = 'pointer';

    newImg.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const imageSrc = this.src || this.dataset.src;
      if (imageSrc && imageSrc !== 'undefined') {
        openImageInNewTab(imageSrc);
      }
    });

    newImg.setAttribute('tabindex', '0');
    newImg.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const imageSrc = this.src || this.dataset.src;
        if (imageSrc && imageSrc !== 'undefined') {
          openImageInNewTab(imageSrc);
        }
      }
    });
  });
}

function openImageInNewTab(imageSrc) {
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Image - Srinath Nulidonda</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #0a0a0f;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            font-family: 'Inter', sans-serif;
          }
          img {
            max-width: 100%;
            max-height: 95vh;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            cursor: zoom-in;
          }
          img.zoomed {
            cursor: zoom-out;
            max-width: none;
            max-height: none;
          }
          .close-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
          }
          .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
          }
          .close-btn::before,
          .close-btn::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 2px;
            background: white;
          }
          .close-btn::before { transform: rotate(45deg); }
          .close-btn::after { transform: rotate(-45deg); }
        </style>
      </head>
      <body>
        <div class="close-btn" onclick="window.close()"></div>
        <img src="${imageSrc}" alt="Project Image" id="mainImage">
        <script>
          const img = document.getElementById('mainImage');
          let isZoomed = false;
          img.addEventListener('click', function() {
            isZoomed = !isZoomed;
            this.classList.toggle('zoomed', isZoomed);
          });
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') window.close();
          });
        </script>
      </body>
      </html>
    `);
    newWindow.document.close();
  } else {
    alert('Please allow pop-ups to view the image in full size.');
  }
}

function adjustProjectSectionSpacing() {
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    const titleRow = projectsSection.querySelector('.row.justify-content-center.mb-5');
    const filterRow = projectsSection.querySelector('.row.justify-content-center');
    const projectsContainer = projectsSection.querySelector('.projects-container');

    if (titleRow) {
      titleRow.style.marginBottom = '0.5rem';
    }

    if (filterRow && filterRow.querySelector('.filter-buttons')) {
      filterRow.style.marginBottom = '0';
    }

    if (projectsContainer) {
      projectsContainer.style.marginTop = '0';
      projectsContainer.style.paddingTop = '0';
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderProjectsGrid();
  renderProjectsCarousel();
  initializeFilterButtons();
  initializeProjectCarousels();
  attachImageClickListeners();
  initializeFiltering();
  filterProjects('all');
  adjustProjectSectionSpacing();

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const activeFilter = document.querySelector('.filter-btn.active');
      if (activeFilter) {
        const currentCategory = activeFilter.getAttribute('data-filter');
        if (window.innerWidth <= 768) {
          updateMobileCarousel(currentCategory);
          if (window.attachProjectImageListeners) {
            window.attachProjectImageListeners();
          }
        }
      }
    }, 250);
  });

  window.attachProjectImageListeners = attachImageClickListeners;
  window.initializeMobileCarousel = initializeMobileCarousel;
  window.initializeProjectCarousels = initializeProjectCarousels;
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projectsData, createProjectCard, filterProjects };
}