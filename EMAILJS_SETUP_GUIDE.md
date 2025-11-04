# EmailJS Setup Guide for Dhionix Contact Form

## ⚠️ IMPORTANT: Email Not Working Without This Setup!

Your contact form is currently **NOT receiving emails** because EmailJS needs to be properly configured. Follow these steps exactly:

## Step 1: Create EmailJS Account (FREE)

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (it's free!)
3. Create account with any email address
4. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (recommended)
4. Connect your **sales@dhionix.com** Gmail account:
   - Make sure sales@dhionix.com is a real Gmail account
   - If not Gmail, you can use Outlook or other email providers
   - Grant necessary permissions
5. **IMPORTANT**: Copy the **Service ID** (looks like `service_abc123`)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. Set **Template Name**: `Dhionix Contact Form`
4. Configure the template:

### Template Settings:
- **Template ID**: Note this down (looks like `template_xyz789`)
- **Subject**: `New Project Inquiry from {{from_name}}`
- **Content** (copy exactly):

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
Reply directly to this email to respond to the customer.
Customer email: {{reply_to}}
Sent to: {{to_email}}
Timestamp: {{timestamp}}
Source: {{source}}
```

5. **IMPORTANT**: Set **Reply-To** field to `{{reply_to}}`
6. Save the template

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"** in EmailJS dashboard
2. Find **"Public Key"** section
3. **IMPORTANT**: Copy your **Public Key** (looks like `abc123xyz`)

## Step 5: Update Configuration File

1. Open `src/config/email.ts` in your project
2. Replace these values with your actual EmailJS credentials:

```typescript
export const emailConfig = {
  serviceId: 'YOUR_SERVICE_ID_FROM_STEP_2', // e.g., 'service_abc123'
  templateId: 'YOUR_TEMPLATE_ID_FROM_STEP_3', // e.g., 'template_xyz789'
  publicKey: 'YOUR_PUBLIC_KEY_FROM_STEP_4', // e.g., 'abc123xyz'
  recipientEmail: 'sales@dhionix.com'
}
```

### Example (with fake IDs):
```typescript
export const emailConfig = {
  serviceId: 'service_dhx8k2m',      // Your actual service ID
  templateId: 'template_9j5n3p1',    // Your actual template ID
  publicKey: 'xB8_vQ2nK9mL7R3',      // Your actual public key
  recipientEmail: 'sales@dhionix.com'
}
```

## Step 6: Test the Configuration

1. Save all files
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to your website contact form
4. Fill out and submit a test inquiry
5. Check your sales@dhionix.com inbox for the email

## Step 7: Verify Email Reception

### Successful Setup Indicators:
- ✅ Form shows "Thank you for your inquiry!" message
- ✅ Email arrives in sales@dhionix.com inbox within 1-2 minutes
- ✅ Email contains all form data (name, email, company, message)
- ✅ Reply-to address is set to customer's email

### If Still Not Working:
1. Check browser console for error messages
2. Verify all EmailJS credentials are correct
3. Ensure sales@dhionix.com email account exists and is accessible
4. Check spam/junk folder
5. Try sending a test email directly from EmailJS dashboard

## Security Notes

- ✅ EmailJS public key is safe to expose (it's meant to be public)
- ✅ No server required - works from browser
- ✅ Free tier allows 200 emails/month
- ✅ Customer emails go directly to sales@dhionix.com

## Alternative: Manual Email Client Fallback

If EmailJS fails, the form will automatically:
1. Open user's email client (Gmail, Outlook, etc.)
2. Pre-fill email to sales@dhionix.com
3. Include all form data in email body
4. User just needs to click "Send"

## Troubleshooting Common Issues

### "EmailJS not configured" Error
- Check that you've replaced ALL placeholder values in email.ts
- Make sure no values contain 'dhionix' or 'YOUR_' prefixes

### Emails Not Arriving
- Check spam/junk folder
- Verify sales@dhionix.com exists and can receive emails
- Test sending email manually to sales@dhionix.com
- Check EmailJS dashboard for delivery logs

### Form Shows Success But No Email
- EmailJS credentials are wrong
- Check browser console for errors
- Verify email template variables match exactly

### "Service Not Found" Error
- Service ID is incorrect
- Email service not properly connected in EmailJS dashboard

## Get Help

If you're still having issues:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. EmailJS support: help@emailjs.com
3. Include your service/template IDs (but NOT your public key)

## Current Status

❌ **NOT CONFIGURED** - Emails are NOT being received
✅ **Form Working** - Contact form displays and submits
✅ **Fallback Active** - mailto link opens if EmailJS fails

**NEXT STEP**: Complete EmailJS setup above to start receiving emails at sales@dhionix.com