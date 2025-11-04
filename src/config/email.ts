// EmailJS Configuration
// IMPORTANT: To receive emails, you MUST set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a FREE account
// 2. Add a new service (Gmail recommended):
//    - Choose Gmail
//    - Connect your sales@dhionix.com Gmail account
//    - Note the Service ID (e.g., 'service_xyz123')
// 3. Create an email template:
//    - Template Name: 'Dhionix Contact Form'
//    - Subject: 'New Project Inquiry from {{from_name}}'
//    - Content: Use the template below
//    - Note the Template ID (e.g., 'template_abc123')
// 4. Get your Public Key from Account > API Keys
// 5. Replace the values below with your actual IDs

export const emailConfig = {
  // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS:
  serviceId: 'service_dhionix_001', // Your EmailJS service ID from step 2
  templateId: 'template_dhionix_contact', // Your EmailJS template ID from step 3
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY_HERE', // Your EmailJS public key from step 4
  
  // EMAIL TEMPLATE FOR EMAILJS (Copy this to your EmailJS template):
  // Subject: New Project Inquiry from {{from_name}}
  //
  // Hello Dhionix Team,
  //
  // You have received a new project inquiry through your website.
  //
  // Customer Details:
  // Name: {{from_name}}
  // Email: {{from_email}}
  // Company: {{company}}
  //
  // Project Details:
  // {{message}}
  //
  // ---
  // Reply directly to this email to respond to the customer.
  // Customer email: {{reply_to}}
  // Sent to: {{to_email}}
  
  // Default recipient (your email)
  recipientEmail: 'sales@dhionix.com'
}

// Template example for EmailJS:
/*
Subject: New Project Inquiry from {{from_name}}

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
Reply to: {{reply_to}}
*/