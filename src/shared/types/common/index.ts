export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorInfo {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ModalState {
  isOpen: boolean;
  type: 'info' | 'confirm' | 'error' | 'success';
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ToastState {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
  isVisible: boolean;
}

export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isValid: boolean;
  isSubmitting: boolean;
}