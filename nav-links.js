/**
 * Navigation Links Configuration
 * Single source of truth for all navigation items across the website
 * Used by both header and footer navigation
 */

const navLinks = [
  {
    label: 'Home',
    href: 'index.html',
    id: 'home'
  },
  {
    label: 'Projects',
    href: 'projects.html',
    id: 'projects'
  },
  {
    label: 'Skills',
    href: 'skills.html',
    id: 'skills'
  },
  {
    label: 'Services',
    href: 'services.html',
    id: 'services'
  },
  {
    label: 'About',
    href: 'about.html',
    id: 'about'
  },
  {
    label: 'Contact',
    href: 'contact.html',
    id: 'contact'
  }
];

/**
 * Get the correct href for a navigation link based on current page
 * Handles cross-page navigation correctly
 */
function getNavHref(link, currentPage) {
  // If link is to a different page, use the href as-is
  if (link.href !== currentPage) {
    return link.href;
  }
  
  // If link is to current page, return just the hash (for smooth scroll)
  // This handles cases where we might want to scroll to a section on the same page
  return link.href;
}

/**
 * Render header navigation menu
 */
function renderHeaderNav(currentPage = '') {
  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;
  
  navMenu.innerHTML = navLinks.map(link => {
    const isActive = link.href === currentPage || 
                     (currentPage === '' && link.href === 'index.html');
    const activeClass = isActive ? ' active' : '';
    const href = getNavHref(link, currentPage);
    
    return `<li><a href="${href}" class="nav-link${activeClass}">${link.label}</a></li>`;
  }).join('');
}

/**
 * Render footer navigation menu
 */
function renderFooterNav(currentPage = '') {
  const footerLinks = document.querySelector('.footer-links');
  if (!footerLinks) return;
  
  footerLinks.innerHTML = navLinks.map(link => {
    const href = getNavHref(link, currentPage);
    return `<a href="${href}">${link.label}</a>`;
  }).join('');
}

/**
 * Initialize navigation on page load
 */
function initNavigation() {
  // Get current page name
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Render header and footer navigation
  renderHeaderNav(currentPage);
  renderFooterNav(currentPage);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { navLinks, renderHeaderNav, renderFooterNav, initNavigation };
}
