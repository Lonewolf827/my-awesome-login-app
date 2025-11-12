// app/auth/actions.ts

'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// =======================================================
// 1. Fungsi untuk Signup (FIXED: await headers() & await createClient())
// =======================================================
export async function signup(formData: FormData) {
  const headerList = await headers() // FIX: await headers()
  const origin = headerList.get('origin')
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient() // FIX: await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`, 
      data: {
        first_name: formData.get('firstName') as string,
      }
    },
  })

  if (error) {
    return redirect('/auth?message=Could not authenticate user')
  }

  return redirect('/auth?message=Check email to continue sign in process')
}

// =======================================================
// 2. Fungsi untuk Login (Tambahkan & Fixed: await createClient())
// =======================================================
export async function signin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient() // FIX: await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/auth?message=Invalid credentials')
  }

  return redirect('/dashboard')
}

// =======================================================
// 3. Fungsi untuk Logout (Tambahkan & Fixed: await createClient())
// =======================================================
export async function signout() {
  const supabase = await createClient() // FIX: await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}
