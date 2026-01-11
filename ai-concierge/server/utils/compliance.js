/**
 * Compliance Filter - Safety checks before returning responses
 */

/**
 * Apply compliance filter to user message and retrieved content
 */
function applyComplianceFilter(userMessage, relevantContent, config) {
  const lowerMessage = userMessage.toLowerCase();

  // Check for sensitive information (SSN, bank numbers, passwords)
  const sensitivePatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card
    /\bpassword\s*[:=]\s*\w+/i, // Password disclosure
    /\bpin\s*[:=]\s*\d+/i // PIN disclosure
  ];

  for (const pattern of sensitivePatterns) {
    if (pattern.test(userMessage)) {
      return {
        blocked: true,
        reason: 'sensitive_data',
        message: "For your security, please don't share sensitive information like passwords, PINs, or account numbers in this chat. If you need to provide this information, please contact us directly through our secure contact form.",
        allowResponse: true
      };
    }
  }

  // Check for legal/medical/financial/tax advice requests
  const adviceKeywords = {
    legal: ['legal advice', 'sue', 'lawsuit', 'contract', 'liability', 'waiver', 'terms legally binding'],
    medical: ['medical advice', 'diagnosis', 'prescription', 'treatment', 'symptom', 'disease', 'medicine'],
    financial: ['financial advice', 'investment advice', 'stock', 'tax advice', 'irs', 'audit', 'deduction'],
    guarantee: ['guarantee', 'promise', 'guaranteed results', '100% sure', 'definitely will', 'assured']
  };

  // Legal advice check
  if (adviceKeywords.legal.some(keyword => lowerMessage.includes(keyword))) {
    return {
      blocked: true,
      reason: 'legal_advice',
      message: "I can't provide legal advice. For legal matters, please consult with a qualified attorney. I can help you find general information about our policies or connect you with our legal team if needed.",
      allowResponse: true,
      suggestedAction: 'contact'
    };
  }

  // Medical advice check
  if (adviceKeywords.medical.some(keyword => lowerMessage.includes(keyword))) {
    return {
      blocked: true,
      reason: 'medical_advice',
      message: "I can't provide medical advice. Please consult with a qualified healthcare professional for medical concerns. I can help you find information about our services or schedule a consultation.",
      allowResponse: true,
      suggestedAction: 'contact'
    };
  }

  // Financial/tax advice check
  if (adviceKeywords.financial.some(keyword => lowerMessage.includes(keyword))) {
    return {
      blocked: true,
      reason: 'financial_advice',
      message: "I can't provide financial or tax advice. For financial matters, please consult with a qualified financial advisor or tax professional. I can help you find information about our services or connect you with the right person.",
      allowResponse: true,
      suggestedAction: 'contact'
    };
  }

  // Guarantee requests check
  if (adviceKeywords.guarantee.some(keyword => lowerMessage.includes(keyword))) {
    return {
      blocked: true,
      reason: 'guarantee_request',
      message: "I can't make guarantees or promises about results. I can share general information about our services and help you understand what we offer. For specific expectations, I'd recommend speaking with our team directly.",
      allowResponse: true,
      suggestedAction: 'contact'
    };
  }

  // Check against blocked claims (from config)
  if (config.compliance && config.compliance.blockedClaims) {
    for (const blockedClaim of config.compliance.blockedClaims) {
      if (lowerMessage.includes(blockedClaim.toLowerCase())) {
        return {
          blocked: true,
          reason: 'blocked_claim',
          message: config.compliance.disclaimers?.general || "I can't discuss that topic. Is there something else I can help you with?",
          allowResponse: true
        };
      }
    }
  }

  // Check if message is within allowed topics
  if (config.allowedTopics && config.allowedTopics.length > 0) {
    const isAllowed = config.allowedTopics.some(topic => 
      lowerMessage.includes(topic.toLowerCase())
    );
    
    if (!isAllowed && relevantContent.length === 0) {
      return {
        blocked: false,
        reason: 'out_of_scope',
        message: "I'm not sure how to help with that. I can assist with questions about our services, policies, FAQs, or help you navigate our website. What would you like to know?",
        allowResponse: true
      };
    }
  }

  // Check restricted topics
  if (config.restrictedTopics && config.restrictedTopics.length > 0) {
    for (const restrictedTopic of config.restrictedTopics) {
      if (lowerMessage.includes(restrictedTopic.toLowerCase())) {
        return {
          blocked: true,
          reason: 'restricted_topic',
          message: "I can't discuss that topic. Please contact us directly for assistance with that matter.",
          allowResponse: true,
          suggestedAction: 'contact'
        };
      }
    }
  }

  // No compliance issues found
  return {
    blocked: false,
    reason: null,
    allowResponse: true
  };
}

module.exports = {
  applyComplianceFilter
};
