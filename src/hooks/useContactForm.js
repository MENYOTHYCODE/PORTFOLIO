// Custom hook for contact form state management
import { useState, useCallback } from 'react';
import {
  validateField,
  validateForm,
  isFormValid,
  createInitialFormState,
  createInitialErrorsState,
  createInitialTouchedState,
  debounce
} from '../utils/contactFormUtils.js';

/**
 * Custom hook for managing contact form state and validation
 * @returns {Object} - Form state and handlers
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState(createInitialFormState);
  const [errors, setErrors] = useState(createInitialErrorsState);
  const [touchedFields, setTouchedFields] = useState(createInitialTouchedState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounced validation function
  const debouncedValidation = useCallback((fieldName, value) => {
    const debouncedFn = debounce((name, val) => {
      const error = validateField(name, val);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }, 300);
    debouncedFn(fieldName, value);
  }, []);

  /**
   * Handle field value changes
   * @param {string} fieldName - Name of the field
   * @param {string} value - New field value
   */
  const handleFieldChange = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Trigger debounced validation if field has been touched
    if (touchedFields[fieldName]) {
      debouncedValidation(fieldName, value);
    }
  }, [touchedFields, debouncedValidation]);

  /**
   * Handle field blur events
   * @param {string} fieldName - Name of the field that lost focus
   */
  const handleFieldBlur = useCallback((fieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Validate field immediately on blur
    const error = validateField(fieldName, formData[fieldName]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, [formData]);

  /**
   * Validate entire form
   * @returns {boolean} - True if form is valid
   */
  const validateEntireForm = useCallback(() => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouchedFields(allTouched);

    return isFormValid(formErrors);
  }, [formData]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(createInitialFormState());
    setErrors(createInitialErrorsState());
    setTouchedFields(createInitialTouchedState());
    setIsSubmitting(false);
  }, []);

  /**
   * Get error for a specific field (only if touched)
   * @param {string} fieldName - Name of the field
   * @returns {string|undefined} - Error message or undefined
   */
  const getFieldError = useCallback((fieldName) => {
    return touchedFields[fieldName] ? errors[fieldName] : undefined;
  }, [errors, touchedFields]);

  /**
   * Check if form can be submitted
   * @returns {boolean} - True if form can be submitted
   */
  const canSubmit = useCallback(() => {
    return !isSubmitting && isFormValid(errors) && Object.keys(touchedFields).length > 0;
  }, [isSubmitting, errors, touchedFields]);

  return {
    formData,
    errors,
    touchedFields,
    isSubmitting,
    setIsSubmitting,
    handleFieldChange,
    handleFieldBlur,
    validateEntireForm,
    resetForm,
    getFieldError,
    canSubmit
  };
};