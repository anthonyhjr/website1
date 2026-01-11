/**
 * AI Website Concierge - Configuration Template
 * 
 * Copy this file to config.js and customize for your website
 */

module.exports = {
  // Brand identity
  brandName: 'Your Company Name',
  assistantName: 'Aiden', // AI assistant name
  tone: 'professional', // professional, friendly, casual
  industry: 'technology', // Optional: for industry-specific compliance

  // Allowed topics (optional - if empty, all topics allowed)
  allowedTopics: [
    'services',
    'pricing',
    'contact',
    'policies',
    'hours',
    'faq'
  ],

  // Restricted topics (always blocked)
  restrictedTopics: [
    // Add any topics you want to completely block
  ],

  // Navigation links (for routing users)
  navLinks: [
    {
      label: 'Home',
      url: '/',
      keywords: ['home', 'main', 'landing']
    },
    {
      label: 'Services',
      url: '/services',
      keywords: ['services', 'offerings', 'what we do', 'solutions']
    },
    {
      label: 'About',
      url: '/about',
      keywords: ['about', 'who we are', 'company', 'team']
    },
    {
      label: 'Contact',
      url: '/contact',
      keywords: ['contact', 'reach out', 'get in touch', 'email', 'phone']
    },
    {
      label: 'Projects',
      url: '/projects',
      keywords: ['projects', 'portfolio', 'work', 'examples']
    }
  ],

  // Services (for information and routing)
  services: [
    {
      name: 'Website Development',
      url: '/services#website-development',
      summary: 'Custom, responsive websites built with modern technologies. Fast, secure, and optimized for search engines.',
      keywords: ['website', 'web development', 'site', 'web design', 'responsive']
    },
    {
      name: 'Website Redesign',
      url: '/services#website-redesign',
      summary: 'Transform your existing website with a modern design that improves user experience and conversion rates.',
      keywords: ['redesign', 'refresh', 'update website', 'modernize']
    },
    {
      name: 'E-Commerce Solutions',
      url: '/services#ecommerce',
      summary: 'Complete e-commerce platforms with cart management, payment integrations, and admin dashboards.',
      keywords: ['ecommerce', 'online store', 'shop', 'cart', 'payment']
    },
    {
      name: 'Landing Page',
      url: '/services#landing-page',
      summary: 'High-converting landing pages designed to capture leads and drive action.',
      keywords: ['landing page', 'sales page', 'conversion', 'lead generation']
    }
  ],

  // FAQs
  faqs: [
    {
      q: 'What services do you offer?',
      a: 'We offer website development, website redesign, e-commerce solutions, and landing page design. Visit our Services page to learn more.',
      tags: ['services', 'offerings', 'what do you do'],
      url: '/services'
    },
    {
      q: 'How much does a website cost?',
      a: 'Pricing varies based on your specific needs and project scope. For accurate pricing, I recommend scheduling a consultation with our team.',
      tags: ['pricing', 'cost', 'price', 'how much']
    },
    {
      q: 'How long does it take to build a website?',
      a: 'Project timelines vary depending on complexity, but most websites are completed within 4-8 weeks. We\'ll provide a detailed timeline during our consultation.',
      tags: ['timeline', 'how long', 'duration', 'time']
    },
    {
      q: 'Do you offer ongoing support?',
      a: 'Yes, we offer maintenance and support packages to keep your website updated, secure, and performing optimally.',
      tags: ['support', 'maintenance', 'updates', 'ongoing']
    },
    {
      q: 'How can I contact you?',
      a: 'You can reach us through our contact form, email, or schedule a consultation. Visit our Contact page for all contact options.',
      tags: ['contact', 'reach out', 'get in touch', 'email']
    }
  ],

  // Policies (for routing and information)
  policies: [
    {
      name: 'Privacy Policy',
      url: '/privacy',
      summary: 'Our privacy policy explains how we collect, use, and protect your personal information.',
      keywords: ['privacy', 'data', 'personal information', 'gdpr']
    },
    {
      name: 'Terms of Service',
      url: '/terms',
      summary: 'Terms and conditions governing the use of our services and website.',
      keywords: ['terms', 'conditions', 'legal', 'agreement']
    }
  ],

  // Lead capture configuration
  leadCapture: {
    enabled: true,
    fields: ['name', 'email', 'phone', 'message'], // phone and message are optional
    consentText: 'By submitting this form, you consent to being contacted by our team regarding your inquiry.',
    deliveryMethod: 'webhook', // 'webhook' or 'email'
    endpoint: process.env.WEBHOOK_URL || 'https://your-webhook-url.com/leads'
  },

  // Compliance settings
  compliance: {
    // General disclaimer
    disclaimers: {
      general: 'The information provided is for general informational purposes only and should not be considered as professional advice.',
      industry: null // Optional industry-specific disclaimer
    },
    
    // Claims/statements that should be blocked
    blockedClaims: [
      // Add any specific claims you want to block
    ],
    
    // Rules for handling sensitive data
    sensitiveDataRules: {
      doNotStore: true,
      doNotLog: true,
      instructUser: true
    }
  },

  // Behavior settings
  behavior: {
    responseLength: 'concise', // 'concise' or 'detailed'
    maxBullets: 5,
    askClarifyingQuestionWhenUncertain: true
  }
};
