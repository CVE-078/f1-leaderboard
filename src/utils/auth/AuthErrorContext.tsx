'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getAuthErrorMessage, isAuthError } from './errors';

interface AuthErrorContextType {
  error: string | null;
  setError: (error: string | null) => void;
  setAuthError: (error: unknown) => void;
  clearError: () => void;
}

const AuthErrorContext = createContext<AuthErrorContextType | undefined>(undefined);

export function AuthErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  const setAuthError = (authError: unknown) => {
    if (isAuthError(authError)) {
      const errorCode = (authError as { code: string }).code;
      setError(getAuthErrorMessage(errorCode));
    } else if (authError instanceof Error) {
      setError(authError.message);
    } else if (typeof authError === 'string') {
      setError(authError);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthErrorContext.Provider value={{
      error,
      setError,
      setAuthError,
      clearError
    }}>
      {children}
    </AuthErrorContext.Provider>
  );
}

export function useAuthError() {
  const context = useContext(AuthErrorContext);
  if (context === undefined) {
    throw new Error('useAuthError must be used within an AuthErrorProvider');
  }
  return context;
}
