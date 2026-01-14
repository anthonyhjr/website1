// Projects Data - Single Source of Truth with Categories for Filtering
const projectsData = [
    // Websites
    {
        id: 'ink-soul',
        title: 'Ink & Soul',
        category: 'website',
        description: 'A modern website for a tattoo studio built with React and Node.js. Features include user authentication, real-time updates, and responsive design.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveUrl: 'https://loquacious-heliotrope-4e3d17.netlify.app/',
        githubUrl: null,
        icon: 'fas fa-feather-pointed',
        gradient: 'gradient-ink'
    },
    {
        id: 'island-spice',
        title: 'Island Spice & Basil',
        category: 'website',
        description: 'A mobile-friendly restaurant experience with a full interactive menu and online ordering flow that can be tailored to any cuisine.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveUrl: 'https://darling-parfait-6813a7.netlify.app/',
        githubUrl: null,
        icon: 'fas fa-utensils',
        gradient: 'gradient-spice'
    },
    {
        id: 'real-estate',
        title: 'Real Estate Website',
        category: 'website',
        description: 'A polished real estate platform featuring property search, interactive filters, listing galleries, and immersive 3D tour demos.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveUrl: 'https://jazzy-peony-ce63ff.netlify.app/',
        githubUrl: null,
        icon: 'fas fa-house-chimney',
        gradient: 'gradient-estate'
    },
    {
        id: 'ecommerce',
        title: 'E-Commerce Website',
        category: 'website',
        description: 'An e-commerce experience with cart management, payment integrations, and an admin-ready dashboard built for scalability.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveUrl: 'https://jazzy-rabanadas-0dcd58.netlify.app/',
        githubUrl: null,
        icon: 'fas fa-cart-shopping',
        gradient: 'gradient-commerce'
    },
    {
        id: 'swift-converter',
        title: 'Swift Converter',
        category: 'website',
        description: 'Swift Converter is a fast, user-friendly file converter that helps you quickly transform documents and media into the formats you need. Built for simplicity, speed, and a smooth experience on any device.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveUrl: 'https://illustrious-monstera-550a46.netlify.app',
        githubUrl: null,
        icon: 'fas fa-exchange-alt',
        gradient: 'gradient-converter'
    },
    // Games
    {
        id: 'match-3',
        title: 'Match 3 Demo',
        category: 'game',
        description: 'A relaxing match-3 prototype built with HTML, CSS, and JavaScript that showcases future plans for power-ups and level progression.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveUrl: 'https://polite-capybara-ad38c9.netlify.app/',
        githubUrl: null,
        icon: 'fas fa-gamepad',
        gradient: 'gradient-match'
    },
    {
        id: 'brick-breaker',
        title: 'Brick Breaker Demo',
        category: 'game',
        description: 'A retro-inspired brick breaker concept featuring multiple power-ups and 100 planned levels, engineered with performant vanilla web technologies.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveUrl: 'https://storied-dasik-c3ae7b.netlify.app/',
        githubUrl: null,
        icon: 'fas fa-shuttle-space',
        gradient: 'gradient-brick'
    }
];

// Get unique categories for filters
function getProjectCategories() {
    const categories = [...new Set(projectsData.map(project => project.category))];
    return categories;
}

// Filter projects by category
function filterProjectsByCategory(category) {
    if (category === 'all') {
        return projectsData;
    }
    return projectsData.filter(project => project.category === category);
}
