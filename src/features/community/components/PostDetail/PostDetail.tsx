"use client";

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { CommentList } from '../CommentList/CommentList';
import { CommentForm } from '../CommentForm/CommentForm';
import { LOADING_MESSAGES } from '@/shared/utils/common/constants';
import { PageContainer } from '@/shared/styles/components';
import { PostDetailProps } from '../../types/postDetailTypes';
import { usePostDetail } from '../../hooks/usePostDetail';
import { usePostComments } from '../../hooks/usePostComments';
import { usePostInteractions } from '../../hooks/usePostInteractions';
import { PostHeader } from './inner/PostHeader';
import { PostContent } from './inner/PostContent';
import { PostErrorState } from './inner/PostErrorState';
import { CommentsSection, CommentsSectionHeader } from './styles';
import { CommonLoadingState } from '@/shared/styles/components';

export const PostDetail: React.FC<PostDetailProps> = ({
  postId,
  showComments = true,
  enableInteractions = true
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const {
    post,
    user,
    apiError,
    isLoading,
    error,
    isAuthenticated,
    canEdit,
    canDelete,
    handleDelete,
    isDeleting,
  } = usePostDetail(postId);

  const {
    commentsData,
    isLoadingComments,
    refreshComments,
  } = usePostComments(postId);

  const {
    handleBack,
    handleEdit,
  } = usePostInteractions(post);

  if (isLoading) {
    return (
      <PageContainer>
        <CommonLoadingState>
          {LOADING_MESSAGES.POST_LOADING}
        </CommonLoadingState>
      </PageContainer>
    );
  }

  if (error || apiError || !post) {
    return (
      <PageContainer>
        <PostErrorState
          error={error}
          apiError={apiError}
          onBack={handleBack}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PostHeader
        showMenu={showMenu}
        canEdit={canEdit}
        canDelete={canDelete}
        isDeleting={isDeleting}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleMenu={handleToggleMenu}
      />

      <PostContent post={post} />

      {showComments && (
        <CommentsSection>
          <CommentsSectionHeader>
            <h3>
              <MessageSquare size={20} />
              댓글 {commentsData?.totalElements || 0}개
            </h3>
          </CommentsSectionHeader>
          
          {isAuthenticated() && (
            <div style={{ padding: '24px', borderBottom: '1px solid #f3f4f6' }}>
              <CommentForm 
                postId={postId} 
                onSuccess={refreshComments}
              />
            </div>
          )}

          <div style={{ padding: '24px' }}>
            {isLoadingComments ? (
              <CommonLoadingState>
                {LOADING_MESSAGES.COMMENT_LOADING}
              </CommonLoadingState>
            ) : commentsData && commentsData.comments.length > 0 ? (
              <CommentList 
                comments={commentsData.comments}
                onUpdate={refreshComments}
              />
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6b7280' 
              }}>
                아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
              </div>
            )}
          </div>
        </CommentsSection>
      )}

      {showMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9,
          }}
          onClick={() => setShowMenu(false)}
        />
      )}
    </PageContainer>
  );
};

export default PostDetail;