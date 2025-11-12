// app/auth/callback/page.tsx

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: { code: string }
}) {
  const code = searchParams.code

  if (code) {
    const supabase = await createClient() 
    
    // Menukar 'code' dari URL dengan sesi pengguna Supabase
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Jika sukses, arahkan ke dashboard
      redirect('/dashboard')
    }
  }

  // Jika ada error atau code hilang, arahkan ke halaman login dengan pesan
  return redirect('/auth?message=Could not sign in. Check your email or contact support.')
}
