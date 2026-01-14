/**
 * Contact Form Renderer
 * Dynamically populates the "Service Interested In" dropdown from shared services data
 */

/**
 * Populate the service dropdown with all services from the shared data source
 */
function populateServiceDropdown() {
  const serviceSelect = document.getElementById('service');
  if (!serviceSelect || typeof servicesData === 'undefined') {
    // If servicesData is not loaded yet, try again after a short delay
    setTimeout(populateServiceDropdown, 100);
    return;
  }

  // Clear existing options (except the placeholder)
  const placeholder = serviceSelect.querySelector('option[value=""]');
  serviceSelect.innerHTML = '';
  
  // Add placeholder option
  if (placeholder) {
    serviceSelect.appendChild(placeholder);
  } else {
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Select a service...';
    serviceSelect.appendChild(placeholderOption);
  }

  // Sort services alphabetically by title (matching Services page order)
  const sortedServices = [...servicesData].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  // Add all services from shared data source
  sortedServices.forEach(service => {
    const option = document.createElement('option');
    option.value = service.id;
    option.textContent = service.title;
    serviceSelect.appendChild(option);
  });

  // Add fallback option at the end
  const otherOption = document.createElement('option');
  otherOption.value = 'other';
  otherOption.textContent = 'Not sure yet (tell us in message)';
  serviceSelect.appendChild(otherOption);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateServiceDropdown);
} else {
  populateServiceDropdown();
}
