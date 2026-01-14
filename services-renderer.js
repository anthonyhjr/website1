// Services Renderer - Renders services from shared data with conversion-optimized layout
function renderServices(containerId, showFeaturedOnly = false, showTiers = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Filter services based on featured flag
    let servicesToRender = showFeaturedOnly 
        ? servicesData.filter(service => service.featured)
        : servicesData;

    // Clear container
    container.innerHTML = '';

    // Render each service
    servicesToRender.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.setAttribute('data-service-id', service.id);
        
        // Build features list HTML
        const featuresHtml = service.features.map(feature => 
            `<li class="service-feature-item"><i class="fas fa-check"></i> <span>${feature}</span></li>`
        ).join('');

        // Determine if we should show tiers
        // On Services page (showTiers=true), show tiers if available
        // On Home page (showTiers=false), show simple price
        const hasTiers = service.tiers && service.tiers.length > 0;
        const shouldShowTiers = showTiers && hasTiers;

        // Build pricing section
        let pricingHtml = '';
        if (shouldShowTiers) {
            // Tiered pricing display
            pricingHtml = `
                <div class="service-tiers-wrapper">
                    <div class="service-tiers">
                        ${service.tiers.map(tier => `
                            <div class="service-tier ${tier.recommended ? 'tier-recommended' : ''}">
                                ${tier.recommended ? '<span class="tier-badge">Recommended</span>' : ''}
                                <div class="tier-name">${tier.name}</div>
                                <div class="tier-price">${tier.priceLabel}</div>
                                ${tier.includes && tier.includes.length > 0 ? `
                                    <ul class="tier-includes">
                                        ${tier.includes.slice(0, 3).map(include => `<li class="tier-include-item">${include}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            // Simple price display
            pricingHtml = `<div class="service-price">${service.price}</div>`;
        }

        // Build CTA section
        const ctaHref = `contact.html?service=${encodeURIComponent(service.id)}`;
        
        // Show starting price above CTA for specific services with tiers
        const showPriceAboveCTA = ['website-development', 'website-redesign', 'ecommerce-solutions'].includes(service.id);
        const priceAboveCTA = showPriceAboveCTA ? `<div class="service-starting-price">${service.price}</div>` : '';
        
        const ctaHtml = `
            <div class="service-cta-section">
                ${priceAboveCTA}
                <a href="${ctaHref}" class="btn btn-primary service-cta-btn">Request Quote</a>
            </div>
        `;

        // Build service card HTML with 3 sections: header, bullets, footer
        serviceCard.innerHTML = `
            <!-- Header Section -->
            <div class="service-header">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p class="service-description">${service.description}</p>
            </div>
            
            <!-- Bullets Section (normalized height) -->
            <div class="service-bullets-wrapper">
                <ul class="service-features">
                    ${featuresHtml}
                </ul>
            </div>
            
            <!-- Footer Section (pinned) -->
            <div class="service-footer">
                <div class="service-divider"></div>
                ${pricingHtml}
                ${ctaHtml}
            </div>
        `;

        container.appendChild(serviceCard);
    });
}
