# Contact Form Setup Instructions

## Quick Setup (2 minutes)

Your contact form is configured to use **Web3Forms** - a free email service that sends form submissions directly to your email inbox.

### Step 1: Get Your Free Access Key

1. Visit **[Web3Forms.com](https://web3forms.com)**
2. Click **"Get Started"** or **"Create Access Key"**
3. Enter your email address: **ahartwelljr1690@gmail.com**
4. Click **"Create Access Key"**
5. Check your email inbox for a verification email
6. Click the verification link in the email
7. Copy your access key (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 2: Add Your Access Key

1. Open `contact.html`
2. Find line 89 that says:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key from Web3Forms
4. Save the file

### Step 3: Test the Form

1. Open your website in a browser
2. Navigate to the Contact page
3. Fill out the form:
   - Your Name
   - Your Email
   - Service Interested In (dropdown will auto-populate)
   - Subject
   - Message
4. Click "Send Message"
5. Check your email (ahartwelljr1690@gmail.com) for the submission

## What Gets Sent

When someone submits the form, you'll receive an email with:
- **Name**: The person's name
- **Email**: Their email address (so you can reply)
- **Service**: Which service they're interested in
- **Subject**: The subject line
- **Message**: Their message

## Troubleshooting

**Form doesn't send:**
- Make sure you replaced `YOUR_ACCESS_KEY_HERE` with your actual key
- Check browser console for errors (Press F12, go to Console tab)
- Verify your internet connection
- Make sure you verified your email with Web3Forms

**Not receiving emails:**
- Check your spam/junk folder
- Verify you clicked the verification link in the Web3Forms email
- Check that your access key is correct (no extra spaces)
- Try creating a new access key if the first one doesn't work

**Form shows error message:**
- Check that all required fields are filled
- Verify the access key is correct
- Check browser console for specific error messages

## Alternative: Use Your Own Email Service

If you prefer not to use Web3Forms, you can:

1. **Use a backend service** (Node.js, PHP, etc.) to send emails
2. **Use a service like Formspree, EmailJS, or SendGrid**
3. **Set up a serverless function** (Netlify Functions, Vercel Functions, etc.)

The form is already set up to work with Web3Forms, so the easiest option is to get a free access key from them.

## Current Configuration

- **Form endpoint**: `https://api.web3forms.com/submit`
- **Email recipient**: Will be set when you create your access key
- **Form fields**: Name, Email, Service, Subject, Message
- **Service dropdown**: Automatically populated from `services-data.js`

## Free Plan Limits

Web3Forms free plan includes:
- ✅ 250 submissions per month
- ✅ Email notifications
- ✅ Spam protection
- ✅ No credit card required

If you need more submissions, they offer paid plans starting at $5/month.
