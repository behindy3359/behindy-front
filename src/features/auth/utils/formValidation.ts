import { validators } from '@/shared/utils/common/validation';
import type { 
  SignupFormData, 
  SignupFormErrors, 
  FormValidationResult 
} from '../types/types';

interface FieldValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateSignupForm = {
  field: (
    field: keyof SignupFormData, 
    value: string | boolean, 
    formData: SignupFormData
  ): FieldValidationResult => {
    switch (field) {
      case 'name':
        return validators.name(value as string);
        
      case 'email':
        return validators.email(value as string);
        
      case 'password':
        const passwordResult = validators.password(value as string);
        return {
          isValid: passwordResult.isValid,
          message: passwordResult.isValid ? undefined : passwordResult.messages[0],
        };
        
      case 'confirmPassword':
        return validators.passwordConfirm(formData.password, value as string);
        
      case 'agreeToTerms':
        return {
          isValid: value === true,
          message: value ? undefined : '이용약관에 동의해주세요.',
        };
        
      case 'agreeToPrivacy':
        return { isValid: true };
        
      case 'marketingOptIn':
        return { isValid: true };
        
      default:
        return { isValid: true };
    }
  },

  all: (formData: SignupFormData): FormValidationResult => {
    const errors: SignupFormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof SignupFormData>).forEach(field => {
      const validation = validateSignupForm.field(field, formData[field], formData);
      if (!validation.isValid) {
        errors[field] = validation.message;
        isValid = false;
      }
    });

    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        isValid = false;
      }
    }

    return { isValid, errors };
  },

  required: (formData: SignupFormData): boolean => {
    return !!(
      formData.name.trim() &&
      formData.email.trim() &&
      formData.password &&
      formData.confirmPassword &&
      formData.agreeToTerms
    );
  },

  realtime: (
    field: keyof SignupFormData,
    value: string | boolean,
    formData: SignupFormData
  ): FieldValidationResult => {
    switch (field) {
      case 'name':
        if (!value || (value as string).trim() === '') {
          return { isValid: true };
        }
        return validateSignupForm.field(field, value, formData);
        
      case 'email':
        if (!value || (value as string).trim() === '') {
          return { isValid: true };
        }
        return validateSignupForm.field(field, value, formData);
        
      case 'password':
        if (!value || (value as string).length === 0) {
          return { isValid: true };
        }
        return validateSignupForm.field(field, value, formData);
        
      default:
        return validateSignupForm.field(field, value, formData);
    }
  },
};