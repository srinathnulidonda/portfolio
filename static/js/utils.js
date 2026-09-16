// static/js/utils.js
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
  }
};

window.Utils = Utils;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}