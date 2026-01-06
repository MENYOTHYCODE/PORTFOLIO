import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

/**
 * Success modal component for successful form submissions
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @returns {JSX.Element} SuccessModal component
 */
export function SuccessModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#1E293B] border border-cyan-900/40 rounded-2xl p-8 max-w-md w-full 
                            shadow-2xl shadow-cyan-500/10">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-700/50 
                           transition-colors duration-200 text-gray-400 hover:text-white"
                aria-label="Close success message"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Content */}
              <div className="text-center">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 
                             flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for reaching out. I've received your message and will 
                    get back to you as soon as possible, usually within 24 hours.
                  </p>
                </motion.div>

                {/* Action Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 
                             hover:from-cyan-700 hover:to-indigo-700 text-white font-semibold 
                             rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Continue Browsing
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Error message component for form submission failures
 * @param {Object} props - Component props
 * @param {string} props.message - Error message
 * @param {Function} props.onRetry - Retry handler
 * @param {Function} props.onDismiss - Dismiss handler
 * @param {Object} props.fallbackInfo - Fallback contact information
 * @returns {JSX.Element} ErrorMessage component
 */
export function ErrorMessage({ message, onRetry, onDismiss, fallbackInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 p-4 rounded-lg border border-red-500/50 bg-red-900/20"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {/* Error Icon */}
        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        
        {/* Error Content */}
        <div className="flex-1">
          <h4 className="font-semibold text-red-400 mb-1">
            Message Failed to Send
          </h4>
          <p className="text-red-300 text-sm mb-3">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onRetry}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm 
                         font-medium rounded transition-colors duration-200"
            >
              Try Again
            </button>
            <button
              onClick={onDismiss}
              className="px-3 py-1.5 border border-red-500/50 hover:border-red-500 
                         text-red-400 hover:text-red-300 text-sm font-medium rounded 
                         transition-colors duration-200"
            >
              Dismiss
            </button>
          </div>

          {/* Fallback Contact Info */}
          {fallbackInfo && (
            <div className="mt-4 pt-3 border-t border-red-500/30">
              <p className="text-red-300 text-sm mb-2">
                {fallbackInfo.message}
              </p>
              <div className="space-y-1">
                {fallbackInfo.alternatives.map((alt, index) => (
                  <a
                    key={index}
                    href={alt.link}
                    className="block text-sm text-red-400 hover:text-red-300 
                               underline transition-colors duration-200"
                    target={alt.link.startsWith('http') ? '_blank' : '_self'}
                    rel={alt.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {alt.method}: {alt.value}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className="p-1 rounded hover:bg-red-800/30 text-red-400 hover:text-red-300 
                     transition-colors duration-200"
          aria-label="Dismiss error message"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

/**
 * Loading indicator component for form submission
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message
 * @returns {JSX.Element} LoadingIndicator component
 */
export function LoadingIndicator({ message = "Sending your message..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-6 p-4 rounded-lg border border-cyan-500/50 bg-cyan-900/20"
    >
      <div className="flex items-center gap-3">
        {/* Loading Spinner */}
        <svg
          className="animate-spin h-5 w-5 text-cyan-400"
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
        
        {/* Loading Message */}
        <p className="text-cyan-300 font-medium">
          {message}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Info message component for general notifications
 * @param {Object} props - Component props
 * @param {string} props.message - Info message
 * @param {Function} props.onDismiss - Dismiss handler
 * @returns {JSX.Element} InfoMessage component
 */
export function InfoMessage({ message, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 p-4 rounded-lg border border-blue-500/50 bg-blue-900/20"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {/* Info Icon */}
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        
        {/* Info Content */}
        <div className="flex-1">
          <p className="text-blue-300 text-sm">
            {message}
          </p>
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 rounded hover:bg-blue-800/30 text-blue-400 hover:text-blue-300 
                       transition-colors duration-200"
            aria-label="Dismiss info message"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}