# Contact Form Setup Instructions

## EmailJS Configuration

To make the contact form functional, you need to set up EmailJS:

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Company: {{company}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key**

### 5. Update Configuration Files

#### Update `src/services/emailService.js`:
```javascript
const EMAIL_CONFIG = {
  serviceId: 'your_actual_service_id', // Replace with your Service ID
  templateId: 'your_actual_template_id', // Replace with your Template ID
  publicKey: 'your_actual_public_key' // Replace with your Public Key
};
```

#### Update `src/types/contactTypes.js`:
Replace the placeholder contact information with your actual details:

```javascript
export const CONTACT_METHODS = [
  {
    name: 'email',
    label: 'Email',
    value: 'your-actual-email@example.com', // Your real email
    link: 'mailto:your-actual-email@example.com',
    icon: 'Mail',
    external: false
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    value: '+1 (555) 123-4567', // Your WhatsApp number with country code
    link: 'https://wa.me/15551234567?text=Hello%20MENYO,%20I%20would%20like%20to%20get%20in%20touch%20with%20you.',
    icon: 'MessageCircle',
    external: true
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/your-actual-profile', // Your LinkedIn
    link: 'https://linkedin.com/in/your-actual-profile',
    icon: 'Linkedin',
    external: true
  },
  // ... update other contact methods
];

export const CONTACT_INFO = {
  location: 'Your Actual City, Country',
  timezone: 'Your Timezone (e.g., UTC+1)',
  availability: 'Your availability status',
  responseTime: 'Your typical response time',
  languages: ['Your', 'Languages']
};
```

### WhatsApp Configuration Notes:
- Replace `15551234567` with your actual WhatsApp number (include country code, no + or spaces)
- The WhatsApp link format is: `https://wa.me/[country_code][phone_number]?text=[pre-filled_message]`
- Example: For US number +1 (555) 123-4567, use `15551234567`
- The pre-filled message is URL encoded (spaces become %20)
- WhatsApp will have a distinctive green color scheme in the contact methods

### 6. Test the Contact Form
1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check your email for the message
5. Verify the success/error handling works correctly

## Security Notes
- Never commit your actual EmailJS credentials to version control
- Consider using environment variables for production
- The current setup includes input sanitization and basic security measures
- Rate limiting is implemented client-side but consider server-side limits for production

## Troubleshooting
- If emails aren't sending, check your EmailJS dashboard for error logs
- Verify your email service is properly connected
- Make sure your template variable names match the ones in the code
- Check browser console for any JavaScript errors

The contact form is now fully functional and ready to receive messages!