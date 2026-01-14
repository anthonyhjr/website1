/**
 * Chat Handler - Processes user messages with retrieval and compliance
 */

const { retrieveRelevantContent } = require('../utils/retrieval');
const { applyComplianceFilter } = require('../utils/compliance');
const { generateResponse } = require('../utils/responseGenerator');
const { classifyIntent, getIntentBehavior } = require('../utils/intentClassifier');
const { extractPageContext, prioritizeByPageContext } = require('../utils/pageContext');
const { loadServicesData } = require('../data/services-data');
const config = require('../../config/config');

async function chatHandler(req, res) {
  try {
    const { message, sessionId, pageUrl, referrer, locale } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'Message is required'
      });
    }

    const userMessage = message.trim();
    const session = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Step 1: Classify user intent
    const intent = classifyIntent(userMessage);
    const intentBehavior = getIntentBehavior(intent, config);

    // Step 2: Extract page context
    const pageContext = extractPageContext(pageUrl);
    if (pageContext) {
      pageContext.currentUrl = pageUrl;
    }

    // Step 3: Load fresh services data from shared source (single source of truth)
    // This ensures pricing and service info is always up-to-date
    const servicesData = loadServicesData();
    
    // Step 4: Retrieve relevant content from knowledge base
    let relevantContent = retrieveRelevantContent(
      userMessage,
      {
        faqs: config.faqs || [],
        services: servicesData, // Use dynamically loaded services with pricing
        policies: config.policies || [],
        navLinks: config.navLinks || []
      }
    );

    // Step 5: Prioritize content based on page context
    if (pageContext) {
      relevantContent = prioritizeByPageContext(relevantContent, pageContext);
    }

    // Step 6: Calculate confidence score
    const confidence = calculateConfidence(relevantContent, userMessage);

    // Step 7: Apply compliance filter (checks for blocked content, sensitive info, etc.)
    const complianceResult = applyComplianceFilter(userMessage, relevantContent, config);
    
    // Add metadata to compliance result
    complianceResult.relevantContent = relevantContent;
    complianceResult.intent = intent;
    complianceResult.intentBehavior = intentBehavior;
    complianceResult.confidence = confidence;
    complianceResult.pageContext = pageContext;
    complianceResult.servicesData = servicesData; // Pass services data for pricing validation

    // Step 8: Generate response with grounding context
    const response = generateResponse(
      userMessage,
      complianceResult,
      config
    );

    // Step 9: Determine if lead capture should be prompted
    const shouldPromptLead = shouldPromptForLead(userMessage, complianceResult, intentBehavior);

    res.json({
      ok: true,
      answer: response.answer,
      suggestedLinks: response.suggestedLinks || [],
      actions: response.actions || [],
      shouldPromptLead: shouldPromptLead,
      sessionId: session
    });

  } catch (error) {
    console.error('Chat handler error:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to process chat message',
      answer: "I apologize, but I'm having trouble processing your request. Please try again or contact us directly."
    });
  }
}

/**
 * Calculate confidence score (0-1) based on retrieval results
 */
function calculateConfidence(relevantContent, userMessage) {
  if (!relevantContent || relevantContent.length === 0) {
    return 0.2; // Low confidence if no results
  }
  
  const topResult = relevantContent[0];
  const maxPossibleScore = 15; // Approximate max score from retrieval
  
  // Normalize score to 0-1 range
  let confidence = Math.min(topResult.score / maxPossibleScore, 1);
  
  // Boost confidence if multiple results agree
  if (relevantContent.length >= 3) {
    confidence = Math.min(confidence + 0.1, 1);
  }
  
  // Lower confidence if top score is very low
  if (topResult.score < 3) {
    confidence = Math.max(confidence - 0.2, 0.1);
  }
  
  return confidence;
}

/**
 * Determine if lead capture should be prompted
 */
function shouldPromptForLead(userMessage, complianceResult, intentBehavior) {
  // Don't prompt if compliance blocked the request
  if (complianceResult.blocked) {
    return false;
  }
  
  // Use intent behavior to determine eligibility
  if (intentBehavior.allowLeadCapture) {
    return true;
  }
  
  // Fallback: explicit buying intent keywords
  const buyingIntentKeywords = [
    'hire', 'book', 'start', 'sign up', 'consultation', 'demo', 'quote',
    'pricing', 'cost', 'rates', 'packages', 'contact me', 'reach out',
    'get in touch', 'schedule', 'appointment'
  ];

  const lowerMessage = userMessage.toLowerCase();
  
  // Check for explicit buying intent
  for (const keyword of buyingIntentKeywords) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }

  return false;
}

module.exports = { chatHandler };
