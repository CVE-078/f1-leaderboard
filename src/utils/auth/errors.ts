// Supabase Auth Error Codes and Messages
export enum AuthErrorCode {
  // Authentication & Authorization
  INVALID_CREDENTIALS = 'invalid_credentials',
  EMAIL_NOT_CONFIRMED = 'email_not_confirmed',
  PHONE_NOT_CONFIRMED = 'phone_not_confirmed',
  USER_NOT_FOUND = 'user_not_found',
  USER_BANNED = 'user_banned',
  SESSION_EXPIRED = 'session_expired',
  SESSION_NOT_FOUND = 'session_not_found',
  SIGNUP_DISABLED = 'signup_disabled',
  
  // Email & Phone Related
  EMAIL_EXISTS = 'email_exists',
  PHONE_EXISTS = 'phone_exists',
  EMAIL_ADDRESS_INVALID = 'email_address_invalid',
  EMAIL_ADDRESS_NOT_AUTHORIZED = 'email_address_not_authorized',
  EMAIL_PROVIDER_DISABLED = 'email_provider_disabled',
  PHONE_PROVIDER_DISABLED = 'phone_provider_disabled',
  
  // Rate Limiting
  OVER_EMAIL_SEND_RATE_LIMIT = 'over_email_send_rate_limit',
  OVER_SMS_SEND_RATE_LIMIT = 'over_sms_send_rate_limit',
  OVER_REQUEST_RATE_LIMIT = 'over_request_rate_limit',
  
  // Password Related
  WEAK_PASSWORD = 'weak_password',
  SAME_PASSWORD = 'same_password',
  
  // OTP & Verification
  OTP_EXPIRED = 'otp_expired',
  OTP_DISABLED = 'otp_disabled',
  CAPTCHA_FAILED = 'captcha_failed',
  
  // MFA Related
  MFA_CHALLENGE_EXPIRED = 'mfa_challenge_expired',
  MFA_VERIFICATION_FAILED = 'mfa_verification_failed',
  MFA_FACTOR_NOT_FOUND = 'mfa_factor_not_found',
  
  // OAuth & SSO
  PROVIDER_DISABLED = 'provider_disabled',
  OAUTH_PROVIDER_NOT_SUPPORTED = 'oauth_provider_not_supported',
  SSO_PROVIDER_NOT_FOUND = 'sso_provider_not_found',
  
  // Flow States
  FLOW_STATE_EXPIRED = 'flow_state_expired',
  FLOW_STATE_NOT_FOUND = 'flow_state_not_found',
  
  // General
  VALIDATION_FAILED = 'validation_failed',
  UNEXPECTED_FAILURE = 'unexpected_failure',
  REQUEST_TIMEOUT = 'request_timeout',
  CONFLICT = 'conflict',
  
  // JWT Related
  BAD_JWT = 'bad_jwt',
  NO_AUTHORIZATION = 'no_authorization',
}

export const AuthErrorMessages: Record<AuthErrorCode, string> = {
  [AuthErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password. Please check your credentials and try again.',
  [AuthErrorCode.EMAIL_NOT_CONFIRMED]: 'Please check your email and click the confirmation link before signing in.',
  [AuthErrorCode.PHONE_NOT_CONFIRMED]: 'Please verify your phone number before signing in.',
  [AuthErrorCode.USER_NOT_FOUND]: 'No account found with this email address.',
  [AuthErrorCode.USER_BANNED]: 'Your account has been temporarily suspended. Please contact support.',
  [AuthErrorCode.SESSION_EXPIRED]: 'Your session has expired. Please sign in again.',
  [AuthErrorCode.SESSION_NOT_FOUND]: 'Session not found. Please sign in again.',
  [AuthErrorCode.SIGNUP_DISABLED]: 'New account creation is currently disabled.',
  
  [AuthErrorCode.EMAIL_EXISTS]: 'An account with this email address already exists.',
  [AuthErrorCode.PHONE_EXISTS]: 'An account with this phone number already exists.',
  [AuthErrorCode.EMAIL_ADDRESS_INVALID]: 'Please enter a valid email address.',
  [AuthErrorCode.EMAIL_ADDRESS_NOT_AUTHORIZED]: 'This email address is not authorized. Please contact support.',
  [AuthErrorCode.EMAIL_PROVIDER_DISABLED]: 'Email sign-up is currently disabled.',
  [AuthErrorCode.PHONE_PROVIDER_DISABLED]: 'Phone sign-up is currently disabled.',
  
  [AuthErrorCode.OVER_EMAIL_SEND_RATE_LIMIT]: 'Too many emails sent. Please wait a few minutes before trying again.',
  [AuthErrorCode.OVER_SMS_SEND_RATE_LIMIT]: 'Too many SMS messages sent. Please wait a few minutes before trying again.',
  [AuthErrorCode.OVER_REQUEST_RATE_LIMIT]: 'Too many requests. Please wait a few minutes before trying again.',
  
  [AuthErrorCode.WEAK_PASSWORD]: 'Password is too weak. Please choose a stronger password with at least 8 characters.',
  [AuthErrorCode.SAME_PASSWORD]: 'New password must be different from your current password.',
  
  [AuthErrorCode.OTP_EXPIRED]: 'Verification code has expired. Please request a new one.',
  [AuthErrorCode.OTP_DISABLED]: 'One-time password authentication is disabled.',
  [AuthErrorCode.CAPTCHA_FAILED]: 'CAPTCHA verification failed. Please try again.',
  
  [AuthErrorCode.MFA_CHALLENGE_EXPIRED]: 'Multi-factor authentication challenge has expired. Please try again.',
  [AuthErrorCode.MFA_VERIFICATION_FAILED]: 'Multi-factor authentication failed. Please check your code and try again.',
  [AuthErrorCode.MFA_FACTOR_NOT_FOUND]: 'Multi-factor authentication method not found.',
  
  [AuthErrorCode.PROVIDER_DISABLED]: 'This sign-in method is currently disabled.',
  [AuthErrorCode.OAUTH_PROVIDER_NOT_SUPPORTED]: 'This OAuth provider is not supported.',
  [AuthErrorCode.SSO_PROVIDER_NOT_FOUND]: 'SSO provider not found.',
  
  [AuthErrorCode.FLOW_STATE_EXPIRED]: 'Authentication flow has expired. Please try signing in again.',
  [AuthErrorCode.FLOW_STATE_NOT_FOUND]: 'Authentication flow not found. Please try signing in again.',
  
  [AuthErrorCode.VALIDATION_FAILED]: 'The information provided is not valid. Please check your input.',
  [AuthErrorCode.UNEXPECTED_FAILURE]: 'An unexpected error occurred. Please try again or contact support.',
  [AuthErrorCode.REQUEST_TIMEOUT]: 'Request timed out. Please check your connection and try again.',
  [AuthErrorCode.CONFLICT]: 'A conflict occurred. Please try again.',
  
  [AuthErrorCode.BAD_JWT]: 'Authentication token is invalid. Please sign in again.',
  [AuthErrorCode.NO_AUTHORIZATION]: 'Authorization required. Please sign in to continue.',
};

export function getAuthErrorMessage(errorCode: string): string {
  const code = errorCode as AuthErrorCode;
  return AuthErrorMessages[code] || 'An unexpected error occurred. Please try again.';
}

export function isAuthError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && 
         Object.values(AuthErrorCode).includes((error as { code: string }).code as AuthErrorCode);
}
