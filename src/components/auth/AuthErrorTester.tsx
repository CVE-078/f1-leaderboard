"use client";

import { useState } from "react";
import { AuthErrorCode, getAuthErrorMessage } from "@/utils/auth/errors";

export function AuthErrorTester() {
  const [selectedError, setSelectedError] = useState<AuthErrorCode>(
    AuthErrorCode.INVALID_CREDENTIALS
  );

  const commonErrors = [
    AuthErrorCode.INVALID_CREDENTIALS,
    AuthErrorCode.EMAIL_NOT_CONFIRMED,
    AuthErrorCode.EMAIL_EXISTS,
    AuthErrorCode.WEAK_PASSWORD,
    AuthErrorCode.OVER_EMAIL_SEND_RATE_LIMIT,
    AuthErrorCode.SIGNUP_DISABLED,
    AuthErrorCode.USER_NOT_FOUND,
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Auth Error Tester</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Error Code:
        </label>
        <select
          value={selectedError}
          onChange={(e) => setSelectedError(e.target.value as AuthErrorCode)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {commonErrors.map((errorCode) => (
            <option key={errorCode} value={errorCode}>
              {errorCode}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-800">
          <strong>Error Message:</strong> {getAuthErrorMessage(selectedError)}
        </p>
      </div>
    </div>
  );
}
