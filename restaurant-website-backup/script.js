// ====================================
// Island Spice & Basil - JavaScript
// Caribbean Thai Fusion Restaurant
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================
    // Mobile Navigation
    // ==================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(12px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ==================
    // Menu Filtering (Menu Page)
    // ==================
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuNavBtns.length > 0 && menuCategories.length > 0) {
        menuNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                menuNavBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter menu categories
                menuCategories.forEach(cat => {
                    if (category === 'all') {
                        cat.style.display = 'block';
                        fadeIn(cat);
                    } else if (cat.getAttribute('data-category') === category) {
                        cat.style.display = 'block';
                        fadeIn(cat);
                    } else {
                        fadeOut(cat);
                    }
                });
                
                // Smooth scroll to menu content
                const menuContent = document.querySelector('.menu-category');
                if (menuContent) {
                    menuContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    // Helper functions for fade animations
    function fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        let opacity = 0;
        const timer = setInterval(function() {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, 30);
    }
    
    function fadeOut(element) {
        let opacity = 1;
        const timer = setInterval(function() {
            if (opacity <= 0) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = opacity;
            opacity -= 0.1;
        }, 30);
    }
    
    // ==================
    // Contact Form Handling
    // ==================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to a server
            // For now, we'll just show the success message
            console.log('Form submitted:', formData);
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Optional: Reset form after a delay and show it again
            setTimeout(function() {
                contactForm.reset();
                // Uncomment below if you want to show form again after 5 seconds
                // formSuccess.style.display = 'none';
                // contactForm.style.display = 'block';
            }, 3000);
        });
    }
    
    // ==================
    // Smooth Scrolling for Anchor Links
    // ==================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scrolling if the href is not just "#"
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==================
    // Navbar Background on Scroll
    // ==================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // ==================
    // Animate Elements on Scroll
    // ==================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.dish-card, .value-card, .chefs-kiss-card, .press-article, .platform-card, .menu-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==================
    // Dynamic Year in Footer
    // ==================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Island Spice & Basil. All rights reserved.`;
    }
    
    // ==================
    // Add Loading Animation to Buttons
    // ==================
    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(btn => {
        // Add hover effect
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        // Handle external links
        if (btn.getAttribute('target') === '_blank') {
            btn.addEventListener('click', function(e) {
                // Add a brief animation before opening link
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        }
    });
    
    // ==================
    // Lazy Loading for Images (if any are added)
    // ==================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ==================
    // Add Active State to Current Page in Navigation
    // ==================
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentLocation || (currentLocation === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ==================
    // Menu Item Hover Effects
    // ==================
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeft = '5px solid var(--caribbean-orange)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderLeft = 'none';
            }
        });
    });
    
    // ==================
    // Dish Card Tilt Effect (Optional Enhancement)
    // ==================
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ==================
    // Scroll to Top Button (Optional)
    // ==================
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--caribbean-orange), var(--caribbean-red));
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for scroll to top button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    // ==================
    // Console Welcome Message
    // ==================
    console.log('%c🌴 Welcome to Island Spice & Basil! 🌿', 'color: #fcd116; font-size: 20px; font-weight: bold;');
    console.log('%cWhere Caribbean Soul Meets Thai Elegance', 'color: #009639; font-size: 14px;');
    console.log('');
    console.log('Hungry? Order now at:');
    console.log('DoorDash: https://www.doordash.com');
    console.log('Uber Eats: https://www.ubereats.com');
    console.log('Or call us: (212) 555-THAI');
    
});

// ==================
// Performance Monitoring (Optional)
// ==================
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// ==================
// Service Worker Registration (for PWA - Optional Future Enhancement)
// ==================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}
