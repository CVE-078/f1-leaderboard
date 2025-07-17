'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { setAuthErrorCookie } from '@/utils/auth/serverErrorHandler'
import { isAuthError } from '@/utils/auth/errors'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Store the actual Supabase error code for proper handling
    const errorCode = (isAuthError(error) && error.code) ? error.code : 'unexpected_failure';
    await setAuthErrorCookie(errorCode);
    redirect('/login')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    // Store the actual Supabase error code for proper handling
    const errorCode = (isAuthError(error) && error.code) ? error.code : 'unexpected_failure';
    await setAuthErrorCookie(errorCode);
    redirect('/login')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}