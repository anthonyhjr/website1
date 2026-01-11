/**
 * AI Website Concierge Widget - Frontend
 * 
 * A premium, accessible, compliant chatbot widget
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiUrl: window.CONCIERGE_API_URL || '/api',
    position: window.CONCIERGE_POSITION || 'bottom-right',
    buttonColor: window.CONCIERGE_BUTTON_COLOR || '#6366f1',
    sessionId: null
  };

  // Generate session ID
  function generateSessionId() {
    if (!CONFIG.sessionId) {
      const stored = localStorage.getItem('concierge_session_id');
      if (stored) {
        CONFIG.sessionId = stored;
      } else {
        CONFIG.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('concierge_session_id', CONFIG.sessionId);
      }
    }
    return CONFIG.sessionId;
  }

  // Widget HTML
  const widgetHTML = `
    <div id="concierge-widget" class="concierge-widget" role="dialog" aria-label="Website assistant" aria-hidden="true">
      <div class="concierge-widget-container">
        <div class="concierge-widget-header">
          <h2 class="concierge-widget-title">How can I help?</h2>
          <button class="concierge-widget-close" aria-label="Close assistant" id="concierge-close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="concierge-widget-body" id="concierge-body">
          <div class="concierge-quick-actions" id="concierge-quick-actions">
            <button class="concierge-chip" data-action="services">Services</button>
            <button class="concierge-chip" data-action="pricing">Pricing</button>
            <button class="concierge-chip" data-action="contact">Contact</button>
            <button class="concierge-chip" data-action="faq">FAQ</button>
            <button class="concierge-chip" data-action="human">Talk to a Human</button>
          </div>
          
          <div class="concierge-widget-actions">
            <button class="concierge-reset-btn" id="concierge-reset-btn" aria-label="Reset conversation">Reset</button>
          </div>
          
          <div class="concierge-messages" id="concierge-messages" role="log" aria-live="polite" aria-atomic="false">
            <!-- Messages will be added here -->
          </div>
          
          <div class="concierge-loading" id="concierge-loading" style="display: none;">
            <div class="concierge-typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
          
          <form class="concierge-input-form" id="concierge-input-form">
            <input 
              type="text" 
              class="concierge-input" 
              id="concierge-input"
              placeholder="Type your question..."
              aria-label="Type your message"
              autocomplete="off"
            />
            <button type="submit" class="concierge-send-btn" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
    
    <button 
      class="concierge-toggle-btn" 
      id="concierge-toggle-btn"
      aria-label="Open website assistant"
      aria-expanded="false"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
    
    <div class="concierge-lead-form" id="concierge-lead-form" style="display: none;">
        <div class="concierge-lead-form-content">
        <h3>Get in Touch</h3>
        <p>Why am I seeing this? You expressed interest in connecting with our team or requesting information that requires personal contact.</p>
        <form id="concierge-lead-form-element">
          <input type="text" name="name" placeholder="Your name" required aria-label="Your name">
          <input type="email" name="email" placeholder="Your email" required aria-label="Your email">
          <input type="tel" name="phone" placeholder="Phone (optional)" aria-label="Phone number">
          <textarea name="message" placeholder="Your message" rows="3" aria-label="Your message"></textarea>
          <label class="concierge-consent-label">
            <input type="checkbox" name="consent" required>
            <span id="concierge-consent-text">By submitting, you consent to being contacted.</span>
          </label>
          <div class="concierge-lead-form-actions">
            <button type="button" class="concierge-btn-secondary" id="concierge-lead-cancel">Cancel</button>
            <button type="submit" class="concierge-btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Widget CSS
  const widgetCSS = `
    <style>
      .concierge-toggle-btn {
        position: fixed;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: ${CONFIG.buttonColor};
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .concierge-toggle-btn:hover {
        transform: translateY(-50%) scale(1.05);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2);
      }
      
      .concierge-toggle-btn:active {
        transform: translateY(-50%) scale(0.95);
      }
      
      .concierge-toggle-btn:focus {
        outline: 2px solid ${CONFIG.buttonColor};
        outline-offset: 2px;
      }
      
      .concierge-widget {
        position: fixed;
        top: 50%;
        right: 24px;
        transform: translate(420px, -50%);
        width: 380px;
        max-width: calc(100vw - 48px);
        height: 600px;
        max-height: calc(100vh - 120px);
        background: white;
        border-radius: 16px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
      }
      
      .concierge-widget[aria-hidden="false"] {
        transform: translate(0, -50%);
      }
      
      .concierge-widget-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .concierge-widget-header {
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      }
      
      .concierge-widget-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
      }
      
      .concierge-widget-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: #6b7280;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .concierge-widget-close:hover {
        color: #1f2937;
      }
      
      .concierge-widget-close:focus {
        outline: 2px solid ${CONFIG.buttonColor};
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      .concierge-widget-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .concierge-quick-actions {
        padding: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        border-bottom: 1px solid #e5e7eb;
        background: #fafafa;
      }
      
      .concierge-widget-actions {
        padding: 8px 16px;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #e5e7eb;
        background: #ffffff;
      }
      
      .concierge-reset-btn {
        background: none;
        border: none;
        color: #6b7280;
        font-size: 12px;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s, color 0.2s;
      }
      
      .concierge-reset-btn:hover {
        background: #f3f4f6;
        color: #1f2937;
      }
      
      .concierge-reset-btn:focus {
        outline: 2px solid ${CONFIG.buttonColor};
        outline-offset: 2px;
      }
      
      .concierge-chip {
        padding: 6px 12px;
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;
      }
      
      .concierge-chip:hover {
        background: #e5e7eb;
      }
      
      .concierge-chip:focus {
        outline: 2px solid ${CONFIG.buttonColor};
        outline-offset: 2px;
      }
      
      .concierge-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .concierge-message {
        max-width: 80%;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .concierge-message-user {
        align-self: flex-end;
        background: ${CONFIG.buttonColor};
        color: white;
        border-bottom-right-radius: 4px;
      }
      
      .concierge-message-assistant {
        align-self: flex-start;
        background: #f3f4f6;
        color: #1f2937;
        border-bottom-left-radius: 4px;
      }
      
      .concierge-message-links {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .concierge-message-link {
        color: ${CONFIG.buttonColor};
        text-decoration: none;
        font-size: 13px;
      }
      
      .concierge-message-link:hover {
        text-decoration: underline;
      }
      
      .concierge-loading {
        padding: 16px;
      }
      
      .concierge-typing-indicator {
        display: flex;
        gap: 4px;
      }
      
      .concierge-typing-indicator span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #9ca3af;
        animation: concierge-typing 1.4s infinite;
      }
      
      .concierge-typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .concierge-typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes concierge-typing {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
        30% { transform: translateY(-10px); opacity: 1; }
      }
      
      .concierge-input-form {
        padding: 16px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 8px;
      }
      
      .concierge-input {
        flex: 1;
        padding: 10px 14px;
        border: 1px solid #d1d5db;
        border-radius: 24px;
        font-size: 14px;
        outline: none;
      }
      
      .concierge-input:focus {
        border-color: ${CONFIG.buttonColor};
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }
      
      .concierge-send-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${CONFIG.buttonColor};
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }
      
      .concierge-send-btn:hover {
        transform: scale(1.05);
      }
      
      .concierge-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .concierge-lead-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .concierge-lead-form-content {
        background: white;
        border-radius: 16px;
        padding: 24px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .concierge-lead-form-content h3 {
        margin: 0 0 12px 0;
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
      }
      
      .concierge-lead-form-content p {
        margin: 0 0 20px 0;
        font-size: 14px;
        color: #6b7280;
      }
      
      .concierge-lead-form-content input,
      .concierge-lead-form-content textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        font-family: inherit;
      }
      
      .concierge-consent-label {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 16px;
        font-size: 13px;
        color: #6b7280;
      }
      
      .concierge-lead-form-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
      
      .concierge-btn-primary,
      .concierge-btn-secondary {
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: none;
      }
      
      .concierge-btn-primary {
        background: ${CONFIG.buttonColor};
        color: white;
      }
      
      .concierge-btn-secondary {
        background: #f3f4f6;
        color: #1f2937;
      }
      
      @media (max-width: 480px) {
        .concierge-widget {
          width: calc(100vw - 32px);
          right: 16px;
          top: 50%;
          transform: translate(calc(100vw - 16px), -50%);
          height: calc(100vh - 120px);
          max-height: calc(100vh - 120px);
        }
        
        .concierge-widget[aria-hidden="false"] {
          transform: translate(0, -50%);
        }
        
        .concierge-toggle-btn {
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .concierge-toggle-btn:hover {
          transform: translateY(-50%) scale(1.05);
        }
        
        .concierge-toggle-btn:active {
          transform: translateY(-50%) scale(0.95);
        }
      }
    </style>
  `;

  // Initialize widget
  function initWidget() {
    // Inject CSS
    document.head.insertAdjacentHTML('beforeend', widgetCSS);
    
    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
    // Get elements
    const widget = document.getElementById('concierge-widget');
    const toggleBtn = document.getElementById('concierge-toggle-btn');
    const closeBtn = document.getElementById('concierge-close-btn');
    const inputForm = document.getElementById('concierge-input-form');
    const input = document.getElementById('concierge-input');
    const messages = document.getElementById('concierge-messages');
    const quickActions = document.getElementById('concierge-quick-actions');
    const loading = document.getElementById('concierge-loading');
    const leadForm = document.getElementById('concierge-lead-form');
    const leadFormElement = document.getElementById('concierge-lead-form-element');
    const leadCancel = document.getElementById('concierge-lead-cancel');
    
    // Generate session ID
    generateSessionId();
    
    // Toggle widget
    function openWidget() {
      widget.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      input.focus();
      
      // Trap focus
      trapFocus(widget);
    }
    
    function closeWidget() {
      widget.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
    
    // Focus trap
    function trapFocus(element) {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
        if (e.key === 'Escape') {
          closeWidget();
        }
      });
    }
    
    // Add message to chat
    function addMessage(text, type) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `concierge-message concierge-message-${type}`;
      messageDiv.textContent = text;
      messages.appendChild(messageDiv);
      messages.scrollTop = messages.scrollHeight;
    }
    
    // Add message with links
    function addMessageWithLinks(text, links) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'concierge-message concierge-message-assistant';
      
      const textNode = document.createTextNode(text);
      messageDiv.appendChild(textNode);
      
      if (links && links.length > 0) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'concierge-message-links';
        links.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.className = 'concierge-message-link';
          a.textContent = link.label;
          a.target = '_blank';
          linksDiv.appendChild(a);
        });
        messageDiv.appendChild(linksDiv);
      }
      
      messages.appendChild(messageDiv);
      messages.scrollTop = messages.scrollHeight;
    }
    
    // Send message to API
    async function sendMessage(message) {
      loading.style.display = 'block';
      quickActions.style.display = 'none';
      
      try {
        const response = await fetch(`${CONFIG.apiUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: message,
            sessionId: CONFIG.sessionId,
            pageUrl: window.location.href,
            referrer: document.referrer
          })
        });
        
        const data = await response.json();
        
        if (data.ok) {
          addMessageWithLinks(data.answer, data.suggestedLinks);
          
          // Show lead form if prompted
          if (data.shouldPromptLead) {
            setTimeout(() => {
              leadForm.style.display = 'flex';
            }, 500);
          }
        } else {
          addMessage('I apologize, but I encountered an error. Please try again or contact us directly.', 'assistant');
        }
      } catch (error) {
        console.error('Chat error:', error);
        addMessage('I apologize, but I\'m having trouble connecting. Please try again or contact us directly.', 'assistant');
      } finally {
        loading.style.display = 'none';
      }
    }
    
    // Handle form submission
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (message) {
        addMessage(message, 'user');
        input.value = '';
        sendMessage(message);
      }
    });
    
    // Handle quick actions
    quickActions.addEventListener('click', (e) => {
      if (e.target.classList.contains('concierge-chip')) {
        const action = e.target.getAttribute('data-action');
        const actionMessages = {
          'services': 'Tell me about your services',
          'pricing': 'What are your prices?',
          'contact': 'How can I contact you?',
          'faq': 'What are your frequently asked questions?',
          'human': 'I would like to talk to a human'
        };
        const message = actionMessages[action] || action;
        addMessage(message, 'user');
        sendMessage(message);
      }
    });
    
    // Handle reset button
    const resetBtn = document.getElementById('concierge-reset-btn');
    resetBtn.addEventListener('click', () => {
      messages.innerHTML = '';
      quickActions.style.display = 'flex';
      setTimeout(() => {
        addMessage('Hello! I\'m Aiden, your AI concierge. I\'m here to help you find information about our services, answer questions, or guide you to the right page. How can I assist you today?', 'assistant');
      }, 300);
    });
    
    // Handle lead form
    leadFormElement.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(leadFormElement);
      
      try {
        const response = await fetch(`${CONFIG.apiUrl}/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || null,
            message: formData.get('message') || null,
            consent: true,
            sessionId: CONFIG.sessionId,
            pageUrl: window.location.href
          })
        });
        
        const data = await response.json();
        
        if (data.ok) {
          addMessage('Thank you! We\'ll be in touch soon.', 'assistant');
          leadForm.style.display = 'none';
          leadFormElement.reset();
        } else {
          alert('There was an error submitting your information. Please try again.');
        }
      } catch (error) {
        console.error('Lead submission error:', error);
        alert('There was an error submitting your information. Please try again.');
      }
    });
    
    // Event listeners
    toggleBtn.addEventListener('click', openWidget);
    closeBtn.addEventListener('click', closeWidget);
    leadCancel.addEventListener('click', () => {
      leadForm.style.display = 'none';
      leadFormElement.reset();
    });
    
    // Close on outside click (for lead form)
    leadForm.addEventListener('click', (e) => {
      if (e.target === leadForm) {
        leadForm.style.display = 'none';
        leadFormElement.reset();
      }
    });
    
    // Add welcome message from Aiden
    setTimeout(() => {
      addMessage('Hello! I\'m Aiden, your AI concierge. I\'m here to help you find information about our services, answer questions, or guide you to the right page. How can I assist you today?', 'assistant');
    }, 300);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
