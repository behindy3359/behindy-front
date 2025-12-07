"use client";

import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button/Button';
import { useLoginForm } from '../../hooks/useLoginForm';
import { LoginFormFields } from './inner/LoginFormFields';
import {
  SignupPrompt
} from './styles';
import type { LoginFormProps } from '../../types/types';
import { BasicFullWidthContainer } from '@/shared/styles/components';
import {
  CommonAuthHeaderSection,
  CommonAuthPageTitle,
  CommonAuthPageSubtitle,
  CommonAuthDivider,
  CommonAuthErrorAlert,
  CommonAuthSuccessAlert
} from '@/shared/styles/commonAuthStyles';
import {
  CommonWrapper,
} from '@/shared/styles/components';

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess
}) => {
  const {
    formData,
    errors,
    isLoading,
    success,
    isFormValid,
    handleInputChange,
    handleFieldBlur,
    handleSubmit,
    handleDemoLogin,
    navigateToSignup,
    navigateToForgotPassword,
  } = useLoginForm();

  useEffect(() => {
    const handleForgotPasswordNavigation = () => {
      navigateToForgotPassword();
    };

    window.addEventListener('navigate-to-forgot-password', handleForgotPasswordNavigation);
    return () => {
      window.removeEventListener('navigate-to-forgot-password', handleForgotPasswordNavigation);
    };
  }, [navigateToForgotPassword]);

  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
    }
  }, [success, onSuccess]);

  return (
    <>
      <BasicFullWidthContainer>
        <CommonAuthHeaderSection>
          <CommonAuthPageTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            로그인
          </CommonAuthPageTitle>
          <CommonAuthPageSubtitle
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            계정에 로그인하여 게임을 계속하세요
          </CommonAuthPageSubtitle>
        </CommonAuthHeaderSection>

        <AnimatePresence>
          {errors.submit && (
            <CommonAuthErrorAlert
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle />
              <div className="content">
                <div className="title">로그인 실패</div>
                <div className="message">{errors.submit}</div>
              </div>
            </CommonAuthErrorAlert>
          )}

          {success && (
            <CommonAuthSuccessAlert
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle />
              <div className="content">
                <div className="title">로그인 성공!</div>
                <div className="message">{success}</div>
              </div>
            </CommonAuthSuccessAlert>
          )}
        </AnimatePresence>

        <CommonWrapper
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginFormFields
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            disabled={isLoading}
            showDemoLogin={true}
            onDemoLogin={handleDemoLogin}
          />

          <BasicFullWidthContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              disabled={!isFormValid || isLoading}
              leftIcon={<LogIn size={20} />}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </BasicFullWidthContainer>
        </CommonWrapper>

        <CommonAuthDivider
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span>또는</span>
        </CommonAuthDivider>

        <SignupPrompt
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <p>
            아직 계정이 없으신가요?{' '}
            <button
              type="button"
              onClick={navigateToSignup}
              disabled={isLoading}
            >
              회원가입
            </button>
          </p>
        </SignupPrompt>
      </BasicFullWidthContainer>
    </>
  );
};