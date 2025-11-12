// app/auth/actions.ts

'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers' // Pastikan import ini benar
import { redirect } from 'next/navigation'

// Fungsi untuk Signup
export async function signup(formData: FormData) {
  // SOLUSI: Tambahkan 'await' di sini
  const headerList = await headers()
  const origin = headerList.get('origin')
  
  // ... (kode lainnya tetap sama)
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Pastikan origin digunakan di sini
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

// ... (lanjutkan dengan fungsi signin dan signout di bawahnya)
