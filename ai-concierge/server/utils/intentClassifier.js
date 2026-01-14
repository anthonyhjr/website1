/**
 * Intent Classifier - Classifies user intent before responding
 * Used to control response length, pricing disclosure, and lead capture eligibility
 */

/**
 * Classify user intent from message
 * Returns: navigation | information | clarification | comparison | pricing_intent | support | human_escalation
 */
function classifyIntent(userMessage, previousMessages = []) {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Human escalation keywords
  const escalationKeywords = [
    'talk to human', 'speak with someone', 'contact human', 'real person',
    'speak to agent', 'human representative', 'customer service', 'support team'
  ];
  
  if (escalationKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'human_escalation';
  }
  
  // Pricing intent keywords (enhanced)
  const pricingKeywords = [
    'price', 'cost', 'pricing', 'quote', 'rates', 'how much', 'payment',
    'fee', 'charge', 'budget', 'afford', 'expensive', 'cheap', 'package',
    'starting at', 'from', 'pricing for', 'cost of', 'price for', 'how much does',
    'what does', 'what is the price', 'what is the cost', 'pricing information'
  ];
  
  if (pricingKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'pricing_intent';
  }
  
  // Navigation intent
  const navigationKeywords = [
    'go to', 'show me', 'take me', 'navigate', 'find page', 'where is',
    'link to', 'page for', 'section for'
  ];
  
  if (navigationKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'navigation';
  }
  
  // Comparison intent
  const comparisonKeywords = [
    'compare', 'difference between', 'which is better', 'vs', 'versus',
    'what\'s the difference', 'which one'
  ];
  
  if (comparisonKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'comparison';
  }
  
  // Clarification intent (follow-up questions, "what do you mean", etc.)
  const clarificationKeywords = [
    'what do you mean', 'can you explain', 'elaborate', 'more about',
    'tell me more', 'what is', 'what are', 'define', 'explain'
  ];
  
  if (clarificationKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'clarification';
  }
  
  // Support intent (help, problem, issue, error)
  const supportKeywords = [
    'help', 'problem', 'issue', 'error', 'not working', 'broken', 'fix',
    'troubleshoot', 'stuck', 'can\'t', 'unable to'
  ];
  
  if (supportKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'support';
  }
  
  // Information intent (default for most queries)
  // Includes questions about services, features, policies, general info
  return 'information';
}

/**
 * Get intent-based behavior rules
 */
function getIntentBehavior(intent, config) {
  const behavior = {
    allowPricing: false,
    allowLeadCapture: false,
    responseLength: config.behavior?.responseLength || 'concise',
    progressiveDisclosure: true
  };
  
  switch (intent) {
    case 'pricing_intent':
      behavior.allowPricing = true;
      behavior.allowLeadCapture = true;
      behavior.responseLength = 'concise';
      break;
      
    case 'human_escalation':
      behavior.allowLeadCapture = true;
      behavior.responseLength = 'concise';
      behavior.progressiveDisclosure = false;
      break;
      
    case 'navigation':
      behavior.responseLength = 'very_concise';
      behavior.progressiveDisclosure = false;
      break;
      
    case 'information':
    case 'clarification':
      behavior.allowPricing = false;
      behavior.responseLength = config.behavior?.responseLength || 'concise';
      behavior.progressiveDisclosure = true;
      break;
      
    case 'comparison':
      behavior.responseLength = 'detailed';
      behavior.progressiveDisclosure = true;
      break;
      
    case 'support':
      behavior.allowLeadCapture = true; // Support issues may need contact
      behavior.responseLength = 'concise';
      break;
  }
  
  return behavior;
}

module.exports = {
  classifyIntent,
  getIntentBehavior
};
