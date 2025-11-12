// app/auth/page.tsx

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signin, signup } from './actions' 

// TAMBAHKAN KATA KUNCI 'async' DI SINI
export default async function AuthPage({ 
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const supabase = createClient()
  
  // Sekarang 'await' ini legal karena fungsi sudah async
  const {
    data: { user },
  } = await supabase.auth.getUser() 

  if (user) {
    redirect('/dashboard')
  }
  
  // ... (sisa kode komponen AuthPage di bawah)
  
  // =======================================================
  // Komponen Form Login (SignInForm) - Tidak perlu diubah
  // =======================================================
  const SignInForm = () => (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signin}>
      {/* ... kode form login ... */}
    </form>
  )

  // =======================================================
  // Komponen Form Sign Up (SignUpForm) - Tidak perlu diubah
  // =======================================================
  const SignUpForm = () => (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signup}>
      {/* ... kode form signup ... */}
    </form>
  )

  // ... (sisa kode Main Render Function)
  
  return (
    // ... JSX ...
  )
}
