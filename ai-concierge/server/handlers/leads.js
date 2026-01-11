/**
 * Lead Handler - Captures leads with consent and delivers via webhook/email
 */

const config = require('../../config/config');

async function leadHandler(req, res) {
  try {
    const { name, email, phone, message, consent, sessionId, pageUrl } = req.body;

    // Validate required fields
    if (!name || !email || !consent) {
      return res.status(400).json({
        ok: false,
        error: 'Name, email, and consent are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid email format'
      });
    }

    // Validate consent
    if (consent !== true && consent !== 'true') {
      return res.status(400).json({
        ok: false,
        error: 'Consent must be confirmed'
      });
    }

    // Prepare lead data
    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      message: message ? message.trim() : null,
      consent: true,
      consentText: config.leadCapture?.consentText || 'User consented to being contacted',
      sessionId: sessionId || null,
      pageUrl: pageUrl || null,
      timestamp: new Date().toISOString(),
      source: 'ai-concierge-widget'
    };

    // Deliver lead based on config
    let deliveryResult;
    if (config.leadCapture?.deliveryMethod === 'webhook' && config.leadCapture?.endpoint) {
      deliveryResult = await deliverViaWebhook(leadData, config.leadCapture.endpoint);
    } else if (config.leadCapture?.deliveryMethod === 'email') {
      deliveryResult = await deliverViaEmail(leadData, config);
    } else {
      // Default: log to console (for development)
      console.log('📧 Lead captured:', leadData);
      deliveryResult = { ok: true, method: 'console' };
    }

    if (!deliveryResult.ok) {
      console.error('Lead delivery failed:', deliveryResult.error);
      // Still return success to user, but log the error
    }

    res.json({
      ok: true,
      message: 'Thank you! We\'ll be in touch soon.',
      leadId: `lead_${Date.now()}`
    });

  } catch (error) {
    console.error('Lead handler error:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to process lead'
    });
  }
}

/**
 * Deliver lead via webhook
 */
async function deliverViaWebhook(leadData, webhookUrl) {
  try {
    // Use built-in fetch (Node 18+) or provide fetch implementation
    const fetch = globalThis.fetch || require('node-fetch');
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    return { ok: true, method: 'webhook' };
  } catch (error) {
    return { ok: false, method: 'webhook', error: error.message };
  }
}

/**
 * Deliver lead via email (requires email service configuration)
 */
async function deliverViaEmail(leadData, config) {
  // This would integrate with an email service (SendGrid, AWS SES, etc.)
  // For now, log to console
  console.log('📧 Email delivery (not implemented):', leadData);
  
  // TODO: Implement email delivery
  // Example:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({...});
  
  return { ok: true, method: 'email', note: 'Email delivery not yet configured' };
}

module.exports = { leadHandler };
