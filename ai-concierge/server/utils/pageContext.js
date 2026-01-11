/**
 * Page Context Analyzer - Provides page-aware responses
 */

/**
 * Extract page context from URL
 */
function extractPageContext(pageUrl) {
  if (!pageUrl) return null;
  
  try {
    const url = new URL(pageUrl);
    const path = url.pathname.toLowerCase();
    
    // Extract page type and keywords
    const context = {
      pageType: 'unknown',
      keywords: [],
      section: null
    };
    
    // Determine page type
    if (path === '/' || path === '/index.html') {
      context.pageType = 'home';
      context.keywords = ['home', 'main', 'landing', 'overview'];
    } else if (path.includes('service')) {
      context.pageType = 'services';
      context.keywords = ['services', 'offerings', 'solutions', 'what we do'];
    } else if (path.includes('about')) {
      context.pageType = 'about';
      context.keywords = ['about', 'company', 'who we are', 'team'];
    } else if (path.includes('contact')) {
      context.pageType = 'contact';
      context.keywords = ['contact', 'reach out', 'get in touch'];
    } else if (path.includes('project') || path.includes('portfolio')) {
      context.pageType = 'projects';
      context.keywords = ['projects', 'portfolio', 'work', 'examples'];
    } else if (path.includes('skill')) {
      context.pageType = 'skills';
      context.keywords = ['skills', 'expertise', 'technologies'];
    }
    
    // Extract section from hash
    if (url.hash) {
      context.section = url.hash.substring(1); // Remove #
    }
    
    return context;
  } catch (e) {
    return null;
  }
}

/**
 * Prioritize content based on page context
 */
function prioritizeByPageContext(results, pageContext) {
  if (!pageContext || results.length === 0) return results;
  
  // Boost relevance for page-relevant content
  return results.map(result => {
    let boostedScore = result.score;
    
    // Check if result keywords match page keywords
    const resultText = `${result.text} ${result.title}`.toLowerCase();
    for (const keyword of pageContext.keywords) {
      if (resultText.includes(keyword.toLowerCase())) {
        boostedScore += 3; // Boost page-relevant content
        break;
      }
    }
    
    // Check if result URL matches current page
    if (result.url) {
      try {
        const resultUrl = new URL(result.url, 'http://example.com');
        if (pageContext.section && resultUrl.hash === `#${pageContext.section}`) {
          boostedScore += 5; // Strong boost for same section
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }
    
    return {
      ...result,
      score: boostedScore
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Check if answer exists on current page
 */
function answerExistsOnPage(pageContext, relevantContent) {
  if (!pageContext || !relevantContent || relevantContent.length === 0) {
    return false;
  }
  
  // Check if top result is from current page
  const topResult = relevantContent[0];
  if (topResult.url) {
    try {
      const resultUrl = new URL(topResult.url, 'http://example.com');
      const pageUrl = new URL(pageContext.currentUrl || '', 'http://example.com');
      
      // Same page if paths match (ignoring hash)
      if (resultUrl.pathname === pageUrl.pathname) {
        return true;
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }
  
  return false;
}

module.exports = {
  extractPageContext,
  prioritizeByPageContext,
  answerExistsOnPage
};
