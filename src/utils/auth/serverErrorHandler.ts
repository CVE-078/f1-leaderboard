import { cookies } from 'next/headers';

const AUTH_ERROR_COOKIE = 'auth_error';

export async function setAuthErrorCookie(errorCode: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_ERROR_COOKIE, errorCode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60, // 1 minute
    path: '/'
  });
}

export async function getAuthErrorCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const errorCookie = cookieStore.get(AUTH_ERROR_COOKIE);
  return errorCookie?.value || null;
}

export async function clearAuthErrorCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_ERROR_COOKIE);
}
