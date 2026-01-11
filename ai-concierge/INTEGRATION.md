# Integration Guide

## Quick Start Integration

### 1. For Static HTML Sites

Add this code before the closing `</body>` tag in your HTML files:

```html
<!-- AI Concierge Widget -->
<script>
  // Configure widget
  window.CONCIERGE_API_URL = 'http://localhost:3001/api'; // Change to your API URL in production
  window.CONCIERGE_BUTTON_COLOR = '#6366f1'; // Your brand color
  window.CONCIERGE_POSITION = 'bottom-right'; // or 'bottom-left'
</script>
<script src="/path/to/widget/concierge-widget.js"></script>
```

### 2. For React/Next.js

**Create a component:**

```jsx
// components/ConciergeWidget.jsx
import { useEffect } from 'react';

export default function ConciergeWidget() {
  useEffect(() => {
    // Configure widget
    window.CONCIERGE_API_URL = process.env.NEXT_PUBLIC_CONCIERGE_API_URL || 'http://localhost:3001/api';
    window.CONCIERGE_BUTTON_COLOR = '#6366f1';
    
    // Load widget script
    const script = document.createElement('script');
    script.src = '/concierge-widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup on unmount
      const widget = document.getElementById('concierge-widget');
      const toggleBtn = document.getElementById('concierge-toggle-btn');
      if (widget) widget.remove();
      if (toggleBtn) toggleBtn.remove();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);
  
  return null;
}
```

**Use in your app:**

```jsx
// pages/_app.js or App.js
import ConciergeWidget from '../components/ConciergeWidget';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ConciergeWidget />
    </>
  );
}
```

### 3. For Vue.js

```vue
<!-- components/ConciergeWidget.vue -->
<template>
  <div></div>
</template>

<script>
export default {
  name: 'ConciergeWidget',
  mounted() {
    window.CONCIERGE_API_URL = process.env.VUE_APP_CONCIERGE_API_URL || 'http://localhost:3001/api';
    window.CONCIERGE_BUTTON_COLOR = '#6366f1';
    
    const script = document.createElement('script');
    script.src = '/concierge-widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    this.$once('hook:beforeDestroy', () => {
      const widget = document.getElementById('concierge-widget');
      const toggleBtn = document.getElementById('concierge-toggle-btn');
      if (widget) widget.remove();
      if (toggleBtn) toggleBtn.remove();
      if (script.parentNode) script.parentNode.removeChild(script);
    });
  }
};
</script>
```

### 4. Production Deployment

**Backend:**
- Deploy server to Heroku, Railway, Render, or your own server
- Set environment variables (PORT, ALLOWED_ORIGINS, WEBHOOK_URL)
- Update API URL in widget config

**Frontend:**
- Host `concierge-widget.js` on your CDN or static hosting
- Update `CONCIERGE_API_URL` to production API URL
- Test on production domain

## Customization

### Widget Colors

```javascript
window.CONCIERGE_BUTTON_COLOR = '#6366f1'; // Primary brand color
```

### Widget Position

```javascript
window.CONCIERGE_POSITION = 'bottom-right'; // or 'bottom-left'
```

### API Configuration

```javascript
window.CONCIERGE_API_URL = 'https://api.yourdomain.com/api';
```

## Testing

1. **Local Testing:**
   - Start backend: `cd ai-concierge && npm start`
   - Open website: Load page with widget script
   - Test chat: Send a message
   - Test lead capture: Ask for pricing/quote

2. **Production Testing:**
   - Verify API is accessible
   - Test CORS settings
   - Verify lead delivery
   - Test on mobile devices

## Troubleshooting

**Widget not loading:**
- Check script path is correct
- Verify script file exists
- Check browser console for errors

**API calls failing:**
- Verify `CONCIERGE_API_URL` is correct
- Check CORS settings in backend `.env`
- Verify backend is running and accessible

**Styling conflicts:**
- Widget uses scoped styles
- Check for CSS conflicts with z-index
- Verify no global styles affecting widget
