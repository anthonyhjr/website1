# Aiden - AI Website Concierge Widget

**Meet Aiden** - A premium, compliant, and intelligent AI-powered website concierge. Built with compliance-first principles, retrieval-based responses, and non-pushy lead capture.

Aiden is calm, professional, clear, and helpful—never pushy or vague. Designed to guide, clarify, and route visitors safely and intelligently.

## 🎯 Features

- **Helpful & Informational**: Helps users find information quickly
- **Compliance-First**: Built-in safety filters for legal, medical, financial advice
- **Non-Pushy**: Only captures leads when appropriate
- **Retrieval-Based**: Answers grounded in your content (no hallucination)
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- **Customizable**: Easy configuration via single config file

## 📋 Client Onboarding Checklist

### 1. Collect Content Assets

Gather the following from your client:

- [ ] **Navigation Links**: All main site navigation with URLs
- [ ] **Services**: Service names, descriptions, URLs, and keywords
- [ ] **FAQs**: Common questions and answers (at least 5-10)
- [ ] **Policies**: Privacy policy, terms, etc. with URLs
- [ ] **Contact Information**: Email, phone, contact page URL
- [ ] **Brand Details**: Company name, tone, industry

### 2. Configure Knowledge Base

1. Copy `config/config.example.js` to `config/config.js`
2. Fill in all sections:
   - Brand identity (name, tone, industry)
   - Navigation links with keywords
   - Services with summaries and keywords
   - FAQs with tags
   - Policies with keywords
   - Lead capture settings
   - Compliance disclaimers

### 3. Set Up Environment Variables

1. Copy `.env.example` to `.env`
2. Configure:
   - `PORT` (default: 3001)
   - `ALLOWED_ORIGINS` (comma-separated list)
   - `WEBHOOK_URL` (for lead delivery)

### 4. Configure Lead Delivery

Choose one:

**Option A: Webhook** (Recommended)
- Set `deliveryMethod: 'webhook'` in config
- Set `WEBHOOK_URL` in `.env`
- Your webhook should accept POST requests with lead data

**Option B: Email** (Requires implementation)
- Set `deliveryMethod: 'email'` in config
- Configure email service (SendGrid, AWS SES, etc.)
- Update `server/handlers/leads.js` with email logic

### 5. Install Dependencies

```bash
cd ai-concierge
npm install
```

### 6. Start Backend Server

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

### 7. Embed Widget on Website

**Option A: Script Tag** (Easiest for static sites)

Add before closing `</body>` tag:

```html
<script>
  window.CONCIERGE_API_URL = 'http://localhost:3001/api'; // Change to your API URL
  window.CONCIERGE_BUTTON_COLOR = '#6366f1'; // Your brand color
</script>
<script src="/path/to/concierge-widget.js"></script>
```

**Option B: React/Next.js**

```jsx
import { useEffect } from 'react';

export default function ConciergeWidget() {
  useEffect(() => {
    window.CONCIERGE_API_URL = 'http://localhost:3001/api';
    window.CONCIERGE_BUTTON_COLOR = '#6366f1';
    const script = document.createElement('script');
    script.src = '/concierge-widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return null;
}
```

### 8. Test Everything

- [ ] Widget appears on site
- [ ] Can send messages
- [ ] Responses are helpful and accurate
- [ ] Compliance filters work (test with blocked queries)
- [ ] Lead capture appears when appropriate
- [ ] Leads are delivered correctly
- [ ] Keyboard navigation works
- [ ] Mobile responsive

## 🏗️ Architecture

```
ai-concierge/
├── server/
│   ├── index.js              # Express server
│   ├── handlers/
│   │   ├── chat.js          # Chat endpoint handler
│   │   └── leads.js         # Lead capture handler
│   └── utils/
│       ├── retrieval.js     # Content retrieval logic
│       ├── compliance.js    # Safety/compliance filters
│       └── responseGenerator.js # Response generation
├── widget/
│   └── concierge-widget.js  # Frontend widget (vanilla JS)
├── config/
│   ├── config.js            # Your configuration (gitignored)
│   └── config.example.js    # Configuration template
├── package.json
├── .env.example
└── README.md
```

## 🔒 Compliance Features

### Automatic Safety Checks

- **Sensitive Data**: Detects and blocks SSN, credit cards, passwords
- **Legal Advice**: Refuses legal advice, directs to attorney
- **Medical Advice**: Refuses medical advice, directs to healthcare professional
- **Financial Advice**: Refuses financial/tax advice, directs to professional
- **Guarantees**: Refuses to make guarantees or promises

### Configurable Blocking

- `blockedClaims`: Block specific claims/statements
- `restrictedTopics`: Block entire topics
- `allowedTopics`: Limit to specific topics only

## 💬 How It Works

### 1. User Asks Question
User types a question or clicks a quick action chip.

### 2. Retrieval
System searches FAQs, services, policies, and nav links for relevant content using keyword matching and scoring.

### 3. Compliance Filter
Before responding, checks:
- Is this blocked content?
- Does this request sensitive information?
- Is this asking for advice we can't give?

### 4. Response Generation
Creates helpful response using retrieved content, adds relevant links, suggests next steps.

### 5. Lead Capture (When Appropriate)
Only prompts for lead info if:
- User explicitly requests quote/demo/consultation
- User shows buying intent keywords

## 🎨 Customization

### Widget Appearance

Set these variables before loading the script:

```javascript
window.CONCIERGE_API_URL = 'https://api.yourdomain.com/api';
window.CONCIERGE_BUTTON_COLOR = '#6366f1'; // Your brand color
window.CONCIERGE_POSITION = 'bottom-right'; // or 'bottom-left'
```

### Response Style

In `config/config.js`:

```javascript
behavior: {
  responseLength: 'concise', // or 'detailed'
  maxBullets: 5,
  askClarifyingQuestionWhenUncertain: true
}
```

## 🚀 Deployment

### Backend

Deploy to:
- Heroku
- Railway
- Render
- AWS Lambda (with adaptations)
- Your own server

**Environment Variables Required:**
- `PORT`
- `ALLOWED_ORIGINS`
- `WEBHOOK_URL` (if using webhook delivery)
- `NODE_ENV=production`

### Frontend Widget

1. Host `widget/concierge-widget.js` on your CDN or static hosting
2. Update `CONCIERGE_API_URL` to point to your production API
3. Embed script tag on your pages

## 📝 API Endpoints

### POST /api/chat

**Request:**
```json
{
  "message": "What services do you offer?",
  "sessionId": "session_123",
  "pageUrl": "https://example.com/services",
  "referrer": "https://google.com"
}
```

**Response:**
```json
{
  "ok": true,
  "answer": "We offer website development...",
  "suggestedLinks": [
    { "label": "View Services", "url": "/services" }
  ],
  "actions": [],
  "shouldPromptLead": false,
  "sessionId": "session_123"
}
```

### POST /api/leads

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "message": "Interested in website redesign",
  "consent": true,
  "sessionId": "session_123",
  "pageUrl": "https://example.com"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Thank you! We'll be in touch soon.",
  "leadId": "lead_1234567890"
}
```

### GET /api/health

**Response:**
```json
{
  "ok": true,
  "service": "AI Website Concierge",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🐛 Troubleshooting

**Widget doesn't appear:**
- Check browser console for errors
- Verify script is loaded
- Check API URL is correct

**Messages not sending:**
- Verify backend is running
- Check CORS settings in `.env`
- Verify API URL in widget config

**Responses are generic:**
- Check knowledge base in `config/config.js`
- Add more FAQs with relevant keywords
- Verify retrieval is finding content

**Leads not being delivered:**
- Check webhook URL is correct
- Verify webhook endpoint is accepting POST
- Check server logs for errors

## 📄 License

MIT

## 🤝 Support

For issues or questions, please check the configuration and ensure all steps in the onboarding checklist are completed.
