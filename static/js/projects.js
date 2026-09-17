// static/js/projects.js
const projectsData = [
  {
    id: 'cinebrain',
    title: 'CineBrain',
    category: 'AI/ML Web App',
    filters: ['web', 'ml'],
    description: 'AI-powered entertainment platform for discovering movies, TV shows, and anime with personalized recommendations, reviews, and intelligent content discovery.',
    techStack: ['Flask', 'PostgreSQL', 'Redis', 'JavaScript', 'TMDB API', 'JWT', 'Cloudinary'],
    imageSrc: 'assets/images/projects/cinebrain.png',
    imageAlt: 'CineBrain AI entertainment platform',
    liveUrl: 'https://cinebrain.vercel.app/',
    codeUrl: 'https://github.com/srinathnulidonda/cinebrain'
  },
  {
    id: 'toolverse',
    title: 'Toolverse',
    category: 'Developer & Productivity Platform',
    filters: ['web'],
    description: 'Modern collection of fast developer and productivity tools including JSON, encoding, UUID, password, QR code, and PDF utilities.',
    techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    imageSrc: 'assets/images/projects/toolverse.png',
    imageAlt: 'Toolverse developer and productivity tools platform',
    liveUrl: 'https://toolverses.vercel.app',
    codeUrl: 'https://github.com/srinathnulidonda/toolverse'
  },
  {
    id: 'manga-reader',
    title: 'Manga Reader',
    category: 'Full Stack Web & Mobile App',
    filters: ['web', 'mobile'],
    description: 'Cross-platform manga reading application with multi-source content, advanced reading modes, bookmarks, reading history, authentication, and synchronized user data.',
    techStack: ['React', 'Flutter', 'FastAPI', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    imageSrc: 'assets/images/projects/justscroll.png',
    imageAlt: 'Manga Reader cross-platform application',
    liveUrl: 'https://justscroll.vercel.app',
    codeUrl: 'https://github.com/srinathnulidonda/justscroll'
  },
  {
    id: 'weather-visualizer',
    title: 'Weather Visualizer',
    category: 'Full Stack Web & Mobile App',
    filters: ['web', 'mobile'],
    description: 'Modern weather platform providing real-time weather information, forecasts, dynamic weather themes, animations, and responsive web and mobile experiences.',
    techStack: ['Flask', 'Python', 'JavaScript', 'Flutter', 'Dart', 'OpenWeather API', 'PWA'],
    imageSrc: 'assets/images/projects/weatherly-web.png',
    imageAlt: 'Weather Visualizer weather application',
    liveUrl: 'https://getweatherly.vercel.app/',
    codeUrl: 'https://github.com/Srinathnulidonda/weatherly'
  },
  {
    id: 'smartcrop',
    title: 'SmartCrop',
    category: 'AI/ML Web App',
    filters: ['web', 'ml'],
    description: 'Machine learning agricultural platform that recommends suitable crops using environmental and agricultural data with weather and location-based information.',
    techStack: ['Python', 'Flask', 'Scikit-learn', 'PostgreSQL', 'OpenWeather API', 'Google Maps'],
    imageSrc: 'assets/images/projects/agriprice-tracker.png',
    imageAlt: 'SmartCrop agricultural recommendation platform',
    liveUrl: 'https://agriprice-tracker.onrender.com',
    codeUrl: 'https://github.com/srinathnulidonda/agriprice-tracker'
  },
  {
    id: 'travelbuddy',
    title: 'TravelBuddy',
    category: 'AI/ML Web App',
    filters: ['web', 'ml'],
    description: 'Intelligent travel recommendation platform using machine learning to suggest personalized destinations based on user preferences and travel requirements.',
    techStack: ['Python', 'Flask', 'Scikit-learn', 'NLTK', 'SQLAlchemy'],
    imageSrc: 'assets/images/projects/travel.png',
    imageAlt: 'TravelBuddy AI travel recommendation platform',
    liveUrl: 'https://travel-recommendation-wepu.onrender.com/',
    codeUrl: 'https://github.com/Srinathnulidonda/travel-recommendation'
  },
  {
    id: 'sridhar-internet-services',
    title: 'Sridhar Internet Services',
    category: 'Full Stack Web App',
    filters: ['web'],
    description: 'Responsive business website and service platform with service information, job postings, contact functionality, and a backend-powered management system.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastApi', 'PostgreSQL'],
    imageSrc: 'assets/images/projects/sridhar.png',
    imageAlt: 'Sridhar Internet Services business website',
    liveUrl: "https://sridharinternetservices.vercel.app",
    codeUrl: null
  },
  {
    id: 'nalanda-high-school',
    title: 'Nalanda High School Website',
    category: 'Educational Website',
    filters: ['web'],
    description: 'Responsive educational website featuring academic information, galleries, admission forms, interactive sections, animations, and contact functionality.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'AOS', 'Lightbox2'],
    imageSrc: 'assets/images/projects/nhs.png',
    imageAlt: 'Nalanda High School educational website',
    liveUrl: 'https://finalnhs.vercel.app/',
    codeUrl: 'https://github.com/srinathnulidonda/nalandahighschool'
  }
];

function createProjectCard(project, isMobile = false) {
  const cls = isMobile ? 'project-item show' : 'col-lg-4 col-md-6 project-item show';
  const dataType = project.filters.includes('mobile') && !project.filters.includes('web') ? ' data-type="mobile"' : '';
  const liveBtn = project.liveUrl
    ? `<a href="${project.liveUrl}" class="project-action-btn" aria-label="View live project" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i></a>`
    : `<span class="project-action-btn" aria-label="No live demo available" aria-disabled="true" style="opacity:0.4;cursor:default"><i class="fas fa-eye-slash"></i></span>`;
  const codeBtn = project.codeUrl
    ? `<a href="${project.codeUrl}" class="project-action-btn" aria-label="View source code" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>`
    : '';

  return `
    <div class="${cls} ${project.filters.join(' ')}" data-aos="fade-up">
      <div class="project-card"${dataType}>
        <div class="project-image">
          <div class="project-carousel">
            <div class="project-carousel-inner">
              <div class="project-carousel-item">
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

function attachImageListeners() {
  document.querySelectorAll('.project-carousel-item img').forEach(img => {
    const clone = img.cloneNode(true);
    img.parentNode.replaceChild(clone, img);
    clone.setAttribute('tabindex', '0');
    clone.addEventListener('click', () => openImageViewer(clone.src));
    clone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openImageViewer(clone.src);
      }
    });
  });
}

function openImageViewer(src) {
  const win = window.open('', '_blank');
  if (!win) { alert('Please allow pop-ups to view the image.'); return; }
  win.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Project Image</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0f;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}img{max-width:100%;max-height:95vh;object-fit:contain;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);cursor:zoom-in}img.zoomed{cursor:zoom-out;max-width:none;max-height:none}.close-btn{position:fixed;top:20px;right:20px;width:44px;height:44px;background:rgba(255,255,255,.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:1000}.close-btn::before,.close-btn::after{content:'';position:absolute;width:20px;height:2px;background:#fff}.close-btn::before{transform:rotate(45deg)}.close-btn::after{transform:rotate(-45deg)}</style></head><body><div class="close-btn" onclick="window.close()"></div><img src="${src}" alt="Project Image" id="img"><script>const i=document.getElementById('img');let z=false;i.onclick=()=>{z=!z;i.classList.toggle('zoomed',z)};document.onkeydown=e=>{if(e.key==='Escape')window.close()};<\/script></body></html>`);
  win.document.close();
}

function filterProjects(category) {
  const items = document.querySelectorAll('.project-item');
  const delay = 80;
  let visible = 0;

  items.forEach(item => {
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

  setTimeout(attachImageListeners, 500);
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

document.addEventListener('DOMContentLoaded', function () {
  renderProjects('projects-grid', false);
  renderProjects('projects-carousel', true);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterProjects(this.dataset.filter);
    });
  });

  attachImageListeners();
  filterProjects('all');

  window.addEventListener('resize', Utils.debounce(() => {
    const active = document.querySelector('.filter-btn.active');
    if (active && Utils.isMobile()) {
      rebuildMobileCarousel(active.dataset.filter);
    }
  }, 250));
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projectsData, createProjectCard, filterProjects };
}