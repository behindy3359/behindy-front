export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  isAuthenticated: boolean;
  role?: 'USER' | 'ADMIN';
  permissions?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface TokenInfo {
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string;
  expiresAt?: number;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
  details?: unknown;
}

export interface AuthState {
  status: AuthStatus;
  user: CurrentUser | null;
  tokens: TokenInfo;
  error: AuthError | null;
  isLoading: boolean;
  lastLoginAttempt?: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  marketingOptIn: boolean;
}

export interface SignupFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  agreeToPrivacy?: string;
  marketingOptIn?: string;
}

export interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export interface SignupFormFieldsProps {
  formData: SignupFormData;
  errors: SignupFormErrors;
  onChange: (field: keyof SignupFormData, value: string | boolean) => void;
  onBlur: (field: keyof SignupFormData) => void;
  disabled?: boolean;
}

export interface DemoLoginSectionProps {
  onDemoLogin: (email: string, password: string) => void;
  disabled?: boolean;
}

export interface PasswordStrength {
  score: number;
  level: 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';
  requirements: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
  messages: string[];
}

export interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export interface AgreementState {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export interface AgreementSectionProps {
  agreements: AgreementState;
  errors: Pick<SignupFormErrors, 'agreeToTerms' | 'agreeToPrivacy'>;
  onChange: (field: 'agreeToTerms' | 'agreeToPrivacy' | 'marketingOptIn', value: boolean) => void;
  disabled?: boolean;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: SignupFormErrors;
}