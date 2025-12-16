// Enhanced Chatbot Implementation - Fixed Mobile Close Button
class SrinathChatbot {
    constructor() {
        this.state = {
            isOpen: false,
            isTyping: false,
            messageHistory: [],
            userContext: {},
            sessionStartTime: Date.now()
        };

        this.config = {
            typingDelay: 1000,
            typingVariation: 500,
            maxHistoryLength: 50,
            greetingDelay: 800,
            whatsappNumber: '917013850214'
        };

        this.quickReplies = {
            initial: ['About Srinath', 'View Projects', 'Contact Info', 'Skills'],
            projects: ['Mobile Apps', 'AI/ML Projects', 'Web Development', 'All Projects'],
            skills: ['Frontend', 'Backend', 'Mobile', 'AI/ML'],
            contact: ['Email', 'LinkedIn', 'GitHub', 'Schedule Call']
        };

        this.init();
        this.responses = this.initResponses();
        this.keywords = this.initKeywords();
    }

    init() {
        this.cacheDOMElements();
        this.bindEvents();
        this.loadChatHistory();
        this.initAnimations();
    }

    cacheDOMElements() {
        this.elements = {
            toggle: document.getElementById('chatToggle'),
            container: document.getElementById('chatContainer'),
            body: document.getElementById('chatBody'),
            input: document.getElementById('messageInput'),
            sendBtn: document.getElementById('sendButton'),
            whatsappBtn: document.getElementById('whatsappButton'),
            typingIndicator: document.getElementById('typingIndicator')
        };
    }

    bindEvents() {
        // Toggle chat
        this.elements.toggle?.addEventListener('click', () => this.toggleChat());

        // Close button (mobile) - Fixed: Direct query and explicit close
        document.addEventListener('click', (e) => {
            // Check if clicked element is close button or its child
            if (e.target.closest('.chat-close')) {
                e.preventDefault();
                e.stopPropagation();
                this.closeChat();
            }
        });

        // Send message
        this.elements.sendBtn?.addEventListener('click', () => this.handleSendMessage());

        // Enter key handling
        this.elements.input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // WhatsApp redirect
        this.elements.whatsappBtn?.addEventListener('click', () => this.openWhatsApp());

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isOpen) {
                this.closeChat();
            }
        });

        // Handle quick replies
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                this.handleQuickReply(e.target.textContent);
            }
        });

        // Close chat when clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (this.state.isOpen &&
                !this.elements.container?.contains(e.target) &&
                !this.elements.toggle?.contains(e.target)) {
                // Uncomment if you want to close when clicking outside
                // this.closeChat();
            }
        });
    }

    initResponses() {
        return {
            greeting: [
                {
                    text: "Hello! 👋 I'm Srinath's AI assistant. How can I help you today?",
                    quickReplies: this.quickReplies.initial
                }
            ],
            about: [
                {
                    text: "Srinath is a 21-year-old Full Stack Developer from Hyderabad, India 🇮🇳\n\n🎓 Currently pursuing B.E. in Engineering\n💼 Specializes in Web, Mobile & AI/ML development\n🚀 Passionate about creating innovative digital solutions\n\nWould you like to know about his projects or skills?",
                    quickReplies: ['View Projects', 'Technical Skills', 'Contact Him']
                }
            ],
            projects: [
                {
                    text: "Here are Srinath's key projects:\n\n📱 **Mobile Apps**\n• Manga Reading App (Flutter)\n• Weather Forecast App\n\n🤖 **AI/ML Projects**\n• Travel Recommendation System\n• Drug Discovery Platform\n• Agriculture Price Prediction\n\n🌐 **Web Development**\n• E-commerce Platform\n• Travel Guides (NYC, Rome, Paris)\n\nWhich category interests you?",
                    quickReplies: this.quickReplies.projects
                }
            ],
            skills: [
                {
                    text: "Srinath's Technical Expertise:\n\n**Frontend** 🎨\n• HTML5, CSS3, JavaScript\n• React, Bootstrap, Tailwind\n\n**Backend** ⚙️\n• Flask, Python, Node.js\n• REST APIs, Authentication\n\n**Mobile** 📱\n• Flutter, Dart\n• Cross-platform Development\n\n**AI/ML** 🤖\n• TensorFlow, Scikit-learn\n• NLTK, Data Analysis\n\nWhat would you like to explore?",
                    quickReplies: this.quickReplies.skills
                }
            ],
            contact: [
                {
                    text: "Let's connect with Srinath:\n\n📧 **Email**: srinathnulidonda@gmail.com\n💼 **LinkedIn**: [Connect on LinkedIn](https://linkedin.com/in/srinath-nulidonda-1a4230256/)\n🐙 **GitHub**: [View Projects](https://github.com/Srinathnulidonda)\n🐦 **Twitter**: @srinath2973\n\nResponse time: Usually within 24 hours",
                    quickReplies: this.quickReplies.contact
                }
            ],
            mobile: [
                {
                    text: "Srinath's Mobile Development:\n\n📱 **Flutter Expertise**\n• Cross-platform apps (iOS & Android)\n• Beautiful UI/UX with Material Design\n• State management & API integration\n\n**Featured Apps:**\n• 📖 Manga Reading App - Offline reading, bookmarks\n• 🌤️ Weather App - Real-time updates, location services\n\nInterested in mobile app development?",
                    quickReplies: ['View Portfolio', 'Contact for Project']
                }
            ],
            ai: [
                {
                    text: "AI/ML Projects by Srinath:\n\n🤖 **Travel Recommendation System**\n• Machine Learning algorithms\n• Personalized suggestions\n• TensorFlow & Scikit-learn\n\n💊 **Drug Discovery Platform**\n• Molecular structure analysis\n• Predictive modeling\n\n🌾 **Agriculture Price Prediction**\n• Weather data integration\n• Market analysis\n\nWant to discuss AI solutions?",
                    quickReplies: ['Learn More', 'Start AI Project']
                }
            ],
            hire: [
                {
                    text: "Great! Srinath is available for:\n\n✅ Full-time positions\n✅ Freelance projects\n✅ Technical consulting\n✅ Startup collaborations\n\n**Availability**: Immediate\n**Location**: Hyderabad, India\n**Remote**: Yes, available\n\nLet's discuss your requirements!",
                    quickReplies: ['Send Email', 'WhatsApp Chat', 'View Resume']
                }
            ],
            error: [
                {
                    text: "I didn't quite catch that. Here are some things you can ask me about:\n\n• Srinath's background and experience\n• His projects and portfolio\n• Technical skills and expertise\n• How to get in touch\n\nWhat would you like to know?",
                    quickReplies: this.quickReplies.initial
                }
            ]
        };
    }

    initKeywords() {
        return {
            greeting: /^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))$/i,
            about: /about|who|bio|background|story|srinath|tell\s+me/i,
            projects: /project|portfolio|work|built|created|developed|apps|websites/i,
            skills: /skill|tech|stack|programming|language|framework|tool/i,
            contact: /contact|reach|email|linkedin|github|connect|touch|call/i,
            mobile: /mobile|flutter|dart|android|ios|app/i,
            ai: /ai|artificial|intelligence|machine|learning|ml|tensorflow|data/i,
            hire: /hire|job|opportunity|freelance|work|available|collaborate/i
        };
    }

    toggleChat() {
        this.state.isOpen = !this.state.isOpen;

        if (this.state.isOpen) {
            this.openChat();
        } else {
            this.closeChat();
        }
    }

    openChat() {
        this.state.isOpen = true;
        this.elements.container?.classList.add('active');
        this.elements.toggle?.classList.add('active');
        this.elements.input?.focus();

        // Send greeting on first open
        if (this.state.messageHistory.length === 0) {
            setTimeout(() => {
                this.sendBotMessage(this.responses.greeting[0]);
            }, this.config.greetingDelay);
        }

        // Track chat open
        this.trackEvent('chat_opened');
    }

    closeChat() {
        this.state.isOpen = false;
        this.elements.container?.classList.remove('active');
        this.elements.toggle?.classList.remove('active');

        // Save chat history
        this.saveChatHistory();

        // Track chat close
        this.trackEvent('chat_closed');
    }

    handleSendMessage() {
        const message = this.elements.input?.value.trim();

        if (!message || this.state.isTyping) return;

        // Add user message
        this.addUserMessage(message);

        // Clear input
        this.elements.input.value = '';

        // Process and respond
        this.processUserMessage(message);
    }

    handleQuickReply(text) {
        this.addUserMessage(text);
        this.processUserMessage(text);
    }

    processUserMessage(message) {
        // Show typing indicator
        this.showTypingIndicator();

        // Calculate response delay
        const delay = this.config.typingDelay + Math.random() * this.config.typingVariation;

        setTimeout(() => {
            const response = this.generateResponse(message);
            this.sendBotMessage(response);
        }, delay);
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Check each keyword pattern
        for (const [category, pattern] of Object.entries(this.keywords)) {
            if (pattern.test(message)) {
                const responses = this.responses[category];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Check for specific quick reply matches
        if (message.includes('view resume')) {
            window.open('assets/resume.pdf', '_blank');
            return { text: "Opening Srinath's resume in a new tab! 📄", quickReplies: this.quickReplies.initial };
        }

        if (message.includes('send email')) {
            window.location.href = 'mailto:srinathnulidonda@gmail.com';
            return { text: "Opening your email client to contact Srinath! 📧", quickReplies: this.quickReplies.initial };
        }

        // Default response
        return this.responses.error[0];
    }

    addUserMessage(text) {
        const messageHTML = `
            <div class="message user-message" data-time="${Date.now()}">
                <div class="message-content">${this.escapeHtml(text)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;

        this.elements.body?.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();

        // Add to history
        this.state.messageHistory.push({ type: 'user', text, time: Date.now() });
        this.trimHistory();
    }

    sendBotMessage(response) {
        this.hideTypingIndicator();

        const messageHTML = `
            <div class="message bot-message" data-time="${Date.now()}">
                <div class="message-avatar">
                    <i class="fas fa-headset"></i>
                </div>
                <div class="message-wrapper">
                    <div class="message-content">${this.formatMessage(response.text)}</div>
                    ${response.quickReplies ? this.createQuickReplies(response.quickReplies) : ''}
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
        `;

        this.elements.body?.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();

        // Add to history
        this.state.messageHistory.push({ type: 'bot', ...response, time: Date.now() });
        this.trimHistory();
    }

    createQuickReplies(replies) {
        const buttons = replies.map(reply =>
            `<button class="quick-reply">${reply}</button>`
        ).join('');

        return `<div class="quick-replies">${buttons}</div>`;
    }

    formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }

    showTypingIndicator() {
        this.state.isTyping = true;
        if (this.elements.typingIndicator) {
            this.elements.typingIndicator.style.display = 'flex';
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        this.state.isTyping = false;
        if (this.elements.typingIndicator) {
            this.elements.typingIndicator.style.display = 'none';
        }
    }

    scrollToBottom() {
        if (this.elements.body) {
            this.elements.body.scrollTop = this.elements.body.scrollHeight;
        }
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    openWhatsApp() {
        const message = encodeURIComponent(
            "Hi Srinath! I visited your portfolio and I'm interested in discussing a project with you."
        );
        const url = `https://wa.me/${this.config.whatsappNumber}?text=${message}`;
        window.open(url, '_blank');

        this.trackEvent('whatsapp_opened');
    }

    saveChatHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(this.state.messageHistory));
        } catch (e) {
            console.error('Failed to save chat history:', e);
        }
    }

    loadChatHistory() {
        try {
            const history = localStorage.getItem('chatHistory');
            if (history) {
                this.state.messageHistory = JSON.parse(history);
            }
        } catch (e) {
            console.error('Failed to load chat history:', e);
        }
    }

    trimHistory() {
        if (this.state.messageHistory.length > this.config.maxHistoryLength) {
            this.state.messageHistory = this.state.messageHistory.slice(-this.config.maxHistoryLength);
        }
    }

    trackEvent(eventName, data = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'Chatbot',
                event_label: 'Portfolio Chatbot',
                ...data
            });
        }
    }

    initAnimations() {
        setTimeout(() => {
            this.elements.toggle?.classList.add('pulse');
            setTimeout(() => {
                this.elements.toggle?.classList.remove('pulse');
            }, 3000);
        }, 5000);

        setInterval(() => {
            if (!this.state.isOpen) {
                this.elements.toggle?.classList.add('subtle-bounce');
                setTimeout(() => {
                    this.elements.toggle?.classList.remove('subtle-bounce');
                }, 1000);
            }
        }, 30000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.srinathChatbot = new SrinathChatbot();
});