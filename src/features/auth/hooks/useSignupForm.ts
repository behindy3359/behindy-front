import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';
import { apiErrorHandler } from '@/shared/utils/common/api';
import { validateSignupForm } from '../utils/formValidation';
import type { 
  SignupFormData, 
  SignupFormErrors, 
  FormValidationResult 
} from '../types/types';

const initialFormData: SignupFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  agreeToPrivacy: false,
  marketingOptIn: false,
};

export function useSignupForm() {
  const router = useRouter();
  const { signup } = useAuthStore();
  
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<string>('');

  const handleInputChange = useCallback((
    field: keyof SignupFormData, 
    value: string | boolean
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleFieldBlur = useCallback((field: keyof SignupFormData) => {
    const validation = validateSignupForm.field(field, formData[field], formData);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.message }));
    }
  }, [formData]);

  const validateForm = useCallback((): FormValidationResult => {
    const validation = validateSignupForm.all(formData);
    setErrors(validation.errors);
    return validation;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const result = await signup({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (result.success) {
        setSubmitSuccess('회원가입이 완료되었습니다!');
        
        setTimeout(() => {
          router.push('/auth/login?message=signup_success');
        }, 2000);
      } else {
        setSubmitError(result.error || '회원가입에 실패했습니다.');
      }
    } catch (error: unknown) {
      const errorInfo = apiErrorHandler.parseError(error);
      setSubmitError(errorInfo.message);
      
      if (errorInfo.code === '409' && errorInfo.details?.field === 'email') {
        setErrors(prev => ({
          ...prev,
          email: '이미 사용 중인 이메일입니다.',
        }));
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, signup, router, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitError('');
    setSubmitSuccess('');
  }, []);

  const navigateToLogin = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword &&
    formData.agreeToTerms === true;

  return {
    formData,
    errors,
    isLoading,
    submitError,
    submitSuccess,
    isFormValid,
    
    handleInputChange,
    handleFieldBlur,
    handleSubmit,
    resetForm,
    navigateToLogin,
    validateForm,
  };
}