import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/store/authStore';
import { api } from '@/config/axiosConfig';
import { API_ENDPOINTS, apiErrorHandler } from '@/shared/utils/common/api';
import { ERROR_MESSAGES } from '@/shared/utils/common/constants';
import { postFormSchema } from '../utils/postFormUtils';
import { validateFormContent } from '../utils/postFormUtils';
import type { PostFormData, UsePostFormReturn, PostFormProps } from '../types/postFormTypes';
import type { Post, CreatePostRequest } from '@/shared/types/community/community';

export const usePostForm = ({ 
  mode, 
  postId, 
  onSuccess, 
  onCancel 
}: PostFormProps): UsePostFormReturn => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string>('');
  const isEditing = mode === 'edit';

  const { data: existingPost, isLoading: isLoadingPost, error: fetchError } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (!postId) return null;
      try {
        return await api.get<Post>(API_ENDPOINTS.POSTS.BY_ID(postId));
      } catch (error) {
        console.error('게시글 로드 실패:', error);
        throw error;
      }
    },
    enabled: mode === 'edit' && !!postId,
    retry: 1,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<PostFormData>({
    resolver: yupResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (mode === 'edit' && existingPost && !isLoadingPost) {
      reset({
        title: existingPost.title,
        content: existingPost.content,
      });
    }
  }, [mode, existingPost, isLoadingPost, reset]);

  const watchedTitle = watch('title', '');
  const watchedContent = watch('content', '');

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostRequest) => {
      return await api.post<Post>(API_ENDPOINTS.POSTS.BASE, data);
    },
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.(newPost);
      router.push(`/community/${newPost.id}`);
    },
    onError: (error) => {
      const errorInfo = apiErrorHandler.parseError(error);
      setSubmitError(errorInfo.message);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async (data: CreatePostRequest) => {
      if (!postId) throw new Error('Post ID is required');
      return await api.put<Post>(API_ENDPOINTS.POSTS.BY_ID(postId), data);
    },
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      onSuccess?.(updatedPost);
      router.push(`/community/${updatedPost.id}`);
    },
    onError: (error) => {
      const errorInfo = apiErrorHandler.parseError(error);
      setSubmitError(errorInfo.message);
    },
  });

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      setSubmitError('');

      if (!validateFormContent(data.title, data.content)) {
        setSubmitError(ERROR_MESSAGES.REQUIRED_FIELD);
        return;
      }

      const postData: CreatePostRequest = {
        title: data.title.trim(),
        content: data.content.trim(),
      };

      if (mode === 'create') {
        await createPostMutation.mutateAsync(postData);
      } else {
        await updatePostMutation.mutateAsync(postData);
      }
    } catch (error) {
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (mode === 'edit' && postId) {
      router.push(`/community/${postId}`);
    } else {
      router.push('/community');
    }
  };

  const isLoading = isSubmitting || 
                   createPostMutation.isPending || 
                   updatePostMutation.isPending ||
                   isLoadingPost;

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    watchedTitle,
    watchedContent,
    errors,
    
    submitError,
    isLoading,
    isEditing,
    
    handleCancel,
    setError: setSubmitError,
    clearError: () => setSubmitError(''),
  };
};