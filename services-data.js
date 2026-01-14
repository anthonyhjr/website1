// Shared Services Data - Single Source of Truth
const servicesData = [
    {
        id: 'website-development',
        title: 'Website Development',
        icon: 'fas fa-laptop-code',
        description: 'Custom, responsive websites built with modern technologies. Fast, secure, and optimized for search engines.',
        features: [
            'Fully Responsive Design',
            'SEO Optimized',
            'Fast Loading Times',
            'Mobile-First Approach'
        ],
        price: 'Starting at $600',
        featured: true,
        tiers: [
            {
                name: 'Basic',
                priceLabel: 'From $600',
                includes: ['Up to 5 pages', 'Basic contact form', 'Mobile responsive'],
                recommended: false
            },
            {
                name: 'Standard',
                priceLabel: 'From $1,200',
                includes: ['Up to 10 pages', 'Advanced forms', 'SEO optimization'],
                recommended: true
            },
            {
                name: 'Premium',
                priceLabel: 'From $2,000',
                includes: ['Unlimited pages', 'Custom features', 'Performance optimization'],
                recommended: false
            }
        ]
    },
    {
        id: 'web-applications',
        title: 'Mobile Application',
        icon: 'fas fa-mobile-alt',
        description: 'Premium mobile app development for iOS and Android—designed for performance, clean UX, and a polished launch-ready experience.',
        features: [
            'iOS + Android Ready (Cross-Platform)',
            'Modern UI/UX & Smooth Navigation',
            'API / Data Integration (as needed)',
            'App Store–Ready Build Guidance'
        ],
        price: 'Starting at $2,000',
        featured: false
    },
    {
        id: 'website-redesign',
        title: 'Website Redesign',
        icon: 'fas fa-paint-brush',
        description: 'Transform your existing website with modern design and improved functionality. Boost conversions and user experience.',
        features: [
            'Modern Design',
            'Improved UX/UI',
            'Better Performance',
            'Content Migration'
        ],
        price: 'Starting at $1,000',
        featured: true,
        tiers: [
            {
                name: 'Basic',
                priceLabel: 'From $1,000',
                includes: ['Visual refresh', 'Mobile optimization', 'Basic improvements'],
                recommended: false
            },
            {
                name: 'Standard',
                priceLabel: 'From $1,800',
                includes: ['Complete redesign', 'UX improvements', 'Performance boost'],
                recommended: true
            },
            {
                name: 'Premium',
                priceLabel: 'From $2,800',
                includes: ['Full rebuild', 'Advanced features', 'Ongoing support'],
                recommended: false
            }
        ]
    },
    {
        id: 'ecommerce-solutions',
        title: 'E-Commerce Solutions',
        icon: 'fas fa-shopping-cart',
        description: 'Complete online stores with shopping cart, payment integration, and inventory management.',
        features: [
            'Shopping Cart System',
            'Payment Gateway',
            'Product Management',
            'Order Tracking'
        ],
        price: 'Starting at $1,500',
        featured: true,
        tiers: [
            {
                name: 'Basic',
                priceLabel: 'From $1,500',
                includes: ['Up to 50 products', 'Basic payment gateway', 'Order management'],
                recommended: false
            },
            {
                name: 'Standard',
                priceLabel: 'From $2,500',
                includes: ['Up to 200 products', 'Multiple payment options', 'Inventory tracking'],
                recommended: true
            },
            {
                name: 'Premium',
                priceLabel: 'From $4,000',
                includes: ['Unlimited products', 'Advanced analytics', 'Custom integrations'],
                recommended: false
            }
        ]
    },
    {
        id: 'maintenance-support',
        title: 'Maintenance & Support',
        icon: 'fas fa-tools',
        description: 'Ongoing website maintenance, updates, security monitoring, and technical support.',
        features: [
            'Regular Updates',
            'Security Monitoring',
            'Bug Fixes',
            'Technical Support'
        ],
        price: 'From $100/month',
        featured: false
    },
    {
        id: 'ebook-design',
        title: 'Ebook Design & Production',
        icon: 'fas fa-book',
        description: 'Professional ebook layout, formatting, and visual design services using client-provided content, delivered as a polished, digital-ready product optimized for readability, branding, and distribution.',
        features: [
            'Custom Ebook Layout & Design',
            'Branded Visual Styling',
            'PDF & Digital-Ready Formatting',
            'Optimized for Downloads & Lead Magnets'
        ],
        price: 'Starting at $700',
        featured: false
    },
    {
        id: 'landing-page',
        title: 'Landing Page',
        icon: 'fas fa-rocket',
        description: 'High-converting landing page design and development focused on speed, clarity, and conversions—perfect for ads, services, and product launches.',
        features: [
            'Conversion-Focused Layout',
            'Mobile-First Responsive Design',
            'Fast Load Speed Optimization',
            'Contact / Lead Capture Form'
        ],
        price: 'Starting at $900',
        featured: true
    },
    {
        id: 'digital-product-landing',
        title: 'Digital Product Landing Page',
        icon: 'fas fa-shopping-bag',
        description: 'A complete digital product landing page built to sell and deliver your ebook, course, downloadable product, or offer—includes purchase/download flow and a polished user experience.',
        features: [
            'Ebook / Course / Download Setup',
            'Payment or Checkout Integration (if applicable)',
            'Delivery System (download link / gated access)',
            'Email Capture + Lead Magnet Option'
        ],
        price: 'Starting at $1,200',
        featured: false
    },
    {
        id: 'ai-assistant',
        title: 'AI Assistant',
        icon: 'fas fa-robot',
        description: 'A custom AI assistant for your website that answers FAQs, captures leads, and guides visitors to the right actions—trained on your business content and tailored to your brand voice.',
        features: [
            'FAQ + Support Automation',
            'Lead Capture + Routing',
            'Custom Knowledge Base / Content Training',
            'Embedded Website Chat UI'
        ],
        price: 'Starting at $800',
        featured: false
    },
    {
        id: 'logo-design',
        title: 'Logo Design',
        icon: 'fas fa-palette',
        description: 'Professional logo design tailored to your brand—delivered with clean, scalable files and a polished look ready for web, print, and social media.',
        features: [
            'Custom Logo Concepts',
            'Brand-Ready Color & Typography',
            'High-Res + Vector File Delivery',
            'Social Media & Web-Optimized Exports'
        ],
        price: 'Starting at $200',
        featured: false
    }
];
