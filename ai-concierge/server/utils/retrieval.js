/**
 * Retrieval System - Finds relevant content from knowledge base
 * Uses keyword matching and simple TF-IDF-like scoring
 */

/**
 * Calculate simple term frequency score
 */
function calculateTF(term, text) {
  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();
  const matches = lowerText.match(new RegExp(lowerTerm, 'gi'));
  return matches ? matches.length : 0;
}

/**
 * Calculate relevance score for a document
 */
function calculateRelevanceScore(query, document, keywords = []) {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  const docText = `${document.text || ''} ${document.keywords?.join(' ') || ''}`.toLowerCase();
  
  let score = 0;

  // Exact phrase match (highest priority)
  if (docText.includes(query.toLowerCase())) {
    score += 10;
  }

  // Keyword matches
  for (const keyword of keywords) {
    if (docText.includes(keyword.toLowerCase())) {
      score += 3;
    }
  }

  // Term frequency
  for (const term of queryTerms) {
    const tf = calculateTF(term, docText);
    score += tf;
  }

  return score;
}

/**
 * Retrieve relevant content from knowledge base
 */
function retrieveRelevantContent(userMessage, knowledgeBase) {
  const results = [];

  // Extract keywords from user message
  const keywords = extractKeywords(userMessage);

  // Search FAQs
  if (knowledgeBase.faqs && knowledgeBase.faqs.length > 0) {
    for (const faq of knowledgeBase.faqs) {
      const score = calculateRelevanceScore(
        userMessage,
        {
          text: `${faq.q} ${faq.a}`,
          keywords: faq.tags || []
        },
        keywords
      );

      if (score > 0) {
        results.push({
          type: 'faq',
          content: faq,
          score: score,
          text: faq.a,
          url: faq.url || null,
          title: faq.q
        });
      }
    }
  }

  // Search Services
  if (knowledgeBase.services && knowledgeBase.services.length > 0) {
    for (const service of knowledgeBase.services) {
      const score = calculateRelevanceScore(
        userMessage,
        {
          text: `${service.name} ${service.summary || ''}`,
          keywords: service.keywords || []
        },
        keywords
      );

      if (score > 0) {
        results.push({
          type: 'service',
          content: service,
          score: score,
          text: service.summary || service.name,
          url: service.url || null,
          title: service.name
        });
      }
    }
  }

  // Search Policies
  if (knowledgeBase.policies && knowledgeBase.policies.length > 0) {
    for (const policy of knowledgeBase.policies) {
      const score = calculateRelevanceScore(
        userMessage,
        {
          text: `${policy.name} ${policy.summary || ''}`,
          keywords: policy.keywords || []
        },
        keywords
      );

      if (score > 0) {
        results.push({
          type: 'policy',
          content: policy,
          score: score,
          text: policy.summary || policy.name,
          url: policy.url || null,
          title: policy.name
        });
      }
    }
  }

  // Search Navigation Links
  if (knowledgeBase.navLinks && knowledgeBase.navLinks.length > 0) {
    for (const navLink of knowledgeBase.navLinks) {
      const score = calculateRelevanceScore(
        userMessage,
        {
          text: `${navLink.label}`,
          keywords: navLink.keywords || []
        },
        keywords
      );

      if (score > 0) {
        results.push({
          type: 'nav',
          content: navLink,
          score: score,
          text: navLink.label,
          url: navLink.url || null,
          title: navLink.label
        });
      }
    }
  }

  // Sort by relevance score (highest first)
  results.sort((a, b) => b.score - a.score);

  // Return top 3-6 results
  return results.slice(0, 6);
}

/**
 * Extract keywords from user message
 */
function extractKeywords(message) {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how'
  ]);

  const words = message.toLowerCase().split(/\s+/);
  return words
    .filter(word => word.length > 2 && !stopWords.has(word))
    .slice(0, 10); // Limit to top 10 keywords
}

module.exports = {
  retrieveRelevantContent,
  extractKeywords,
  calculateRelevanceScore
};
