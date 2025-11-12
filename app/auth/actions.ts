'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// Fungsi untuk Signup
export async function signup(formData: FormData) {
  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`, // Penting untuk verifikasi email
      // Data opsional untuk trigger RLS di Supabase
      data: {
        first_name: formData.get('firstName') as string,
      }
    },
  })

  if (error) {
    // Handle error (misalnya: email sudah terdaftar, password lemah)
    return redirect('/auth?message=Could not authenticate user')
  }

  // Supabase akan mengirim email konfirmasi
  return redirect('/auth?message=Check email to continue sign in process')
}

// Fungsi untuk Login
export async function signin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Handle error (misalnya: kredensial tidak cocok)
    return redirect('/auth?message=Invalid credentials')
  }

  // Redirect ke halaman dashboard
  return redirect('/dashboard')
}

// Fungsi untuk Logout
export async function signout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/')
}
