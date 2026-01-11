/**
 * Response Generator - Enhanced Aiden AI Concierge
 * Implements: Intent classification, confidence transparency, page-awareness,
 * progressive disclosure, voice guardrails, and completion guarantee
 */

const { answerExistsOnPage } = require('./pageContext');

/**
 * Generate response based on user message, compliance result, and retrieved content
 */
function generateResponse(userMessage, complianceResult, config) {
  const assistantName = config.assistantName || 'Aiden';
  
  // If compliance blocked, return the compliance message
  if (complianceResult.blocked && complianceResult.message) {
    return {
      answer: formatResponse(complianceResult.message, assistantName, complianceResult),
      suggestedLinks: complianceResult.suggestedAction === 'contact' 
        ? findContactLinks(config) 
        : [],
      actions: [],
      intent: complianceResult.intent,
      confidence: complianceResult.confidence || 0.5
    };
  }

  const relevantContent = complianceResult.relevantContent || [];
  const intent = complianceResult.intent || 'information';
  const intentBehavior = complianceResult.intentBehavior || {};
  const confidence = complianceResult.confidence || 0.5;
  const pageContext = complianceResult.pageContext || null;

  // Handle human escalation intent
  if (intent === 'human_escalation') {
    return {
      answer: formatResponse(
        `I'd be happy to connect you with our team. You can reach us through our contact form, email, or by scheduling a consultation. Would you like me to show you how to get in touch?`,
        assistantName,
        complianceResult
      ),
      suggestedLinks: findContactLinks(config),
      actions: [{ type: 'contact', label: 'Talk to a Human' }],
      intent: intent,
      confidence: 1.0,
      shouldPromptLead: true
    };
  }

  // Handle low confidence or no relevant content
  if (relevantContent.length === 0 || confidence < 0.4) {
    const uncertaintyMessage = confidence < 0.4 
      ? "I may be missing some details here, but I can point you in the right direction. "
      : "";
    
    return {
      answer: formatResponse(
        `${uncertaintyMessage}I'm not sure I have specific information about that. Could you rephrase your question or be more specific? I can help you with our services, policies, FAQs, or direct you to the right page.`,
        assistantName,
        complianceResult
      ),
      suggestedLinks: findContactLinks(config),
      actions: [
        { type: 'link', label: 'Contact Us', url: findContactUrl(config) },
        { type: 'link', label: 'View Services', url: findServicesUrl(config) }
      ],
      intent: intent,
      confidence: confidence
    };
  }

  // Build answer from relevant content
  const topResult = relevantContent[0];
  let answer = '';
  const suggestedLinks = [];
  const actions = [];

  // Check if answer exists on current page
  const existsOnPage = pageContext && answerExistsOnPage(pageContext, relevantContent);
  
  if (existsOnPage && topResult.url) {
    // Reference current page instead of repeating
    answer = "That information is available on this page. ";
    if (pageContext.section) {
      answer += `Check the "${pageContext.section}" section. `;
    }
    answer += "I can also provide more details if needed.";
  } else {
    // Generate response based on content type and intent
    answer = buildAnswerFromContent(topResult, relevantContent, intent, intentBehavior, confidence, config);
  }

  // Add relevant links
  addRelevantLinks(relevantContent, suggestedLinks, pageContext, intent);

  // Add next step (always completes the response)
  const nextStep = determineNextStep(userMessage, relevantContent, config, intent, intentBehavior);
  if (nextStep) {
    answer += ` ${nextStep}`;
  } else if (suggestedLinks.length > 0) {
    answer += ` Check out the links below for more information.`;
  }

  // Progressive disclosure: If service-related and progressive disclosure enabled
  if (topResult.type === 'service' && intentBehavior.progressiveDisclosure && 
      intent === 'information' && !userMessage.toLowerCase().includes('more')) {
    answer = applyProgressiveDisclosure(answer, topResult);
  }

  // Apply voice guardrails (remove hype, ensure professional tone)
  answer = applyVoiceGuardrails(answer);

  // Enforce completion guarantee (never cut off mid-sentence)
  answer = ensureCompleteResponse(answer, intentBehavior.responseLength);

  return {
    answer: answer.trim(),
    suggestedLinks: suggestedLinks.slice(0, 5),
    actions: actions,
    intent: intent,
    confidence: confidence
  };
}

/**
 * Build answer from retrieved content
 */
function buildAnswerFromContent(topResult, relevantContent, intent, intentBehavior, confidence, config) {
  let answer = '';

  // Add confidence transparency if needed
  if (confidence < 0.7 && confidence >= 0.4) {
    answer = "I may be missing some details here, but I can point you in the right direction. ";
  }

  // Direct FAQ match
  if (topResult.type === 'faq' && topResult.score > 5) {
    answer += topResult.text;
  } 
  // Service information
  else if (topResult.type === 'service') {
    if (intent === 'pricing_intent' && intentBehavior.allowPricing) {
      // Include pricing if allowed
      answer += `Based on your question about ${topResult.title}: ${topResult.text}`;
    } else {
      // Just summary for now (progressive disclosure)
      answer += `${topResult.text}`;
    }
  }
  // Navigation intent - be very concise
  else if (intent === 'navigation') {
    answer += `I can help you navigate to ${topResult.title}.`;
  }
  // Default: use the text
  else {
    answer += topResult.text || `Here's information about ${topResult.title}.`;
  }

  return answer;
}

/**
 * Apply progressive disclosure to service information
 */
function applyProgressiveDisclosure(answer, serviceResult) {
  // Extract first sentence as summary
  const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length > 1) {
    const summary = sentences[0].trim() + '.';
    return `${summary} Would you like more details about this service?`;
  }
  return answer;
}

/**
 * Add relevant links based on content and context
 */
function addRelevantLinks(relevantContent, suggestedLinks, pageContext, intent) {
  // For navigation intent, prioritize direct links
  if (intent === 'navigation') {
    for (const result of relevantContent.slice(0, 3)) {
      if (result.url) {
        suggestedLinks.push({
          label: result.title,
          url: result.url
        });
      }
    }
    return;
  }

  // For other intents, add top relevant links
  for (let i = 0; i < Math.min(3, relevantContent.length); i++) {
    const result = relevantContent[i];
    if (result.url && result.score > 2) {
      // Avoid duplicate links
      if (!suggestedLinks.find(link => link.url === result.url)) {
        suggestedLinks.push({
          label: result.title,
          url: result.url
        });
      }
    }
  }
}

/**
 * Determine appropriate next step (always completes the thought)
 */
function determineNextStep(userMessage, relevantContent, config, intent, intentBehavior) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Navigation intent
  if (intent === 'navigation') {
    return "Click the link below to go there.";
  }

  // Pricing intent - always suggest contact for accurate pricing
  if (intent === 'pricing_intent') {
    return "For specific pricing information, I recommend reaching out to our team directly.";
  }

  // Human escalation
  if (intent === 'human_escalation') {
    return "I can help you contact our team right now.";
  }

  // Support intent
  if (intent === 'support') {
    return "If this doesn't resolve your issue, please contact our support team.";
  }

  // Comparison intent
  if (intent === 'comparison') {
    return "Would you like more details about any of these options?";
  }

  // Information/clarification - offer to continue
  if (intent === 'information' || intent === 'clarification') {
    if (relevantContent.length > 1) {
      return "I have more information available if you'd like to learn more.";
    }
    return "Is there anything else I can help you with?";
  }

  // Default: offer contact if no other next step
  return "If you have more questions, feel free to contact us directly.";
}

/**
 * Apply voice and tone guardrails
 */
function applyVoiceGuardrails(text) {
  // Remove emojis (if any somehow got in)
  text = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
  
  // Remove hype language
  const hypeWords = ['amazing', 'incredible', 'guaranteed', 'best ever', 'revolutionary'];
  for (const word of hypeWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, '');
  }
  
  // Ensure confident but neutral tone (already handled by content, but double-check)
  // Replace any remaining hype phrases
  text = text.replace(/\b(guaranteed|promised|definitely will)\b/gi, 'typically');
  
  return text.trim();
}

/**
 * Ensure response is complete (never cuts off mid-sentence)
 */
function ensureCompleteResponse(text, responseLength) {
  // Define max lengths by response type
  const maxLengths = {
    'very_concise': 150,
    'concise': 400,
    'detailed': 600
  };
  
  const maxLength = maxLengths[responseLength] || 400;
  
  // If within limit, return as-is
  if (text.length <= maxLength) {
    return text;
  }
  
  // Find last complete sentence before limit
  const truncated = text.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );
  
  if (lastSentenceEnd > maxLength * 0.7) {
    // Cut at last sentence
    return text.substring(0, lastSentenceEnd + 1).trim() + " See the links below for complete information.";
  } else {
    // No good sentence break, but we need to cut - find last word
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.8) {
      return text.substring(0, lastSpace).trim() + "... See the links below for complete information.";
    }
  }
  
  // Fallback: just truncate but add continuation indicator
  return truncated.trim() + "... See the links below for complete information.";
}

/**
 * Format response with assistant name if needed (for consistency)
 */
function formatResponse(text, assistantName, complianceResult) {
  // Don't add name prefix - keep responses natural
  // Name is used in system context, not in every response
  return text;
}

/**
 * Find contact links from config
 */
function findContactLinks(config) {
  const links = [];
  
  if (config.navLinks) {
    const contactLink = config.navLinks.find(link => 
      link.label.toLowerCase().includes('contact') || 
      link.url.toLowerCase().includes('contact')
    );
    if (contactLink) {
      links.push({
        label: contactLink.label,
        url: contactLink.url
      });
    }
  }
  
  return links;
}

/**
 * Find contact URL
 */
function findContactUrl(config) {
  if (config.navLinks) {
    const contactLink = config.navLinks.find(link => 
      link.label.toLowerCase().includes('contact') || 
      link.url.toLowerCase().includes('contact')
    );
    if (contactLink) return contactLink.url;
  }
  return '/contact';
}

/**
 * Find services URL
 */
function findServicesUrl(config) {
  if (config.navLinks) {
    const servicesLink = config.navLinks.find(link => 
      link.label.toLowerCase().includes('service') || 
      link.url.toLowerCase().includes('service')
    );
    if (servicesLink) return servicesLink.url;
  }
  return '/services';
}

module.exports = {
  generateResponse
};
