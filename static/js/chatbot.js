// static/js/chatbot.js
class SrinathChatbot {
  constructor() {
    this.state = { isOpen: false, isTyping: false, messageHistory: [] };
    this.config = { typingDelay: 900, typingVariation: 500, maxHistory: 50, greetingDelay: 800, proactiveDelay: 15000, whatsappNumber: '917013850214' };
    this.quickReplies = {
      initial: ['About Srinath', 'View Projects', 'Contact Info', 'Skills'],
      projects: ['Web Apps', 'Mobile Apps', 'AI/ML Projects', 'All Projects'],
      skills: ['Frontend', 'Backend', 'Mobile', 'AI/ML'],
      contact: ['Email', 'LinkedIn', 'GitHub', 'Schedule Call']
    };
    this.skillsData = {
      frontend: { label: 'Frontend', icon: '🎨', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
      backend: { label: 'Backend', icon: '⚙️', items: ['Python', 'FastAPI', 'Flask', 'REST APIs'] },
      ai: { label: 'AI / ML', icon: '🤖', items: ['Scikit-learn', 'Pandas', 'AI / LLM Integration'] },
      mobile: { label: 'Mobile', icon: '📱', items: ['Flutter', 'Dart'] },
      tools: { label: 'Database & Tools', icon: '🔧', items: ['PostgreSQL', 'Redis', 'Firebase', 'Git', 'GitHub', 'Vercel'] }
    };
    this.projectAliases = {
      cinebrain: ['cinebrain'],
      toolverse: ['toolverse'],
      'manga-reader': ['manga reader', 'manga'],
      'weather-visualizer': ['weather visualizer', 'weatherly'],
      smartcrop: ['smartcrop', 'smart crop'],
      travelbuddy: ['travelbuddy', 'travel buddy'],
      'sridhar-internet-services': ['sridhar'],
      'nalanda-high-school': ['nalanda']
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
      typing: document.getElementById('typingIndicator'),
      statusText: document.getElementById('chatStatusText')
    };
    this.bindEvents();
    this.loadHistory();
    this.renderStoredHistory();
    this.initAnimations();
    this.scheduleProactiveMessage();
  }

  bindEvents() {
    this.el.toggle?.addEventListener('click', () => this.toggle());
    document.addEventListener('click', e => { if (e.target.closest('.chat-close')) this.close(); });
    this.el.sendBtn?.addEventListener('click', () => this.handleSend());
    this.el.input?.addEventListener('keypress', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.handleSend(); } });
    this.el.whatsappBtn?.addEventListener('click', () => this.openWhatsApp());
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.state.isOpen) this.close(); });
    document.addEventListener('click', e => { if (e.target.classList.contains('quick-reply')) this.handleQuickReply(e.target.textContent); });
  }

  buildResponses() {
    return {
      greeting: [{ text: "Hello! 👋 I'm Srinath's AI assistant. How can I help you today?", quickReplies: this.quickReplies.initial }],
      about: [{ text: "Srinath is a Full Stack Developer from Hyderabad, India 🇮🇳\n\n💼 Builds end-to-end web & mobile products\n🚀 Works across React/Next.js, FastAPI/Flask, Flutter & AI/ML\n✅ Available for hire\n\nWant to see his work or discuss a project?", quickReplies: ['View Projects', 'Skills', 'Hire Srinath'] }],
      contact: [{ text: "Let's connect with Srinath:\n\n📧 **Email**: srinathnulidonda@gmail.com\n💼 **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/srinathnulidonda)\n🐙 **GitHub**: [View Projects](https://github.com/Srinathnulidonda)\n🐦 **Twitter**: @srinath2973\n\nResponse time: usually within 24 hours", quickReplies: this.quickReplies.contact }],
      mobile: [{ text: "Srinath's Mobile Development:\n\n📱 **Flutter & Dart**\n• Cross-platform apps for iOS & Android\n• Firebase integration, offline support\n\n**Featured Apps:**\n• 📖 Manga Reader — offline reading, sync\n• 🌤️ Weather Visualizer — real-time forecasts\n\nInterested in a mobile app?", quickReplies: ['View Projects', 'Contact Info'] }],
      ai: [{ text: "AI/ML Work by Srinath:\n\n🤖 **TravelBuddy** — ML-based travel recommendations\n🌾 **SmartCrop** — crop recommendation from agricultural data\n🎬 **CineBrain** — AI-powered content discovery\n\nBuilt with Python, Scikit-learn, Pandas and AI/LLM integration.\n\nWant to discuss an AI solution?", quickReplies: ['View Projects', 'Contact Info'] }],
      hire: [{ text: "Great choice! Srinath is available for:\n\n✅ Full-time positions\n✅ Freelance projects\n✅ Technical consulting\n\n⚡ Quick response time\n🌍 Remote-friendly\n📍 Hyderabad, India\n\nLet's discuss your requirements!", quickReplies: ['Send Email', 'WhatsApp Chat', 'View Resume'] }],
      error: [{ text: "I didn't quite catch that. Here's what you can ask me about:\n\n• Srinath's background\n• Projects and portfolio\n• Technical skills\n• How to get in touch or hire him\n\nWhat would you like to know?", quickReplies: this.quickReplies.initial }]
    };
  }

  buildKeywords() {
    return {
      greeting: /\b(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))\b/i,
      about: /about|who|bio|background|story|srinath|tell\s+me/i,
      projects: /project|portfolio|work|built|created|developed|apps|websites/i,
      skills: /skill|tech|stack|programming|language|framework|tool/i,
      contact: /contact|reach|email|linkedin|github|connect|touch|call/i,
      mobile: /mobile|flutter|dart|android|ios/i,
      ai: /\bai\b|artificial|machine\s+learning|\bml\b|scikit|pandas|llm/i,
      hire: /hire|job|opportunity|freelance|available|collaborate|recruit/i
    };
  }

  getProjectMatch(msg) {
    if (typeof projectsData === 'undefined') return null;
    return projectsData.find(p => (this.projectAliases[p.id] || []).some(a => msg.includes(a))) || null;
  }

  buildProjectDetail(project) {
    const links = [];
    if (project.liveUrl) links.push(`[Live Demo](${project.liveUrl})`);
    if (project.codeUrl) links.push(`[Source Code](${project.codeUrl})`);
    const linkText = links.length ? `\n\n${links.join(' • ')}` : '\n\n*Private project — no public link available*';
    return {
      text: `**${project.title}**\n${project.description}\n\n🛠️ ${project.techStack.join(', ')}${linkText}`,
      quickReplies: ['All Projects', 'Contact Info']
    };
  }

  buildProjectsSummary(filter) {
    if (typeof projectsData === 'undefined' || !projectsData.length) {
      return { text: 'Check out the projects section above for full details!', quickReplies: this.quickReplies.initial };
    }
    const groups = {
      web: projectsData.filter(p => p.filters.includes('web')),
      mobile: projectsData.filter(p => p.filters.includes('mobile')),
      ml: projectsData.filter(p => p.filters.includes('ml'))
    };
    const meta = { web: ['🌐', 'Web Apps'], mobile: ['📱', 'Mobile Apps'], ml: ['🤖', 'AI/ML Projects'] };
    const keys = filter && filter !== 'all' ? [filter] : ['web', 'mobile', 'ml'];
    let text = '';
    keys.forEach(key => {
      if (groups[key]?.length) {
        const [icon, label] = meta[key];
        text += `${icon} **${label}**\n${groups[key].map(p => `• ${p.title}`).join('\n')}\n\n`;
      }
    });
    text += 'Ask me about any project by name for more details!';
    return { text: text.trim(), quickReplies: this.quickReplies.projects };
  }

  buildSkillsSummary(category) {
    if (category && this.skillsData[category]) {
      const d = this.skillsData[category];
      return { text: `${d.icon} **${d.label}**\n${d.items.join(' · ')}`, quickReplies: this.quickReplies.skills };
    }
    const text = Object.values(this.skillsData).map(d => `${d.icon} **${d.label}**\n${d.items.join(' · ')}`).join('\n\n');
    return { text, quickReplies: this.quickReplies.skills };
  }

  toggle() {
    this.state.isOpen ? this.close() : this.open();
  }

  open() {
    this.state.isOpen = true;
    this.el.container?.classList.add('active');
    this.el.container?.setAttribute('aria-hidden', 'false');
    this.el.toggle?.classList.add('active');
    this.el.toggle?.setAttribute('aria-expanded', 'true');
    this.el.toggle?.classList.remove('has-notification');
    this.el.input?.focus();
    if (!this.state.messageHistory.length) {
      setTimeout(() => this.sendBot(this.responses.greeting[0]), this.config.greetingDelay);
    }
    Utils.trackEvent('chat_opened');
  }

  close() {
    this.state.isOpen = false;
    this.el.container?.classList.remove('active');
    this.el.container?.setAttribute('aria-hidden', 'true');
    this.el.toggle?.classList.remove('active');
    this.el.toggle?.setAttribute('aria-expanded', 'false');
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
    const msg = input.toLowerCase().trim();

    if (/^web apps$/i.test(msg)) return this.buildProjectsSummary('web');
    if (/^mobile apps$/i.test(msg)) return this.buildProjectsSummary('mobile');
    if (/^ai\/ml projects$/i.test(msg)) return this.buildProjectsSummary('ml');
    if (/^all projects$/i.test(msg)) return this.buildProjectsSummary('all');

    if (/^frontend$/i.test(msg)) return this.buildSkillsSummary('frontend');
    if (/^backend$/i.test(msg)) return this.buildSkillsSummary('backend');
    if (/^mobile$/i.test(msg)) return this.buildSkillsSummary('mobile');
    if (/^ai\/ml$/i.test(msg)) return this.buildSkillsSummary('ai');

    if (/^(send )?email$/i.test(msg)) { window.location.href = 'mailto:srinathnulidonda@gmail.com'; return { text: 'Opening your email client... 📧', quickReplies: this.quickReplies.initial }; }
    if (/^linkedin$/i.test(msg)) { window.open('https://www.linkedin.com/in/srinathnulidonda', '_blank', 'noopener'); return { text: 'Opening LinkedIn... 💼', quickReplies: this.quickReplies.initial }; }
    if (/^github$/i.test(msg)) { window.open('https://github.com/Srinathnulidonda', '_blank', 'noopener'); return { text: 'Opening GitHub... 🐙', quickReplies: this.quickReplies.initial }; }
    if (/^schedule call$/i.test(msg)) { this.openWhatsApp(); return { text: 'Opening WhatsApp to schedule a call... 📞', quickReplies: this.quickReplies.initial }; }
    if (/^whatsapp chat$/i.test(msg)) { this.openWhatsApp(); return { text: 'Opening WhatsApp... 💬', quickReplies: this.quickReplies.initial }; }
    if (/^view resume$/i.test(msg)) { window.open('assets/resume.pdf', '_blank', 'noopener'); return { text: "Opening Srinath's resume... 📄", quickReplies: this.quickReplies.initial }; }

    const project = this.getProjectMatch(msg);
    if (project) return this.buildProjectDetail(project);

    if (this.keywords.projects.test(msg)) return this.buildProjectsSummary('all');
    if (this.keywords.skills.test(msg)) return this.buildSkillsSummary();

    const genericCats = ['about', 'contact', 'mobile', 'ai', 'hire'];
    for (const cat of genericCats) {
      if (this.keywords[cat].test(msg)) return this.responses[cat][0];
    }

    return this.responses.error[0];
  }

  addUserMsg(text) {
    this.renderUserMsg(text, Date.now());
    this.state.messageHistory.push({ type: 'user', text, time: Date.now() });
    this.trimHistory();
  }

  renderUserMsg(text, time) {
    this.el.body?.insertAdjacentHTML('beforeend', `
      <div class="message user-message">
        <div class="message-avatar user-avatar"><i class="fas fa-user"></i></div>
        <div class="message-wrapper">
          <div class="message-content">${Utils.escapeHtml(text)}</div>
          <div class="message-time">${this.formatTime(time)}</div>
        </div>
      </div>`);
    this.scrollBottom();
  }

  sendBot(response) {
    this.hideTyping();
    this.renderBotMsg(response, Date.now());
    this.state.messageHistory.push({ type: 'bot', ...response, time: Date.now() });
    this.trimHistory();
    this.saveHistory();
  }

  renderBotMsg(response, time) {
    const qr = response.quickReplies ? `<div class="quick-replies">${response.quickReplies.map(r => `<button class="quick-reply">${r}</button>`).join('')}</div>` : '';
    this.el.body?.insertAdjacentHTML('beforeend', `
      <div class="message bot-message">
        <div class="message-avatar"><i class="fas fa-headset"></i></div>
        <div class="message-wrapper">
          <div class="message-content">${this.formatMsg(response.text)}</div>${qr}
          <div class="message-time">${this.formatTime(time)}</div>
        </div>
      </div>`);
    this.scrollBottom();
  }

  renderStoredHistory() {
    if (!this.state.messageHistory.length) return;
    this.state.messageHistory.forEach(msg => {
      if (msg.type === 'user') this.renderUserMsg(msg.text, msg.time);
      else this.renderBotMsg(msg, msg.time);
    });
  }

  formatMsg(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  showTyping() {
    this.state.isTyping = true;
    if (this.el.typing) { this.el.typing.style.display = 'flex'; this.scrollBottom(); }
    if (this.el.statusText) this.el.statusText.textContent = 'Typing...';
  }

  hideTyping() {
    this.state.isTyping = false;
    if (this.el.typing) this.el.typing.style.display = 'none';
    if (this.el.statusText) this.el.statusText.textContent = 'Online • Quick replies';
  }

  scrollBottom() {
    if (this.el.body) this.el.body.scrollTop = this.el.body.scrollHeight;
  }

  openWhatsApp() {
    window.open(`https://wa.me/${this.config.whatsappNumber}?text=${encodeURIComponent("Hi Srinath! I visited your portfolio and I'm interested in discussing a project with you.")}`, '_blank', 'noopener');
    Utils.trackEvent('whatsapp_opened');
  }

  scheduleProactiveMessage() {
    setTimeout(() => {
      if (this.state.isOpen || this.state.messageHistory.length) return;
      const proactive = { text: "👋 Have a question about my work? I'm here to help!", quickReplies: this.quickReplies.initial };
      this.sendBot(proactive);
      this.el.toggle?.classList.add('has-notification');
    }, this.config.proactiveDelay);
  }

  saveHistory() {
    try { localStorage.setItem('chatHistory', JSON.stringify(this.state.messageHistory)); } catch (e) { }
  }

  loadHistory() {
    try { const h = localStorage.getItem('chatHistory'); if (h) this.state.messageHistory = JSON.parse(h); } catch (e) { }
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