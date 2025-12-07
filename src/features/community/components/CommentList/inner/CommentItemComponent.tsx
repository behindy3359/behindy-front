import api from "@/config/axiosConfig";
import useAuthStore from "@/shared/store/authStore";
import API_ENDPOINTS from "@/shared/utils/common/api";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import { CommentContainer, CommentContent, CommentItem, EditingContainer } from "../styles";
import { CommentMeta } from "./CommentMeta";
import { CommentActions } from "./CommentActions";
import CommentForm from "../../CommentForm/CommentForm";
import { CommentFooter } from "./CommentFooter";
import { Comment } from "@/shared/types/community/community";
import { CommonCommentHeader } from "@/shared/styles/components";

export const CommentItemComponent = React.memo<{
  comment: Comment;
  onUpdate: () => void;
  isReply?: boolean;
}>(function CommentItemComponent({ comment, onUpdate, isReply = false }) {
  const { user } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const permissions = useMemo(() => ({
    canEdit: Boolean(user && (comment.authorId === user.id || comment.editable)),
    canDelete: Boolean(user && (comment.authorId === user.id || comment.deletable))
  }), [user, comment.authorId, comment.editable, comment.deletable]);

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      await api.delete(API_ENDPOINTS.COMMENTS.BY_ID(comment.id));
    },
    onSuccess: () => {
      setShowMenu(false);
      onUpdate();
    },
    onError: (error) => {
      console.error('[CommentItemComponent] 삭제 실패:', error);
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: async () => {
      await api.post(API_ENDPOINTS.COMMENTS.LIKE(comment.id));
    },
    onSuccess: () => {
      onUpdate();
    },
  });

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setShowMenu(false);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await deleteCommentMutation.mutateAsync();
    } catch (error) {
      console.error('[CommentItemComponent] deleteCommentMutation 실패:', error);
      throw error;
    }
  }, [deleteCommentMutation]);

  const handleLike = useCallback(async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    await likeCommentMutation.mutateAsync();
  }, [user, likeCommentMutation]);

  const handleEditComplete = useCallback(() => {
    setIsEditing(false);
    onUpdate();
  }, [onUpdate]);

  const handleToggleMenu = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  const handleMenuOutsideClick = useCallback(() => {
    setShowMenu(false);
  }, []);

  return (
    <>
      <CommentContainer
        $menuOpen={showMenu}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CommentItem $isReply={isReply}>
          <CommonCommentHeader>
            <CommentMeta
              authorName={comment.authorName}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
            />

            <CommentActions
              commentId={comment.id}
              canEdit={permissions.canEdit}
              canDelete={permissions.canDelete}
              showMenu={showMenu}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleMenu={handleToggleMenu}
            />
          </CommonCommentHeader>

          {isEditing ? (
            <EditingContainer>
              <CommentForm
                postId={comment.postId}
                editingComment={comment}
                onSuccess={handleEditComplete}
                onCancel={() => setIsEditing(false)}
                placeholder="댓글을 수정하세요..."
                autoFocus
              />
            </EditingContainer>
          ) : (
            <>
              <CommentContent>{comment.content}</CommentContent>

              <CommentFooter
                isLiked={comment.isLiked || false}
                likeCount={comment.likeCount || 0}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                onLike={handleLike}
              />
            </>
          )}
        </CommentItem>
      </CommentContainer>

      {showMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9,
            background: 'transparent',
          }}
          onClick={handleMenuOutsideClick}
        />
      )}
    </>
  );
});