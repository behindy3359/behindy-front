import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from '@/shared/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import { commonMixins } from '@/shared/styles/components/mixins';

interface MultiplayerEndingPageProps {
  stationName: string;
  endingSummary: string;
}

export const MultiplayerEndingPage: React.FC<MultiplayerEndingPageProps> = ({
  stationName,
  endingSummary,
}) => {
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (currentIndex < endingSummary.length) {
        setDisplayedText(endingSummary.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [endingSummary]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleBackToRoomList = () => {
    router.push('/multiplayer');
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StorySection>
        <StoryTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stationName}역 이야기의 끝
        </StoryTitle>

        <MessageContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <MessageText>
            {displayedText}
            {isTyping && <Cursor>|</Cursor>}
          </MessageText>
        </MessageContainer>
      </StorySection>

      <ActionButtons
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isTyping ? 0 : 1, y: isTyping ? 20 : 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={handleBackToRoomList}
          size="lg"
          disabled={isTyping}
        >
          다른 방 찾기
        </Button>

        <Button
          variant="ghost"
          onClick={handleBackToHome}
          leftIcon={<Home size={18} />}
          disabled={isTyping}
        >
          홈으로 돌아가기
        </Button>
      </ActionButtons>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  min-height: 500px;
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
    min-height: 400px;
  }
`;

const StorySection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  background: var(--bg-secondary);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[8]};
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      var(--primary-500),
      var(--secondary-500)
    );
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;

const StoryTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 2px solid var(--border-light);

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const MessageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  max-height: 500px;
  overflow-y: auto;

  ${({ theme }) => commonMixins.customScrollbar(theme.colors.text.tertiary, theme.colors.background.secondary)}
`;

const MessageText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1.8;
  color: var(--text-primary);
  text-align: left;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const Cursor = styled.span`
  animation: blink 1s step-end infinite;
  margin-left: 2px;

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
