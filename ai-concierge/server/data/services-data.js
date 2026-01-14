/**
 * Services Data - Single Source of Truth for AI Assistant
 * This file loads services from the shared services-data.js file
 * DO NOT hardcode pricing here - always import from the shared source
 */

const path = require('path');
const fs = require('fs');
const vm = require('vm');

// Path to the shared services data file
const servicesDataPath = path.join(__dirname, '../../../services-data.js');

/**
 * Load services data from shared source
 * This ensures the AI always uses the latest pricing and service information
 * Data is loaded fresh per request (or can be cached with short TTL)
 */
function loadServicesData() {
  try {
    // Read the file as text
    const fileContent = fs.readFileSync(servicesDataPath, 'utf8');
    
    // Create a safe context for evaluating the services data
    const context = { servicesData: null };
    const script = new vm.Script(`
      ${fileContent}
      servicesData;
    `);
    
    // Execute in a sandboxed context
    const servicesData = script.runInNewContext(context);
    
    if (!Array.isArray(servicesData) || servicesData.length === 0) {
      console.error('Services data is not a valid array or is empty');
      return [];
    }
    
    // Transform to AI-friendly format with pricing
    return servicesData.map(service => {
      // Generate keywords from title, description, and features
      const titleWords = (service.title || '').toLowerCase().split(/\s+/);
      const descWords = (service.description || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const featureWords = (service.features || [])
        .map(f => f.toLowerCase().split(/\s+/))
        .flat()
        .filter(w => w.length > 3);
      
      const allKeywords = [...titleWords, ...descWords, ...featureWords];
      const uniqueKeywords = [...new Set(allKeywords)].slice(0, 15);
      
      return {
        id: service.id,
        name: service.title,
        url: `/services.html#${service.id}`,
        summary: service.description,
        priceLabel: service.price || null, // "Starting at $600" or "From $100/month"
        keywords: uniqueKeywords,
        description: service.description,
        features: service.features || [],
        featured: service.featured || false
      };
    });
  } catch (error) {
    console.error('Error loading services data:', error);
    console.error('Stack:', error.stack);
    // Return empty array if file can't be loaded
    return [];
  }
}

// Export function to load fresh data (called per request or cached with short TTL)
module.exports = {
  loadServicesData
};
