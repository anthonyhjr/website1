# Portfolio Website

A modern, responsive portfolio website with beautiful animations and eye-catching design.

## Features

- 🎨 **Modern Design**: Beautiful gradients, smooth animations, and professional aesthetics
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Smooth Animations**: Scroll animations, hover effects, and page transitions
- ✨ **Particles.js Background**: Interactive animated particles in hero section
- 🌙 **Dark Mode**: Toggle between light and dark themes with persistent preference
- 🎬 **Loading Animation**: Professional page loader with gradient spinner
- 📊 **Scroll Progress Bar**: Visual indicator of page scroll position
- ⬆️ **Back to Top Button**: Smooth scroll to top functionality
- 📄 **Resume Download**: One-click resume download button
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🎯 **Easy to Customize**: Simple HTML/CSS/JS structure for easy personalization
- 📧 **Working Contact Form**: Real email notifications via Web3Forms (free)
- 🔍 **SEO Optimized**: Comprehensive meta tags for search engines and social media
- 🔗 **Social Links**: Connect your social media profiles
- 🚫 **Custom 404 Page**: Beautiful error page with particles and navigation

## Sections

1. **Hero Section**: Eye-catching introduction with animated elements
2. **About Section**: Tell your story with impressive statistics
3. **Projects Section**: Showcase your work with beautiful cards
4. **Skills Section**: Display your technical abilities
5. **Contact Section**: Allow visitors to get in touch

## Customization Guide

### 1. Personal Information
Edit the following in `index.html`:
- Replace "Your Name" with your actual name
- Update job title/subtitle
- Modify the about section text
- Update statistics (years, projects, clients)

### 2. Projects
In the Projects section, update:
- Project titles
- Project descriptions
- Technology tags
- Project links (demo and GitHub)

### 3. Skills
Modify the skills lists to match your expertise in:
- Frontend Development
- Backend Development
- Tools & Technologies

### 4. Contact Information
Update in the Contact section:
- Email address
- Phone number
- Location
- Social media links

### 5. Colors & Styling
In `styles.css`, modify the CSS variables:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more variables */
}
```

### 6. Images
To add your profile image:
1. Replace the `.profile-circle` div with an `<img>` tag
2. Add your project screenshots in the `.project-image` divs

## Quick Start

1. **Open the website**: Simply open `index.html` in your browser
2. **Set up contact form**: Follow instructions in `CONTACT_FORM_SETUP.md` (takes 2 minutes)
3. **Customize content**: Edit the HTML, CSS, and JS files to personalize
4. **Update SEO**: Modify meta tags in `index.html` head section
5. **Deploy**: Upload to any hosting service (GitHub Pages, Netlify, Vercel, etc.)

## New Features Setup

### Dark Mode ✅
Already working! Click the moon/sun icon in the navigation bar. Your preference is saved automatically.

### Contact Form 📧
**Important:** To receive form submissions:
1. Get a free access key from [Web3Forms.com](https://web3forms.com)
2. Replace `YOUR_ACCESS_KEY_HERE` in `index.html` (line 255)
3. See `CONTACT_FORM_SETUP.md` for detailed instructions

### SEO & Meta Tags 🔍
Update these in `index.html` (lines 8-33):
- Page title and description
- Your website URL
- Social media preview image
- Keywords relevant to your work

### Resume Download 📄
**Important**: Add your resume PDF:
1. Create/export your resume as PDF
2. Name it `resume.pdf`
3. Place in root folder with `index.html`
4. See `RESUME_SETUP.md` for details

### New Professional Features ✨
- **Loading Animation**: Shows on page load (customizable in `script.js`)
- **Scroll Progress**: Updates automatically as you scroll
- **Back to Top**: Appears after scrolling 300px down
- **Accessibility**: Full keyboard navigation (try pressing Tab!)
- See `QUICK_WINS_GUIDE.md` for complete documentation

## Deployment Options

### GitHub Pages
1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in repository settings

### Netlify
1. Drag and drop your folder to Netlify
2. Your site is live instantly

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder
3. Follow the prompts

## Tips for an Eye-Catching Portfolio

1. **Use High-Quality Images**: Add screenshots of your actual projects
2. **Keep Content Updated**: Regularly add new projects and skills
3. **Add Real Links**: Connect working demos and GitHub repositories
4. **Personal Branding**: Use consistent colors and style
5. **Performance**: Optimize images and minimize code
6. **SEO**: Add meta tags and descriptions
7. **Analytics**: Add Google Analytics to track visitors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (with CSS Grid & Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Particles.js for animated backgrounds
- Web3Forms for contact form backend

## License

Feel free to use this template for your personal portfolio!

---

Made with ❤️ for developers and designers

