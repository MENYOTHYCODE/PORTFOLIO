// Contact form data types and interfaces

/**
 * Contact form data structure
 * @typedef {Object} ContactFormData
 * @property {string} name - Sender's full name
 * @property {string} email - Sender's email address
 * @property {string} subject - Message subject
 * @property {string} message - Message content
 * @property {string} company - Sender's company (optional)
 */

/**
 * Form field configuration
 * @typedef {Object} FormFieldConfig
 * @property {string} name - Field name
 * @property {string} label - Field label
 * @property {string} type - Field type (text, email, textarea)
 * @property {string} placeholder - Placeholder text
 * @property {boolean} required - Whether field is required
 * @property {number} rows - Number of rows for textarea
 */

/**
 * Contact method configuration
 * @typedef {Object} ContactMethod
 * @property {string} name - Method name
 * @property {string} label - Display label
 * @property {string} value - Contact value
 * @property {string} link - Contact link
 * @property {string} icon - Icon name
 * @property {boolean} external - Whether link opens in new tab
 */

/**
 * Email service response
 * @typedef {Object} EmailServiceResponse
 * @property {boolean} success - Whether email was sent successfully
 * @property {string} message - Response message
 * @property {Object} [data] - Response data (if successful)
 * @property {Error} [error] - Error object (if failed)
 */

/**
 * Form submission status
 * @typedef {'idle'|'loading'|'success'|'error'} SubmissionStatus
 */

/**
 * Contact form field names
 */
export const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  SUBJECT: 'subject',
  MESSAGE: 'message',
  COMPANY: 'company'
};

/**
 * Contact form field configurations
 */
export const FIELD_CONFIGS = [
  {
    name: FORM_FIELDS.NAME,
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true
  },
  {
    name: FORM_FIELDS.EMAIL,
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true
  },
  {
    name: FORM_FIELDS.COMPANY,
    label: 'Company',
    type: 'text',
    placeholder: 'Enter your company name (optional)',
    required: false
  },
  {
    name: FORM_FIELDS.SUBJECT,
    label: 'Subject',
    type: 'text',
    placeholder: 'Enter message subject',
    required: true
  },
  {
    name: FORM_FIELDS.MESSAGE,
    label: 'Message',
    type: 'textarea',
    placeholder: 'Enter your message (minimum 20 characters)',
    required: true,
    rows: 6
  }
];

/**
 * Contact methods configuration
 */
export const CONTACT_METHODS = [
  {
    name: 'email',
    label: 'Email',
    value: 'menyothycode@gmail.com',
    link: 'mailto:your-email@example.com',
    icon: 'Mail',
    external: false
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    value: '+234 912 523 3701',
    link: 'https://wa.me/9125233701?text=Hello%20MENYO,%20I%20would%20like%20to%20get%20in%20touch%20with%20you.',
    icon: 'MessageCircle',
    external: true
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/menyothycode',
    link: 'https://linkedin.com/in/menyothycode',
    icon: 'Linkedin',
    external: true
  },
  {
    name: 'github',
    label: 'GitHub',
    value: 'github.com/menyothycode',
    link: 'https://github.com/menyothycode',
    icon: 'Github',
    external: true
  },
  {
    name: 'twitter',
    label: 'Twitter',
    value: '@menyothycode',
    link: 'https://twitter.com/menyothycode',
    icon: 'Twitter',
    external: true
  }
];

/**
 * Contact information
 */
export const CONTACT_INFO = {
  location: 'Lagos, Nigeria',
  timezone: 'UTC+01:00',
  availability: 'Available for new opportunities',
  responseTime: 'Usually responds within 24 hours',
  languages: ['English', 'Yoruba']
};