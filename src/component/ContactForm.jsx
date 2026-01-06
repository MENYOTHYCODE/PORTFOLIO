import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import FormField from './FormField';
import { useContactForm } from '../hooks/useContactForm';
import { FIELD_CONFIGS } from '../types/contactTypes';

/**
 * Contact form component with validation and submission handling
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Form submission handler
 * @param {boolean} props.isSubmitting - Whether form is being submitted
 * @returns {JSX.Element} ContactForm component
 */
function ContactForm({ onSubmit, isSubmitting = false }) {
  const {
    formData,
    handleFieldChange,
    handleFieldBlur,
    validateEntireForm,
    resetForm,
    getFieldError,
    canSubmit,
    setIsSubmitting
  } = useContactForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate entire form before submission
    if (!validateEntireForm()) {
      return;
    }

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        resetForm(); // Reset form on successful submission
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormSubmittable = canSubmit() && !isSubmitting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-8"
    >
      {/* Form Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Send me a message
        </h2>
        <p className="text-gray-300">
          I'd love to hear from you. Send me a message and I'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Form Fields */}
        {FIELD_CONFIGS.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            name={fieldConfig.name}
            label={fieldConfig.label}
            type={fieldConfig.type}
            value={formData[fieldConfig.name] || ''}
            placeholder={fieldConfig.placeholder}
            required={fieldConfig.required}
            rows={fieldConfig.rows}
            error={getFieldError(fieldConfig.name)}
            disabled={isSubmitting}
            onChange={(value) => handleFieldChange(fieldConfig.name, value)}
            onBlur={() => handleFieldBlur(fieldConfig.name)}
          />
        ))}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-4"
        >
          <button
            type="submit"
            disabled={!isFormSubmittable}
            className={`
              w-full px-6 py-4 rounded-lg font-semibold text-white
              transition-all duration-200 flex items-center justify-center gap-3
              ${isFormSubmittable
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
              }
            `}
            aria-describedby="submit-button-description"
          >
            {isSubmitting ? (
              <>
                {/* Loading Spinner */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending Message...
              </>
            ) : (
              <>
                {/* Send Icon */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Message
              </>
            )}
          </button>
          
          {/* Submit Button Description */}
          <p
            id="submit-button-description"
            className="text-sm text-gray-400 mt-2 text-center"
          >
            {!isFormSubmittable && !isSubmitting
              ? 'Please fill in all required fields correctly'
              : 'Your message will be sent directly to my email'
            }
          </p>
        </motion.div>

        {/* Form Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-4 border-t border-gray-700/50"
        >
          <p className="text-sm text-gray-400 text-center">
            Your information is secure and will only be used to respond to your message.
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default ContactForm;