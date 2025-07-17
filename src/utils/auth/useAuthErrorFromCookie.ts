'use client';

import { useEffect, useState } from 'react';
import { getAuthErrorMessage } from './errors';

export function useAuthErrorFromCookie() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get error from cookie on client side
    const getCookieValue = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
      return null;
    };

    const errorCode = getCookieValue('auth_error');
    if (errorCode) {
      setError(getAuthErrorMessage(errorCode));
      
      // Clear the cookie after reading it
      document.cookie = 'auth_error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }, []);

  const clearError = () => setError(null);

  return { error, clearError };
}
