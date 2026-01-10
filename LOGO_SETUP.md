# Logo Setup Instructions

## How to Add Your HARTWEBDEV Logo

1. **Save your logo image file** with one of these names:
   - `hartwebdev-logo.png`
   - `hartwebdev-logo.jpg`
   - `hartwebdev-logo.svg`

2. **Place the file** in the `images` folder:
   ```
   website1/
   └── images/
       └── hartwebdev-logo.png  (your logo file here)
   ```

3. **If your file has a different name or format**, update the path in all HTML files:
   - index.html
   - about.html
   - projects.html
   - skills.html
   - contact.html
   
   Change this line:
   ```html
   <img src="images/hartwebdev-logo.png" alt="HARTWEBDEV Logo" class="logo-img">
   ```
   
   To match your filename, for example:
   ```html
   <img src="images/my-logo.png" alt="HARTWEBDEV Logo" class="logo-img">
   ```

## Supported Formats
- PNG (recommended - supports transparency)
- JPG/JPEG
- SVG (scalable vector graphics - best for logos)

## Current Logo Path
The logo is currently set to: `images/hartwebdev-logo.png`

Once you add the file, the logo will automatically appear on all pages!










