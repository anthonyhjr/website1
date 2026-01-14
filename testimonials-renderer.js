// Testimonials Renderer - Renders testimonials from shared data
function renderTestimonials(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof testimonialsData === 'undefined') {
        console.error('Testimonials container not found or data not loaded');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render each testimonial
    testimonialsData.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.setAttribute('data-testimonial-id', testimonial.id);
        
        // Add animation delay for staggered effect (only if motion is not reduced)
        if (!prefersReducedMotion) {
            testimonialCard.style.opacity = '0';
            testimonialCard.style.transform = 'translateY(10px)';
            testimonialCard.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            testimonialCard.style.transitionDelay = `${index * 0.1}s`;
        } else {
            testimonialCard.style.opacity = '1';
            testimonialCard.style.transform = 'translateY(0)';
        }

        testimonialCard.innerHTML = `
            <div class="testimonial-quote">
                <i class="fas fa-quote-left"></i>
            </div>
            <p class="testimonial-text">
                "${testimonial.quote}"
            </p>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.avatar}</div>
                <div class="author-info">
                    <div class="author-name-wrapper">
                        <h4>${testimonial.name}</h4>
                        ${testimonial.verified ? '<span class="verified-badge" aria-label="Verified"><i class="fas fa-check-circle"></i></span>' : ''}
                        ${testimonial.logo ? `<img src="${testimonial.logo}" alt="${testimonial.name.split(' ')[0]}'s company logo" class="company-logo" onerror="this.style.display='none'">` : ''}
                    </div>
                    <p>${testimonial.role}</p>
                </div>
            </div>
            <div class="testimonial-rating">
                ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
            </div>
        `;

        container.appendChild(testimonialCard);
    });

    // Trigger scroll animation when testimonials enter viewport (only if motion is not reduced)
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

        // Observe all testimonial cards
        container.querySelectorAll('.testimonial-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        const testimonialsGrid = document.getElementById('testimonials-grid');
        if (testimonialsGrid) {
            renderTestimonials('testimonials-grid');
        }
    });
} else {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
        renderTestimonials('testimonials-grid');
    }
}
