// Contact form validation utilities and data sanitization

/**
 * Validation rules for contact form fields
 */
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    errorMessages: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name must be less than 50 characters',
      pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 100,
    errorMessages: {
      required: 'Email is required',
      pattern: 'Please enter a valid email address',
      maxLength: 'Email must be less than 100 characters'
    }
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100,
    errorMessages: {
      required: 'Subject is required',
      minLength: 'Subject must be at least 5 characters',
      maxLength: 'Subject must be less than 100 characters'
    }
  },
  message: {
    required: true,
    minLength: 20,
    maxLength: 1000,
    errorMessages: {
      required: 'Message is required',
      minLength: 'Message must be at least 20 characters',
      maxLength: 'Message must be less than 1000 characters'
    }
  },
  company: {
    required: false,
    maxLength: 100,
    errorMessages: {
      maxLength: 'Company name must be less than 100 characters'
    }
  }
};

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove on* event handlers
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Limit length as additional safety
    .substring(0, 2000);
};

/**
 * Validate a single form field
 * @param {string} fieldName - The name of the field to validate
 * @param {string} value - The value to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (fieldName, value) => {
  const rules = VALIDATION_RULES[fieldName];
  if (!rules) return null;

  const sanitizedValue = sanitizeInput(value);

  // Required field validation
  if (rules.required && (!sanitizedValue || sanitizedValue.length === 0)) {
    return rules.errorMessages.required;
  }

  // Skip other validations if field is not required and empty
  if (!rules.required && (!sanitizedValue || sanitizedValue.length === 0)) {
    return null;
  }

  // Minimum length validation
  if (rules.minLength && sanitizedValue.length < rules.minLength) {
    return rules.errorMessages.minLength;
  }

  // Maximum length validation
  if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
    return rules.errorMessages.maxLength;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
    return rules.errorMessages.pattern;
  }

  return null;
};

/**
 * Validate entire form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const validateForm = (formData) => {
  const errors = {};
  
  Object.keys(VALIDATION_RULES).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName] || '');
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

/**
 * Check if form has any validation errors
 * @param {Object} errors - The errors object from validateForm
 * @returns {boolean} - True if form is valid (no errors)
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

/**
 * Sanitize entire form data object
 * @param {Object} formData - The form data to sanitize
 * @returns {Object} - Sanitized form data
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  Object.keys(formData).forEach(key => {
    sanitized[key] = sanitizeInput(formData[key]);
  });

  return sanitized;
};

/**
 * Create initial form state
 * @returns {Object} - Initial form data object
 */
export const createInitialFormState = () => ({
  name: '',
  email: '',
  subject: '',
  message: '',
  company: ''
});

/**
 * Create initial errors state
 * @returns {Object} - Initial errors object
 */
export const createInitialErrorsState = () => ({});

/**
 * Create initial touched fields state
 * @returns {Object} - Initial touched fields object
 */
export const createInitialTouchedState = () => ({});

/**
 * Debounce function for validation
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Format form data for email template
 * @param {Object} formData - The form data to format
 * @returns {Object} - Formatted data for email service
 */
export const formatEmailData = (formData) => {
  const sanitized = sanitizeFormData(formData);
  
  return {
    from_name: sanitized.name,
    from_email: sanitized.email,
    subject: sanitized.subject,
    message: sanitized.message,
    company: sanitized.company || 'Not specified',
    to_email: 'your-email@example.com', // Replace with your actual email
    reply_to: sanitized.email
  };
};