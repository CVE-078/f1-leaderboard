"use client";

import { useAuthError } from "@/utils/auth/AuthErrorContext";
import { useEffect } from "react";

interface AuthErrorDisplayProps {
  className?: string;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export function AuthErrorDisplay({
  className = "",
  autoHide = false,
  autoHideDelay = 5000,
}: AuthErrorDisplayProps) {
  const { error, clearError } = useAuthError();

  useEffect(() => {
    if (error && autoHide) {
      const timer = setTimeout(() => {
        clearError();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [error, autoHide, autoHideDelay, clearError]);

  if (!error) return null;

  return (
    <div
      className={`bg-red-500/20 border border-red-500/50 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-400 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-200">
              Authentication Error
            </h3>
            <p className="text-sm text-red-200 mt-1">{error}</p>
          </div>
        </div>
        <button
          onClick={clearError}
          className="flex-shrink-0 ml-3 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
