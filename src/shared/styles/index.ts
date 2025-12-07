export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/shadows';

export * from './themes';
import { getTheme } from './themes';

export * from './theme';

export type { Theme } from './styled';

export {
  PageContainer,
  BaseCard,
  SectionContainer,
  SectionHeader,
  GridContainer,
  FormContainer,
  FormSectionContainer,
  StateContainer,
  FullWidthContainer,
  CenteredContainer,
  FlexContainer,
  containerSizes,
  CardContainer,
  BasicFullWidthContainer,
  LoadingContainer,
  ErrorContainer,
  EmptyContainer,

  BaseForm,
  FormField,
  FormLabel,
  FormGroup,
  FormActions,
  FormError,
  FormSuccess,
  FormHelperText,
  FormSection,
  FormHeader,
  FormDivider,
  InlineForm,
  CompactForm,
  FormLoadingOverlay,

  BaseButton,
  ButtonGroup,
  IconButton,
  FloatingActionButton,
  LoadingButton,
  ToggleButton,
  LinkButton,
  GameButton,
  ButtonContent,
  ButtonSpinner,

  BaseInput,
  InputWrapper,
  InputContainer,
  InputIcon,
  BaseTextarea,
  BaseSelect,
  BaseCheckbox,
  BaseRadio,

  AnimatedContainer,
  Spinner,
  PulseContainer,
  BounceContainer,
  HoverScaleContainer,
  HoverLiftContainer,
  FadeTransition,
  SlideTransition,
  ScaleTransition,
  GlowContainer,
  TypewriterContainer,
  RealtimeIndicator,
  LoadingDots,
  AnimatedProgressBar,
  SkeletonLoader,
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleInOut,
  modalVariants,
  overlayVariants,
  listContainerVariants,
  listItemVariants,
  gameTextVariants,
  choiceButtonVariants,
  createStaggerChildren,
  createSlideTransition,

  CommonSectionHeader,
  CommonPageHeader,
  CommonCardHeader,
  CommonCardFooter,
  CommonLoadingState,
  CommonErrorState,
  CommonStatusIndicator,
  CommonSkeleton,
  CommonActionGroup,
  CommonStatItem,
  commonKeyframes,
  SkeletonLine,
  CommonTextSkeleton,
  CommonGroup,
  CommonWrapper,
  SimpleLoadingText,
  CommonCommentHeader,
  LoadingSpinner,
  ErrorText,
  SuccessText,
  Divider,
  Badge,
  ContentSkeleton,

  ChatContainer,
  ChatHeader,
  ChatHeaderTitle,
  ChatHeaderInfo,
  ChatMainContent,
  ChatMessagesContainer,
  ChatMessagesList,
  ChatInputContainer,
  ChatInputWrapper,
  ChatTextarea,
  ChatSendButton,
  ChatActionButton,
  ChatCooldownInfo,
  MessageBubble,
  MessageContent,
  MessageMeta,
  MessageSender,
  MessageTime,
  MessageTypeIndicator,
  ParticipantPanel,
  ParticipantPanelHeader,
  ParticipantList,
  ParticipantCard,
  ParticipantName,
  ParticipantStats,
  StatBar,
  StatBarLabel,
  StatBarTrack,
  StatBarFill,
  VoteContainer,
  VoteHeader,
  VoteContent,
  VoteActions,
  VoteButton,
  VoteTimer,

  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalDescription,
  ModalActionCard,
  ModalRoomCard,
  ModalRoomHeader,
  ModalRoomTitle,
  ModalRoomBadge,
  ModalRoomInfo,
  ModalRoomInfoItem,
  ModalEmptyState,
  ModalFormField,
  ModalFormLabel,
  ModalInput,
  ModalSelect,
  ModalCharacterOption,

  createBaseComponent,
  responsive,
  commonMixins
} from './components';

export const applyCSSVariables = (theme: any) => {
  const variables = {
    '--bg-primary': theme.colors.background.primary,
    '--bg-secondary': theme.colors.background.secondary,
    '--bg-tertiary': theme.colors.background.tertiary,
    
    '--text-primary': theme.colors.text.primary,
    '--text-secondary': theme.colors.text.secondary,
    '--text-tertiary': theme.colors.text.tertiary,
    '--text-inverse': theme.colors.text.inverse,
    
    '--border-light': theme.colors.border.light,
    '--border-medium': theme.colors.border.medium,
    '--border-dark': theme.colors.border.dark,
    
    '--primary-500': theme.colors.primary[500],
    '--primary-600': theme.colors.primary[600],
    '--secondary-500': theme.colors.secondary[500],
    '--secondary-600': theme.colors.secondary[600],
    
    '--success': theme.colors.success,
    '--warning': theme.colors.warning,
    '--error': theme.colors.error,
    
    '--game-health': theme.colors.game.health,
    '--game-sanity': theme.colors.game.sanity,
    '--game-choice': theme.colors.game.choice,
    '--game-success': theme.colors.game.success,
    '--game-danger': theme.colors.game.danger,
    '--game-story': theme.colors.game.story,
    
    '--shadow-card': theme.shadows.card,
    '--shadow-button': theme.shadows.button,
    '--shadow-lg': theme.shadows.dropdown || theme.shadows.lg,
  };
  
  Object.entries(variables).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
};

export const switchTheme = (mode: 'light' | 'dark' | 'game') => {
  const theme = getTheme(mode);
  applyCSSVariables(theme);
  
  document.documentElement.setAttribute('data-theme', mode);
  document.body.setAttribute('data-theme', mode);
  
  if (mode === 'game') {
    document.body.classList.add('game-mode');
  } else {
    document.body.classList.remove('game-mode');
  }
  
  return theme;
};

export const breakpoints = {
  mobile: '(max-width: 640px)',
  tablet: '(max-width: 768px)', 
  desktop: '(min-width: 1024px)',
  largeDesktop: '(min-width: 1280px)',
} as const;

export const mediaQuery = (breakpoint: keyof typeof breakpoints) => 
  `@media ${breakpoints[breakpoint]}`;

export const combineStyles = (...styles: (string | false | undefined)[]) => 
  styles.filter(Boolean).join(' ');

export const createVariant = <T extends Record<string, any>>(
  baseStyles: string,
  variants: T
) => (variant: keyof T) => `${baseStyles} ${variants[variant]}`;

export const MIGRATION_GUIDE = {
  examples: {
    old: "import { PageContainer } from '@/shared/styles/components'",
    new: "import { PageContainer } from '@/shared/styles'",
    
    oldTheme: "import { theme } from '@/shared/styles/theme'",
    newTheme: "import { lightTheme, darkTheme, gameVariant } from '@/shared/styles'",
    
    oldComponent: "styled.div`background: #ffffff;`",
    newComponent: "styled(BaseCard)`background: ${({ theme }) => theme.colors.background.primary};`",
  },
  
  steps: [
    "1. 기존 스타일 파일에서 import 경로 변경",
    "2. CSS 하드코딩을 테마 변수로 교체", 
    "3. 공통 컴포넌트를 BaseComponent로 교체",
    "4. variant 시스템 적용",
    "5. 애니메이션을 통합 시스템으로 변경"
  ]
} as const;

export const devTools = {
  getCurrentTheme: () => document.documentElement.getAttribute('data-theme') || 'light',
  
  inspectTokens: (theme: any) => ({
    colors: Object.keys(theme.colors),
    spacing: Object.keys(theme.spacing),
    typography: Object.keys(theme.typography),
    shadows: Object.keys(theme.shadows),
  }),
  
  inspectCSSVariables: () => {
    const style = getComputedStyle(document.documentElement);
    const variables: Record<string, string> = {};
    
    ['--bg-primary', '--text-primary', '--primary-500'].forEach(variable => {
      variables[variable] = style.getPropertyValue(variable);
    });
    
    return variables;
  }
} as const;