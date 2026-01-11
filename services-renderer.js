// Services Renderer - Renders services from shared data
function renderServices(containerId, showFeaturedOnly = false) {
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
        
        // Build features list HTML
        const featuresHtml = service.features.map(feature => 
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');

        // Build service card HTML
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul class="service-features">
                ${featuresHtml}
            </ul>
            <div class="service-price">${service.price}</div>
        `;

        container.appendChild(serviceCard);
    });
}
