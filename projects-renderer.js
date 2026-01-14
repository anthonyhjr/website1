// Projects Renderer with Filtering Functionality
function renderProjects(containerId, category = 'all') {
    const container = document.getElementById(containerId);
    if (!container || typeof projectsData === 'undefined') {
        console.error('Projects container not found or data not loaded');
        return;
    }

    const filteredProjects = filterProjectsByCategory(category);
    
    // Clear container
    container.innerHTML = '';

    if (filteredProjects.length === 0) {
        container.innerHTML = `
            <div class="no-projects-message">
                <p>No projects found in this category.</p>
            </div>
        `;
        return;
    }

    // Render each project
    filteredProjects.forEach((project, index) => {
        const projectCard = document.createElement('article');
        projectCard.className = `project-card ${project.gradient}`;
        projectCard.setAttribute('data-project-id', project.id);
        projectCard.setAttribute('data-category', project.category);
        
        // Add animation delay for staggered effect
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(20px)';
        projectCard.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        projectCard.style.transitionDelay = `${index * 0.1}s`;

        const tagsHtml = project.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        projectCard.innerHTML = `
            <div class="project-media">
                <div class="project-icon">
                    <i class="${project.icon}" aria-hidden="true"></i>
                </div>
                <div class="project-actions">
                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-btn btn-live" aria-label="View ${project.title} live demo">
                        <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
                        Live Demo
                    </a>
                    ${project.githubUrl ? `
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn btn-github" aria-label="View ${project.title} on GitHub">
                            <i class="fab fa-github" aria-hidden="true"></i>
                            Code
                        </a>
                    ` : ''}
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">${tagsHtml}</div>
            </div>
        `;

        container.appendChild(projectCard);
    });

    // Trigger scroll animation when projects enter viewport
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        container.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    } else {
        // If reduced motion, show immediately
        container.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
}

// Initialize project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectsContainer = document.getElementById('projects-grid');
    
    if (!filterButtons.length || !projectsContainer) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update URL hash without scrolling
            if (history.pushState) {
                history.pushState(null, null, `#${category}`);
            }
            
            // Render filtered projects
            renderProjects('projects-grid', category);
            
            // Scroll to top of projects section smoothly
            const projectsSection = document.querySelector('.projects-section');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Handle initial hash on page load
    const hash = window.location.hash.replace('#', '');
    if (hash && ['all', 'website', 'game'].includes(hash)) {
        const button = document.querySelector(`[data-category="${hash}"]`);
        if (button) {
            button.click();
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            renderProjects('projects-grid', 'all');
        }
        initProjectFilters();
    });
} else {
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        renderProjects('projects-grid', 'all');
    }
    initProjectFilters();
}
