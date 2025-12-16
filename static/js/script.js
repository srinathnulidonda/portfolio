document.addEventListener('DOMContentLoaded', function () {

    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    const navbar = document.getElementById('mainNav');
    const navbarBrand = document.querySelector('.navbar-brand');

    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.background = 'rgba(14, 18, 30, 0.85)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 4px 20px rgba(14, 18, 30, 0.85)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.background = 'rgba(20, 25, 40, 0)';
            navbar.style.backdropFilter = 'blur(0px)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: [
                'Full Stack Development',
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
            cursorChar: '|',
            autoInsertCss: true,
        });
    }

    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        function toggleBackToTopButton() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }

        window.addEventListener('scroll', throttle(toggleBackToTopButton, 100));

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        const charCount = document.querySelector('#char-count');
        const progressFill = document.querySelector('#progress-fill');

        if (messageInput && charCount && progressFill) {
            messageInput.addEventListener('input', function () {
                const length = this.value.length;
                const maxLength = this.maxLength;

                charCount.textContent = length;

                const percentage = (length / maxLength) * 100;
                progressFill.style.width = percentage + '%';

                if (percentage > 90) {
                    progressFill.style.background = 'linear-gradient(90deg, #dc3545, rgba(220, 53, 69, 0.3))';
                } else if (percentage > 70) {
                    progressFill.style.background = 'linear-gradient(90deg, #ffc107, rgba(255, 193, 7, 0.3))';
                } else {
                    progressFill.style.background = 'linear-gradient(90deg, var(--primary-color), rgba(13, 110, 253, 0.3))';
                }
            });
        }

        if (nameInput) {
            nameInput.addEventListener('input', function () {
                validateField(this);
            });
        }

        if (emailInput) {
            emailInput.addEventListener('input', function () {
                validateField(this);
            });
        }

        if (messageInput) {
            messageInput.addEventListener('input', function () {
                validateField(this);
            });
        }

        function validateField(field) {
            const isValid = field.checkValidity();

            if (isValid) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
            }
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            const submitButton = this.querySelector('#submit-btn');
            const btnText = submitButton.querySelector('.btn-text');
            const loadingSpinner = submitButton.querySelector('.loading-spinner');
            const sendIcon = submitButton.querySelector('#send-icon');

            btnText.style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
            sendIcon.style.display = 'none';
            submitButton.disabled = true;

            setTimeout(() => {
                btnText.style.display = 'inline';
                loadingSpinner.style.display = 'none';
                sendIcon.style.display = 'inline';
                submitButton.disabled = false;

                showNotification('Message sent successfully!', 'success');

                this.reset();
                this.classList.remove('was-validated');

                if (charCount) charCount.textContent = '0';
                if (progressFill) progressFill.style.width = '0%';

                this.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
            }, 2000);
        });
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button class="notification-close">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);

        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }

    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
    }

    const skillBars = document.querySelectorAll('.skill-progress');

    if (skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = progress + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillsObserver.observe(bar));
    }

    const heroBgParallax = document.querySelector('.hero-bg-parallax');
    if (heroBgParallax) {
        let ticking = false;

        function updateBgParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            heroBgParallax.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking && window.innerWidth > 768) {
                window.requestAnimationFrame(updateBgParallax);
                ticking = true;
            }
        });
    }

    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 200;
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function () {
            this.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            const isClickInsideNav = navbar.contains(event.target);
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    if ('PerformanceObserver' in window) {
        try {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                        console.log('Page Load Time:', entry.loadEventEnd - entry.fetchStart);
                    }
                }
            });

            perfObserver.observe({ entryTypes: ['navigation'] });
        } catch (e) {
            console.log('PerformanceObserver not supported');
        }
    }

    console.log('%c👨‍💻 Welcome to Srinath Nulidonda\'s Portfolio!',
        'color: #007bff; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub: https://github.com/Srinathnulidonda',
        'color: #28a745; font-size: 12px;');
});

window.portfolioUtils = {
    scrollTo: function (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const navbarHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = element.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    copyToClipboard: function (text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!', 'success');
        });
    },

    showNotification: function (message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button class="notification-close">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);

        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    },

    formatDate: function (date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    debounce: function (func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: function (func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.portfolioUtils;
}