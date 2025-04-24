# EmailJS Setup Guide

## Step 1: Create an EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. The free tier allows up to 200 emails per month, which is plenty for a portfolio site

## Step 2: Add an Email Service
1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps to connect your email account

## Step 3: Create an Email Template
1. In the EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your template with the following variables:
   - `{{from_name}}` - The name of the person contacting you
   - `{{from_email}}` - The email of the person contacting you
   - `{{message}}` - The message content
   - `{{to_name}}` - Your name (recipient)
4. Save your template

## Step 4: Get Your Configuration IDs
1. Find your "Service ID" in the Email Services tab
2. Find your "Template ID" in the Email Templates tab
3. Find your "Public Key" in the Account tab -> API Keys

## Step 5: Set Up Environment Variables
Create a `.env` file in your project root with your EmailJS credentials:

```
# EmailJS configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important:** For Vercel deployment, add these same environment variables in the Vercel dashboard under Project Settings > Environment Variables.

## Step 6: Test Your Form
Once your environment variables are set up:
1. Run your app locally with `npm run dev`
2. Fill out the contact form and submit
3. Check to make sure the email is delivered

## Troubleshooting
If you encounter issues:
1. Check the browser console for any errors
2. Verify that your environment variables are correctly set
3. Make sure your EmailJS service is properly connected
4. Try logging the values of your environment variables to verify they're accessible 