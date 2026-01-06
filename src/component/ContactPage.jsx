import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import ContactForm from './ContactForm';
import ContactMethods from './ContactMethods';
import ContactInfo from './ContactInfo';
import { SuccessModal, ErrorMessage, LoadingIndicator } from './ContactFeedback';
import { sendContactEmail, getFallbackContactInfo } from '../services/emailService';

/**
 * Main contact page component
 * @returns {JSX.Element} ContactPage component
 */
function ContactPage() {
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [fallbackInfo, setFallbackInfo] = useState(null);

  // Set page meta tags on mount
  useEffect(() => {
    document.title = 'Contact | MENYO Portfolio';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with MENYO. Send a message for project inquiries, collaborations, or just to say hello.');
    }
  }, []);

  /**
   * Handle form submission
   * @param {Object} formData - The form data to submit
   */
  const handleFormSubmit = async (formData) => {
    setSubmissionStatus('loading');
    setErrorMessage(null);
    setFallbackInfo(null);

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmissionStatus('success');
        setShowSuccessModal(true);
      } else {
        setSubmissionStatus('error');
        setErrorMessage(result.message);
        setFallbackInfo(getFallbackContactInfo());
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmissionStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again or use the alternative contact methods below.');
      setFallbackInfo(getFallbackContactInfo());
    }
  };

  /**
   * Handle retry submission
   */
  const handleRetry = () => {
    setSubmissionStatus('idle');
    setErrorMessage(null);
    setFallbackInfo(null);
  };

  /**
   * Handle error dismissal
   */
  const handleErrorDismiss = () => {
    setSubmissionStatus('idle');
    setErrorMessage(null);
    setFallbackInfo(null);
  };

  /**
   * Handle success modal close
   */
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setSubmissionStatus('idle');
  };

  const isSubmitting = submissionStatus === 'loading';

  return (
    <div className="min-h-screen bg-[#0F172A] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Let's Work Together
          </h1>
          <div className="w-20 h-1.5 bg-cyan-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Want to collaborate? Or just want to say hello? 
            I'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Loading Indicator */}
            {isSubmitting && (
              <LoadingIndicator message="Sending your message..." />
            )}

            {/* Error Message */}
            {submissionStatus === 'error' && errorMessage && (
              <ErrorMessage
                message={errorMessage}
                onRetry={handleRetry}
                onDismiss={handleErrorDismiss}
                fallbackInfo={fallbackInfo}
              />
            )}

            {/* Contact Form */}
            <ContactForm
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <ContactInfo />
            <ContactMethods />
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              What happens next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 
                                flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-white mb-2">I receive your message</h3>
                <p className="text-gray-400 text-sm">
                  Your message lands directly in my inbox, and I get notified immediately.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 
                                flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-white mb-2">I review and respond</h3>
                <p className="text-gray-400 text-sm">
                  I carefully read your message and craft a thoughtful response within 24 hours.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 
                                flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-white mb-2">We start the conversation</h3>
                <p className="text-gray-400 text-sm">
                  We discuss your project, ideas, or opportunities and explore how we can work together.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleSuccessClose}
        />
      </div>
    </div>
  );
}

export default ContactPage;