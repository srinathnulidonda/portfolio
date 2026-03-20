/* static/js/chatbot.js */
class SrinathChatbot {
  constructor() {
    this.state = { isOpen: false, isTyping: false, messageHistory: [], sessionStart: Date.now() };
    this.config = { typingDelay: 1000, typingVariation: 500, maxHistory: 50, greetingDelay: 800, whatsappNumber: '917013850214' };
    this.quickReplies = {
      initial: ['About Srinath', 'View Projects', 'Contact Info', 'Skills'],
      projects: ['Mobile Apps', 'AI/ML Projects', 'Web Development', 'All Projects'],
      skills: ['Frontend', 'Backend', 'Mobile', 'AI/ML'],
      contact: ['Email', 'LinkedIn', 'GitHub', 'Schedule Call']
    };
    this.responses = this.buildResponses();
    this.keywords = this.buildKeywords();
    this.init();
  }

  init() {
    this.el = {
      toggle: document.getElementById('chatToggle'),
      container: document.getElementById('chatContainer'),
      body: document.getElementById('chatBody'),
      input: document.getElementById('messageInput'),
      sendBtn: document.getElementById('sendButton'),
      whatsappBtn: document.getElementById('whatsappButton'),
      typing: document.getElementById('typingIndicator')
    };
    this.bindEvents();
    this.loadHistory();
    this.initAnimations();
  }

  bindEvents() {
    this.el.toggle?.addEventListener('click', () => this.toggle());
    document.addEventListener('click', e => { if (e.target.closest('.chat-close')) { e.preventDefault(); e.stopPropagation(); this.close(); } });
    this.el.sendBtn?.addEventListener('click', () => this.handleSend());
    this.el.input?.addEventListener('keypress', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.handleSend(); } });
    this.el.whatsappBtn?.addEventListener('click', () => this.openWhatsApp());
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.state.isOpen) this.close(); });
    document.addEventListener('click', e => { if (e.target.classList.contains('quick-reply')) this.handleQuickReply(e.target.textContent); });
  }

  buildResponses() {
    return {
      greeting: [{ text: "Hello! 👋 I'm Srinath's AI assistant. How can I help you today?", quickReplies: this.quickReplies.initial }],
      about: [{ text: "Srinath is a Full Stack Developer from Hyderabad, India 🇮🇳\n\n💼 Builds end-to-end web & mobile solutions\n🚀 12+ projects delivered across web, mobile & AI\n⚡ Specializes in React, Flask, Flutter & ML\n✅ Available for hire — immediate start\n\nWant to see his work or discuss a project?", quickReplies: ['View Projects', 'Technical Skills', 'Hire Srinath'] }],
      projects: [{ text: "Here are Srinath's key projects:\n\n🌐 **Web Apps**\n• CineBrain — AI Entertainment Platform\n• Weatherly — Full Stack Weather App\n• AgriPrice Tracker — ML Price Prediction\n\n📱 **Mobile Apps**\n• Manga Reading App (Flutter)\n• Weatherly Mobile (Flutter)\n\n🤖 **AI/ML**\n• Travel Recommendation System\n• Drug Discovery Platform\n\nWhich category interests you?", quickReplies: this.quickReplies.projects }],
      skills: [{ text: "Srinath's Technical Expertise:\n\n**Frontend** 🎨\n• React, Next.js, JavaScript\n• HTML5, CSS3, Bootstrap, Tailwind\n\n**Backend** ⚙️\n• Flask, Python, REST APIs\n• PostgreSQL, Redis, Firebase\n\n**Mobile** 📱\n• Flutter, Dart\n• Cross-platform iOS & Android\n\n**AI/ML** 🤖\n• TensorFlow, Scikit-learn, NLTK\n• Predictive Models, Data Analysis\n\nWhat would you like to explore?", quickReplies: this.quickReplies.skills }],
      contact: [{ text: "Let's connect with Srinath:\n\n📧 **Email**: srinathnulidonda@gmail.com\n💼 **LinkedIn**: [Connect on LinkedIn](https://linkedin.com/in/srinath-nulidonda-1a4230256/)\n🐙 **GitHub**: [View Projects](https://github.com/Srinathnulidonda)\n🐦 **Twitter**: @srinath2973\n\nResponse time: Usually within 24 hours", quickReplies: this.quickReplies.contact }],
      mobile: [{ text: "Srinath's Mobile Development:\n\n📱 **Flutter Expertise**\n• Cross-platform apps (iOS & Android)\n• Beautiful UI/UX with Material Design\n• State management & API integration\n\n**Featured Apps:**\n• 📖 Manga Reading App — Offline reading, bookmarks\n• 🌤️ Weatherly — Real-time forecasts, Material 3\n\nInterested in mobile app development?", quickReplies: ['View Portfolio', 'Contact for Project'] }],
      ai: [{ text: "AI/ML Projects by Srinath:\n\n🤖 **Travel Recommendation System**\n• ML algorithms for personalized suggestions\n\n💊 **Drug Discovery Platform**\n• Molecular structure analysis\n\n🌾 **AgriPrice Tracker**\n• Random Forest price prediction\n\n🎬 **CineBrain**\n• AI-powered content discovery\n\nWant to discuss AI solutions?", quickReplies: ['Learn More', 'Start AI Project'] }],
      hire: [{ text: "Great choice! Srinath is available for:\n\n✅ Full-time positions\n✅ Freelance projects\n✅ Technical consulting\n✅ Startup collaborations\n\n📊 **12+ projects** delivered\n⚡ **Immediate** availability\n🌍 **Remote** — yes\n📍 Hyderabad, India\n\nLet's discuss your requirements!", quickReplies: ['Send Email', 'WhatsApp Chat', 'View Resume'] }],
      error: [{ text: "I didn't quite catch that. Here are some things you can ask me about:\n\n• Srinath's background and experience\n• His projects and portfolio\n• Technical skills and expertise\n• How to get in touch or hire him\n\nWhat would you like to know?", quickReplies: this.quickReplies.initial }]
    };
  }

  buildKeywords() {
    return {
      greeting: /^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))$/i,
      about: /about|who|bio|background|story|srinath|tell\s+me/i,
      projects: /project|portfolio|work|built|created|developed|apps|websites/i,
      skills: /skill|tech|stack|programming|language|framework|tool/i,
      contact: /contact|reach|email|linkedin|github|connect|touch|call/i,
      mobile: /mobile|flutter|dart|android|ios|app/i,
      ai: /ai|artificial|intelligence|machine|learning|ml|tensorflow|data/i,
      hire: /hire|job|opportunity|freelance|work|available|collaborate|recruit/i
    };
  }

  toggle() {
    this.state.isOpen ? this.close() : this.open();
  }

  open() {
    this.state.isOpen = true;
    this.el.container?.classList.add('active');
    this.el.toggle?.classList.add('active');
    this.el.input?.focus();
    if (!this.state.messageHistory.length) {
      setTimeout(() => this.sendBot(this.responses.greeting[0]), this.config.greetingDelay);
    }
    Utils.trackEvent('chat_opened');
  }

  close() {
    this.state.isOpen = false;
    this.el.container?.classList.remove('active');
    this.el.toggle?.classList.remove('active');
    this.saveHistory();
    Utils.trackEvent('chat_closed');
  }

  handleSend() {
    const msg = this.el.input?.value.trim();
    if (!msg || this.state.isTyping) return;
    this.addUserMsg(msg);
    this.el.input.value = '';
    this.process(msg);
  }

  handleQuickReply(text) {
    this.addUserMsg(text);
    this.process(text);
  }

  process(msg) {
    this.showTyping();
    setTimeout(() => this.sendBot(this.generateResponse(msg)), this.config.typingDelay + Math.random() * this.config.typingVariation);
  }

  generateResponse(input) {
    const msg = input.toLowerCase();
    for (const [cat, pattern] of Object.entries(this.keywords)) {
      if (pattern.test(msg)) return this.responses[cat][0];
    }
    if (msg.includes('view resume')) { window.open('assets/resume.pdf', '_blank'); return { text: "Opening Srinath's resume! 📄", quickReplies: this.quickReplies.initial }; }
    if (msg.includes('send email')) { window.location.href = 'mailto:srinathnulidonda@gmail.com'; return { text: "Opening email client! 📧", quickReplies: this.quickReplies.initial }; }
    return this.responses.error[0];
  }

  addUserMsg(text) {
    this.el.body?.insertAdjacentHTML('beforeend', `
      <div class="message user-message"><div class="message-content">${Utils.escapeHtml(text)}</div><div class="message-time">${Utils.getTime()}</div></div>`);
    this.scrollBottom();
    this.state.messageHistory.push({ type: 'user', text, time: Date.now() });
    this.trimHistory();
  }

  sendBot(response) {
    this.hideTyping();
    const qr = response.quickReplies ? `<div class="quick-replies">${response.quickReplies.map(r => `<button class="quick-reply">${r}</button>`).join('')}</div>` : '';
    this.el.body?.insertAdjacentHTML('beforeend', `
      <div class="message bot-message">
        <div class="message-avatar"><i class="fas fa-headset"></i></div>
        <div class="message-wrapper">
          <div class="message-content">${this.formatMsg(response.text)}</div>${qr}
          <div class="message-time">${Utils.getTime()}</div>
        </div>
      </div>`);
    this.scrollBottom();
    this.state.messageHistory.push({ type: 'bot', ...response, time: Date.now() });
    this.trimHistory();
  }

  formatMsg(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  showTyping() {
    this.state.isTyping = true;
    if (this.el.typing) { this.el.typing.style.display = 'flex'; this.scrollBottom(); }
  }

  hideTyping() {
    this.state.isTyping = false;
    if (this.el.typing) this.el.typing.style.display = 'none';
  }

  scrollBottom() {
    if (this.el.body) this.el.body.scrollTop = this.el.body.scrollHeight;
  }

  openWhatsApp() {
    window.open(`https://wa.me/${this.config.whatsappNumber}?text=${encodeURIComponent("Hi Srinath! I visited your portfolio and I'm interested in discussing a project with you.")}`, '_blank');
    Utils.trackEvent('whatsapp_opened');
  }

  saveHistory() {
    try { localStorage.setItem('chatHistory', JSON.stringify(this.state.messageHistory)); } catch (e) { /* silent */ }
  }

  loadHistory() {
    try { const h = localStorage.getItem('chatHistory'); if (h) this.state.messageHistory = JSON.parse(h); } catch (e) { /* silent */ }
  }

  trimHistory() {
    if (this.state.messageHistory.length > this.config.maxHistory) this.state.messageHistory = this.state.messageHistory.slice(-this.config.maxHistory);
  }

  initAnimations() {
    setTimeout(() => {
      this.el.toggle?.classList.add('pulse');
      setTimeout(() => this.el.toggle?.classList.remove('pulse'), 3000);
    }, 5000);
    setInterval(() => {
      if (!this.state.isOpen) {
        this.el.toggle?.classList.add('subtle-bounce');
        setTimeout(() => this.el.toggle?.classList.remove('subtle-bounce'), 1000);
      }
    }, 30000);
  }
}

document.addEventListener('DOMContentLoaded', () => { window.srinathChatbot = new SrinathChatbot(); });