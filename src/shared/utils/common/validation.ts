export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface PasswordStrengthResult extends ValidationResult {
  score: number;
  messages: string[];
  strength: 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';
}

export const validators = {
  email: (email: string): ValidationResult => {
    if (!email || email.trim() === '') {
      return { isValid: false, message: '이메일을 입력해주세요.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = email.toLowerCase().trim();
    
    if (!emailRegex.test(normalizedEmail)) {
      return { isValid: false, message: '올바른 이메일 형식이 아닙니다.' };
    }

    if (/[가-힣]/.test(normalizedEmail)) {
      return { isValid: false, message: '이메일에는 한글을 사용할 수 없습니다.' };
    }

    return { isValid: true };
  },

  password: (password: string): PasswordStrengthResult => {
    const messages: string[] = [];
    let score = 0;

    if (!password) {
      return {
        isValid: false,
        score: 0,
        messages: ['비밀번호를 입력해주세요.'],
        strength: 'very-weak'
      };
    }

    if (password.length >= 8) {
      score += 1;
    } else {
      messages.push('8자 이상이어야 합니다.');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      messages.push('소문자를 포함해야 합니다.');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      messages.push('대문자를 포함해야 합니다.');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      messages.push('숫자를 포함해야 합니다.');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      messages.push('특수문자를 포함해야 합니다.');
    }

    let strength: PasswordStrengthResult['strength'];
    if (score <= 2) strength = 'very-weak';
    else if (score <= 3) strength = 'weak';
    else if (score <= 4) strength = 'medium';
    else strength = 'strong';

    return {
      isValid: score >= 4,
      score,
      messages,
      strength
    };
  },

  name: (name: string): ValidationResult => {
    if (!name || name.trim() === '') {
      return { isValid: false, message: '이름을 입력해주세요.' };
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      return { isValid: false, message: '이름은 2자 이상이어야 합니다.' };
    }

    if (trimmedName.length > 50) {
      return { isValid: false, message: '이름은 50자 이하여야 합니다.' };
    }

    if (!/^[가-힣a-zA-Z\s]+$/.test(trimmedName)) {
      return { isValid: false, message: '이름에는 한글, 영문, 공백만 사용 가능합니다.' };
    }

    return { isValid: true };
  },

  passwordConfirm: (password: string, confirmPassword: string): ValidationResult => {
    if (!confirmPassword) {
      return { isValid: false, message: '비밀번호 확인을 입력해주세요.' };
    }

    if (password !== confirmPassword) {
      return { isValid: false, message: '비밀번호가 일치하지 않습니다.' };
    }

    return { isValid: true };
  },

  postTitle: (title: string): ValidationResult => {
    if (!title || title.trim() === '') {
      return { isValid: false, message: '제목을 입력해주세요.' };
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length < 2) {
      return { isValid: false, message: '제목은 2자 이상이어야 합니다.' };
    }

    if (trimmedTitle.length > 100) {
      return { isValid: false, message: '제목은 100자 이하여야 합니다.' };
    }

    return { isValid: true };
  },

  postContent: (content: string): ValidationResult => {
    if (!content || content.trim() === '') {
      return { isValid: false, message: '내용을 입력해주세요.' };
    }

    const trimmedContent = content.trim();

    if (trimmedContent.length < 10) {
      return { isValid: false, message: '내용은 10자 이상이어야 합니다.' };
    }

    if (trimmedContent.length > 5000) {
      return { isValid: false, message: '내용은 5000자 이하여야 합니다.' };
    }

    return { isValid: true };
  },

  commentContent: (content: string): ValidationResult => {
    if (!content || content.trim() === '') {
      return { isValid: false, message: '댓글 내용을 입력해주세요.' };
    }

    const trimmedContent = content.trim();

    if (trimmedContent.length < 2) {
      return { isValid: false, message: '댓글은 2자 이상이어야 합니다.' };
    }

    if (trimmedContent.length > 1000) {
      return { isValid: false, message: '댓글은 1000자 이하여야 합니다.' };
    }

    return { isValid: true };
  },
};