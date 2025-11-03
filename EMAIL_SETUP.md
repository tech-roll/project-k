# Email Configuration Setup Guide

## Overview
Your contact form is now configured to send emails to `sales@dhionix.com` using EmailJS service. This allows you to receive project inquiries directly in your email inbox.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your provider
5. **Important**: Use your `sales@dhionix.com` email account
6. Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:**
```
New Project Inquiry from {{from_name}}
```

**Body:**
```
Hello Dhionix Team,

You have received a new project inquiry through your website.

Customer Details:
Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Project Details:
{{message}}

---
This email was sent from your website contact form.
Reply directly to this email to respond to the customer.
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to "Account" → "General" in EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abc123def456`)
3. Copy this key

### 5. Update Configuration
1. Open `src/config/email.ts` in your project
2. Replace the placeholder values:
   ```typescript
   export const emailConfig = {
     serviceId: 'your_actual_service_id',    // From step 2
     templateId: 'your_actual_template_id',  // From step 3
     publicKey: 'your_actual_public_key',    // From step 4
   }
   ```

## How It Works

### Success Flow:
1. User fills out the contact form
2. Form data is sent to EmailJS
3. EmailJS forwards the email to `sales@dhionix.com`
4. User sees success message
5. Form is cleared

### Fallback Flow:
If EmailJS fails for any reason:
1. User's default email client opens
2. Email is pre-filled with form data
3. User can send manually
4. User sees fallback success message

## Testing
1. After configuration, test the form on your website
2. Fill out the form with test data
3. Check your `sales@dhionix.com` inbox
4. Verify you receive the formatted email

## Email Limits
- EmailJS free plan: 200 emails/month
- Upgrade to paid plan if you expect more inquiries

## Security Notes
- Public key is safe to use in frontend code
- EmailJS handles email authentication securely
- Form submissions are sent directly to EmailJS servers

## Troubleshooting
- If emails don't arrive, check spam folder
- Verify EmailJS service is properly configured
- Check browser console for error messages
- Ensure all configuration values are correct

## Alternative Simple Solution
If you prefer a simpler approach without EmailJS:
1. The form already has a fallback that opens the user's email client
2. This works immediately without any configuration
3. Users can send emails directly from their email application