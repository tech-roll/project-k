// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your public key from Account settings
// 6. Update the values below

export const emailConfig = {
  serviceId: 'service_dhionix', // Replace with your EmailJS service ID
  templateId: 'template_contact', // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  
  // Email template should include these variables:
  // {{from_name}} - Customer's name
  // {{from_email}} - Customer's email
  // {{company}} - Customer's company
  // {{message}} - Customer's message
  // {{to_email}} - Your email (sales@dhionix.com)
  // {{reply_to}} - Customer's email for replies
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