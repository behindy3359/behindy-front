import { validators } from '@/shared/utils/common/validation';
import type { LoginFormData, LoginFormErrors } from '../types/types';

interface FieldValidationResult {
  isValid: boolean;
  message?: string;
}

interface FormValidationResult {
  isValid: boolean;
  errors: LoginFormErrors;
}

export const validateLoginForm = {
  field: (
    field: keyof LoginFormData, 
    value: string | boolean
  ): FieldValidationResult => {
    switch (field) {
      case 'email':
        if (!value || (value as string).trim() === '') {
          return { isValid: false, message: '이메일을 입력해주세요.' };
        }
        return validators.email(value as string);
        
      case 'password':
        if (!value || (value as string).trim() === '') {
          return { isValid: false, message: '비밀번호를 입력해주세요.' };
        }
        return { isValid: true };

      default:
        return { isValid: true };
    }
  },

  all: (formData: LoginFormData): FormValidationResult => {
    const errors: LoginFormErrors = {};
    let isValid = true;

    const emailValidation = validateLoginForm.field('email', formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.message;
      isValid = false;
    }

    const passwordValidation = validateLoginForm.field('password', formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
      isValid = false;
    }

    return { isValid, errors };
  },

  required: (formData: LoginFormData): boolean => {
    return !!(formData.email.trim() && formData.password);
  },
};