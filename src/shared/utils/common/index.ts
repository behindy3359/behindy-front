import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const textUtils = {
  stripHtml: (html: string): string => {
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    } else {
      return html.replace(/<[^>]*>/g, '');
    }
  },

  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  createPreview: (content: string, maxLength = 120): string => {
    const plainText = textUtils.stripHtml(content);
    const cleanText = plainText.replace(/\s+/g, ' ').trim();
    return textUtils.truncate(cleanText, maxLength);
  },
}

export const userUtils = {
  getInitial: (name?: string): string => {
    if (!name || !name.trim()) return 'U';
    return name.charAt(0).toUpperCase();
  },
};

export const timeUtils = {
  relative: (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}일 전`;
    
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: ko 
    });
  },

  absolute: (dateString: string | Date, includeTime = true): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  },

  combined: (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const relativeTime = timeUtils.relative(date);
    const now = new Date();
    const isSameYear = date.getFullYear() === now.getFullYear();

    const absoluteDate = date.toLocaleDateString('ko-KR', {
      ...(isSameYear ? {} : { year: 'numeric' }),
      month: 'long',
      day: 'numeric',
    });

    return `${relativeTime} · ${absoluteDate}`;
  },
};

export const domUtils = {
  clipboard: {
    writeText: async (text: string): Promise<boolean> => {
      if (typeof window === 'undefined') return false;
      
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textArea);
          return success;
        }
      } catch {
        return false;
      }
    },
  },

  storage: {
    get: (key: string): string | null => {
      if (typeof window === 'undefined') return null;
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },

    set: (key: string, value: string): boolean => {
      if (typeof window === 'undefined') return false;
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },

    getJSON: <T>(key: string): T | null => {
      try {
        const value = domUtils.storage.get(key);
        return value ? JSON.parse(value) : null;
      } catch {
        return null;
      }
    },

    setJSON: (key: string, value: unknown): boolean => {
      try {
        return domUtils.storage.set(key, JSON.stringify(value));
      } catch {
        return false;
      }
    },
  },
};

export const formatters = {
  relativeTime: timeUtils.relative,
  absoluteTime: timeUtils.absolute,
  combinedTime: timeUtils.combined,
  truncateText: textUtils.truncate,
  stripHtml: textUtils.stripHtml,
  getUserInitial: userUtils.getInitial,
  createPostPreview: textUtils.createPreview,
};
