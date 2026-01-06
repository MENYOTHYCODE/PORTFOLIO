// Email service integration using EmailJS
import emailjs from '@emailjs/browser';
import { formatEmailData } from '../utils/contactFormUtils.js';

// EmailJS configuration - Replace with your actual values
const EMAIL_CONFIG = {
  serviceId: 'your_service_id', // Replace with your EmailJS service ID
  templateId: 'your_template_id', // Replace with your EmailJS template ID
  publicKey: 'your_public_key' // Replace with your EmailJS public key
};

/**
 * Initialize EmailJS with public key
 */
export const initializeEmailService = () => {
  try {
    emailjs.init(EMAIL_CONFIG.publicKey);
    return true;
  } catch (error) {
    console.error('Failed to initialize email service:', error);
    return false;
  }
};

/**
 * Send contact form email
 * @param {Object} formData - The form data to send
 * @returns {Promise<Object>} - Promise resolving to success/error result
 */
export const sendContactEmail = async (formData) => {
  try {
    // Format data for email template
    const emailData = formatEmailData(formData);
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      emailData
    );

    // Log successful submission (without sensitive data)
    logSubmission({
      status: 'success',
      timestamp: new Date().toISOString(),
      responseStatus: response.status,
      hasName: !!formData.name,
      hasEmail: !!formData.email,
      hasSubject: !!formData.subject,
      messageLength: formData.message?.length || 0
    });

    return {
      success: true,
      message: 'Message sent successfully!',
      data: response
    };

  } catch (error) {
    // Log failed submission
    logSubmission({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message,
      errorCode: error.status || 'unknown'
    });

    return {
      success: false,
      message: getErrorMessage(error),
      error: error
    };
  }
};

/**
 * Get user-friendly error message based on error type
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
const getErrorMessage = (error) => {
  if (!navigator.onLine) {
    return 'Please check your internet connection and try again.';
  }

  switch (error.status) {
    case 400:
      return 'There was an issue with your message. Please check all fields and try again.';
    case 401:
      return 'Authentication failed. Please try again later.';
    case 403:
      return 'Service temporarily unavailable. Please try again later.';
    case 429:
      return 'Too many requests. Please wait a moment before trying again.';
    case 500:
    case 502:
    case 503:
      return 'Server error. Please try again later.';
    default:
      return 'Failed to send message. Please try again or use alternative contact methods below.';
  }
};

/**
 * Log form submission attempts for monitoring
 * @param {Object} logData - Data to log
 */
const logSubmission = (logData) => {
  try {
    // In a real application, you might send this to an analytics service
    // For now, we'll just log to console in development
    if (import.meta.env.DEV) {
      console.log('Contact form submission:', logData);
    }

    // Store in localStorage for basic tracking (optional)
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push(logData);
    
    // Keep only last 10 submissions to avoid storage bloat
    if (submissions.length > 10) {
      submissions.splice(0, submissions.length - 10);
    }
    
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
  } catch (error) {
    console.error('Failed to log submission:', error);
  }
};

/**
 * Test email service connection
 * @returns {Promise<boolean>} - Promise resolving to connection status
 */
export const testEmailService = async () => {
  try {
    // This is a simple test - in a real scenario you might have a test endpoint
    return EMAIL_CONFIG.serviceId && EMAIL_CONFIG.templateId && EMAIL_CONFIG.publicKey;
  } catch (error) {
    console.error('Email service test failed:', error);
    return false;
  }
};

/**
 * Get fallback contact information when email service fails
 * @returns {Object} - Fallback contact methods
 */
export const getFallbackContactInfo = () => ({
  email: 'your-email@example.com', // Replace with your actual email
  message: 'Email service is temporarily unavailable. Please contact me directly using the information below:',
  alternatives: [
    {
      method: 'Email',
      value: 'your-email@example.com',
      link: 'mailto:your-email@example.com'
    },
    {
      method: 'WhatsApp',
      value: '+1 (555) 123-4567',
      link: 'https://wa.me/15551234567?text=Hello%20MENYO,%20I%20would%20like%20to%20get%20in%20touch%20with%20you.'
    },
    {
      method: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile'
    },
    {
      method: 'GitHub',
      value: 'github.com/yourusername',
      link: 'https://github.com/yourusername'
    }
  ]
});

// Initialize email service when module loads
initializeEmailService();