import { validators } from '@/shared/utils/common/validation';
import type { PasswordStrength } from '../types/types';
import { colors } from '@/shared/styles/tokens/colors';

export const passwordUtils = {
  calculateStrength: (password: string): PasswordStrength => {
    const validation = validators.password(password);

    const requirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    return {
      score: validation.score,
      level: validation.strength,
      requirements,
      messages: validation.messages,
    };
  },

  getStrengthColor: (level: PasswordStrength['level']): string => {
    switch (level) {
      case 'very-weak':
      case 'weak':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'strong':
      case 'very-strong':
        return colors.success;
      default:
        return colors.text.light.tertiary;
    }
  },

  getStrengthText: (level: PasswordStrength['level']): string => {
    switch (level) {
      case 'very-weak':
        return '매우 약함';
      case 'weak':
        return '약함';
      case 'medium':
        return '보통';
      case 'strong':
        return '강함';
      case 'very-strong':
        return '매우 강함';
      default:
        return '알 수 없음';
    }
  },

  getStrengthPercentage: (score: number): number => {
    return Math.min((score / 5) * 100, 100);
  },

  getSecurityScore: (password: string): number => {
    const validation = validators.password(password);
    return Math.min((validation.score / 5) * 100, 100);
  },

  isCommonPassword: (password: string): boolean => {
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', '12345678', '111111', '123123', 'admin',
      'letmein', 'welcome', 'monkey', '1234567890'
    ];
    
    return commonPasswords.includes(password.toLowerCase());
  },

  generateHints: (password: string): string[] => {
    const hints: string[] = [];
    const strength = passwordUtils.calculateStrength(password);
    
    if (passwordUtils.isCommonPassword(password)) {
      hints.push('일반적으로 사용되는 비밀번호입니다. 더 복잡한 비밀번호를 사용해주세요.');
    }

    if (password.length < 12) {
      hints.push('12자 이상의 비밀번호를 사용하면 더욱 안전합니다.');
    }

    if (!/[가-힣]/.test(password) && strength.score >= 4) {
      hints.push('훌륭한 비밀번호입니다!');
    }
    
    return hints;
  },
};