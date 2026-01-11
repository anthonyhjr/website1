// ====================================
// Modern Portfolio Website - JavaScript
// ====================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================
    // Loading Animation
    // ==================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1000);

    // ==================
    // Typing Animation
    // ==================
    const typingText = document.getElementById('typingText');
    const typingSubtitle = document.getElementById('typingSubtitle');
    
    if (typingText) {
        const name = 'Anthony'; // Change to your actual name
        let charIndex = 0;
        
        function typeName() {
            if (charIndex < name.length) {
                typingText.textContent += name.charAt(charIndex);
                charIndex++;
                setTimeout(typeName, 150);
            } else {
                // Start typing subtitle after name is done
                setTimeout(() => {
                    typeSubtitle();
                }, 500);
            }
        }
        
        function typeSubtitle() {
            const subtitle = 'Web Developer & Designer';
            let subIndex = 0;
            
            function typeChar() {
                if (subIndex < subtitle.length && typingSubtitle) {
                    typingSubtitle.textContent += subtitle.charAt(subIndex);
                    subIndex++;
                    setTimeout(typeChar, 100);
                }
            }
            
            typeChar();
        }
        
        // Start typing after a short delay
        setTimeout(typeName, 500);
    }

    // ==================
    // Custom Cursor (Desktop Only)
    // ==================
    if (window.innerWidth > 768) {
        const cursor = document.getElementById('customCursor');
        const cursorDot = cursor?.querySelector('.cursor-dot');
        const cursorOutline = cursor?.querySelector('.cursor-outline');
        
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            // Smooth dot movement
            dotX += (mouseX - dotX) * 0.1;
            dotY += (mouseY - dotY) * 0.1;
            
            // Smooth outline movement (slower)
            outlineX += (mouseX - outlineX) * 0.05;
            outlineY += (mouseY - outlineY) * 0.05;
            
            if (cursorDot) {
                cursorDot.style.left = dotX + 'px';
                cursorDot.style.top = dotY + 'px';
            }
            
            if (cursorOutline) {
                cursorOutline.style.left = outlineX + 'px';
                cursorOutline.style.top = outlineY + 'px';
            }
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor?.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor?.classList.remove('hover');
            });
        });
    } else {
        // Hide custom cursor on mobile
        const cursor = document.getElementById('customCursor');
        if (cursor) cursor.style.display = 'none';
    }

    // ==================
    // Scroll Progress Bar
    // ==================
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ==================
    // Dark Mode Toggle
    // ==================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // ==================
    // Particles.js Setup
    // ==================
    function initParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer && typeof particlesJS !== 'undefined') {
            try {
                particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#667eea',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
            });
        } catch (error) {
            console.warn('Particles.js initialization error:', error);
        }

        // Adjust particles for dark mode
        const themeObserver = new MutationObserver(() => {
            const theme = html.getAttribute('data-theme');
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const pJS = window.pJSDom[0].pJS;
                if (theme === 'dark') {
                    pJS.particles.color.value = ['#6366f1', '#8b5cf6', '#ec4899'];
                    pJS.particles.line_linked.color = '#6366f1';
                    pJS.particles.opacity.value = 0.3;
                } else {
                    pJS.particles.color.value = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
                    pJS.particles.line_linked.color = '#667eea';
                    pJS.particles.opacity.value = 0.5;
                }
                pJS.fn.particlesRefresh();
            }
        });

        themeObserver.observe(html, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        }
    }
    
    // Wait for particles.js to load
    if (typeof particlesJS === 'undefined') {
        window.addEventListener('load', initParticles);
    } else {
        initParticles();
    }

    // ==================
    // Mobile Menu
    // ==================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(12px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
                document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'auto'; // Restore body scroll
            }
        });

        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'auto'; // Restore body scroll
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ==================
    // Active Nav Link Based on Current Page
    // ==================
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ==================
    // Back to Top Button
    // ==================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================
    // Statistics Counter Animation
    // ==================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ==================
    // Skills Progress Bar Animation
    // ==================
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                progressObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // ==================
    // Newsletter Form
    // ==================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            
            // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
            // For now, we'll show a success message
            newsletterMessage.textContent = 'Thank you for subscribing! Check your email to confirm.';
            newsletterMessage.className = 'newsletter-message success';
            newsletterForm.reset();
            
            // Track newsletter signup in analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'event_category': 'engagement',
                    'event_label': 'Newsletter Subscription'
                });
            }
            
            // Hide message after 5 seconds
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        });
    }

    // ==================
    // Cookie Consent
    // ==================
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice && cookieConsent) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('show');
            
            // Track cookie acceptance
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        });
    }
    
    if (declineCookies) {
        declineCookies.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('show');
            
            // Disable analytics if declined
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        });
    }

    // ==================
    // Social Sharing
    // ==================
    const shareButtons = document.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    const currentTitle = document.title;
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(currentTitle)}&body=${encodeURIComponent(currentUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                
                // Track social sharing
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'share', {
                        'method': platform,
                        'content_type': 'portfolio',
                        'item_id': currentUrl
                    });
                }
            }
        });
    });

    // ==================
    // FAQ Accordion
    // ==================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==================
    // Scroll Animations
    // ==================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.project-card, .stat-card, .skill-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });

    // ==================
    // Contact Form
    // ==================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Failed to send message. Please try again or email me directly.';
            } finally {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // ==================
    // Update Current Year
    // ==================
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ==================
    // Navbar Background on Scroll
    // ==================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    });

    // ==================
    // Prevent Body Scroll on Load
    // ==================
    document.body.style.overflow = 'hidden';
});

// Console Message
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 12px;');
