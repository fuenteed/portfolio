# Email Setup Guide

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
# Required values
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_password_or_app_password
RECIPIENT_EMAIL=recipient@example.com

# Optional: Choose email service provider (outlook, gmail, or other)
EMAIL_SERVICE=outlook

# Optional: For custom SMTP servers (only used if EMAIL_SERVICE=other)
# EMAIL_HOST=custom.smtp.server
# EMAIL_PORT=587
# EMAIL_SECURE=false
```

## Troubleshooting "The string did not match the expected pattern" Error

This error typically comes from Outlook/Office365 SMTP authentication issues:

### For Outlook/Office365 Users:

1. **Use your complete email address** as the `EMAIL_USER` (e.g., `your.name@outlook.com`)

2. **If you have Two-Factor Authentication (2FA) enabled**:
   - Create an app password at: https://account.microsoft.com/security
   - Use this app password instead of your regular password

3. **Check Less Secure App Access**:
   - Microsoft might block "basic authentication" for security
   - Visit: https://account.live.com/proofs/Manage/additional
   - Enable "Less secure app access" if available

### Try Gmail Instead:

If Outlook still doesn't work, try using Gmail:

1. Set `EMAIL_SERVICE=gmail` in your `.env` file
2. Update `EMAIL_USER` to your Gmail address
3. For Gmail, you need to:
   - Enable "Less secure app access" in your Google Account settings
   - Or create an app password if you have 2FA enabled

### Running Locally:

```bash
# Run both the Vue app and API server
npm run dev:full
```

### Deploying to Vercel:

Add all environment variables in the Vercel dashboard under Project Settings > Environment Variables. 