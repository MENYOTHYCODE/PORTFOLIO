import { useState, useId } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

/**
 * Reusable form field component with validation and accessibility
 * @param {Object} props - Component props
 * @param {string} props.name - Field name
 * @param {string} props.label - Field label
 * @param {string} props.type - Field type (text, email, textarea)
 * @param {string} props.value - Field value
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.error - Error message
 * @param {number} props.rows - Number of rows for textarea
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onBlur - Blur handler
 * @param {boolean} props.disabled - Whether field is disabled
 * @returns {JSX.Element} FormField component
 */
function FormField({
  name,
  label,
  type = 'text',
  value = '',
  placeholder = '',
  required = false,
  error,
  rows = 4,
  onChange,
  onBlur,
  disabled = false
}) {
  const [isFocused, setIsFocused] = useState(false);
  const fieldId = useId();
  const errorId = useId();
  const descriptionId = useId();

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const hasError = Boolean(error);
  const hasValue = Boolean(value);

  // Base input classes
  const inputBaseClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    bg-[#1E293B]/60 backdrop-blur-xl text-white placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-cyan-500/50
    disabled:opacity-50 disabled:cursor-not-allowed
    ${hasError 
      ? 'border-red-500/60 focus:border-red-500' 
      : isFocused 
        ? 'border-cyan-500/60' 
        : 'border-gray-600/40 hover:border-gray-500/60'
    }
  `.trim().replace(/\s+/g, ' ');

  // Label classes with floating animation
  const labelClasses = `
    absolute left-4 transition-all duration-200 pointer-events-none
    ${isFocused || hasValue
      ? 'top-2 text-xs text-cyan-400 font-medium'
      : 'top-3 text-base text-gray-400'
    }
    ${hasError && (isFocused || hasValue) ? 'text-red-400' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Field Container */}
      <div className="relative">
        {/* Input/Textarea */}
        {type === 'textarea' ? (
          <textarea
            id={fieldId}
            name={name}
            value={value}
            placeholder={isFocused ? placeholder : ''}
            rows={rows}
            required={required}
            disabled={disabled}
            className={`${inputBaseClasses} resize-none min-h-[120px]`}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-describedby={`${descriptionId} ${hasError ? errorId : ''}`}
            aria-invalid={hasError}
            aria-required={required}
          />
        ) : (
          <input
            id={fieldId}
            name={name}
            type={type}
            value={value}
            placeholder={isFocused ? placeholder : ''}
            required={required}
            disabled={disabled}
            className={inputBaseClasses}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-describedby={`${descriptionId} ${hasError ? errorId : ''}`}
            aria-invalid={hasError}
            aria-required={required}
          />
        )}

        {/* Floating Label */}
        <label
          htmlFor={fieldId}
          className={labelClasses}
        >
          {label}
          {required && (
            <span className="text-red-400 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>

        {/* Focus Ring Effect */}
        {isFocused && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 rounded-lg border-2 border-cyan-400/30 pointer-events-none"
          />
        )}
      </div>

      {/* Helper Text */}
      <div id={descriptionId} className="mt-1 min-h-[1.25rem]">
        {hasError ? (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        ) : (
          <div className="text-sm text-gray-500" aria-hidden="true">
            {/* Placeholder for consistent spacing */}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default FormField;