/* static/js/utils.js */
const Utils = {
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const navbarHeight = document.getElementById('mainNav')?.offsetHeight || 0;
    window.scrollTo({ top: element.offsetTop - navbarHeight, behavior: 'smooth' });
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  showNotification(message, type = 'info') {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>${Utils.escapeHtml(message)}
      </div>
      <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    document.body.appendChild(notification);
    requestAnimationFrame(() => (notification.style.transform = 'translateX(0)'));

    const remove = () => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    };

    notification.querySelector('.notification-close').addEventListener('click', remove);
    setTimeout(remove, 5000);
  },

  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
  },

  getTime() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  },

  trackEvent(eventName, data = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, { event_category: 'Portfolio', ...data });
    }
  },

  isMobile() {
    return window.innerWidth <= 768;
  },

  supportsIntersectionObserver() {
    return 'IntersectionObserver' in window;
  }
};

window.Utils = Utils;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}