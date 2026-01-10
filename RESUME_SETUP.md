# Resume Download Setup Guide

Your portfolio now has a **Download Resume** button in the hero section. Here's how to set it up:

## Quick Setup (2 minutes)

### Step 1: Create Your Resume PDF
1. Create your resume in Word, Google Docs, or Canva
2. Export/Save it as a PDF file
3. Name it `resume.pdf`

### Step 2: Add to Your Portfolio
1. Place `resume.pdf` in the same folder as `index.html`
2. That's it! The button will now download your actual resume

## Alternative Names

If you want to use a different filename:
1. Open `index.html`
2. Find line 95: `<a href="resume.pdf" download...`
3. Change `resume.pdf` to your filename (e.g., `YourName-Resume.pdf`)

## Resume Best Practices

### What to Include
✅ Contact information
✅ Professional summary
✅ Work experience with achievements
✅ Education and certifications
✅ Technical skills
✅ Notable projects
✅ Awards/accomplishments

### Design Tips
- Keep it 1-2 pages maximum
- Use consistent formatting
- Match colors to your portfolio theme
- Make it ATS-friendly (if applying to large companies)
- Use clear section headings
- Include quantifiable achievements

### File Tips
- **Format**: Always PDF (never .doc or .docx)
- **File size**: Under 2MB
- **File name**: Use something professional like "JohnDoe-Resume.pdf"
- **Version**: Keep it updated! Set a reminder to update every 3 months

## Testing

To test the download button:
1. Reload your portfolio
2. Click "Download Resume" in the hero section
3. Verify the PDF downloads correctly
4. Open it to ensure it looks good

## Current Status

Right now, clicking the button will try to download `resume.pdf` from the root folder.
**Action needed**: Add your actual resume PDF file to enable downloads.

## Resume Templates

Free resume templates:
- **Canva**: https://www.canva.com/templates/resumes/
- **Google Docs**: Templates menu → Resumes
- **Novoresume**: https://novoresume.com/
- **Resume.io**: https://resume.io/

## Advanced: Multiple Versions

Want to offer different resume versions?

```html
<!-- In hero section, add multiple buttons: -->
<a href="resume-detailed.pdf" download class="btn btn-outline">
    <i class="fas fa-file-alt"></i> Detailed Resume
</a>
<a href="resume-one-page.pdf" download class="btn btn-outline">
    <i class="fas fa-file"></i> One-Page Resume
</a>
```

---

**Pro Tip**: Make sure your resume matches your portfolio's aesthetic and personal brand!



















