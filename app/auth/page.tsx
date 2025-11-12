// app/auth/page.tsx

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// Import Server Actions
import { signin, signup } from './actions' 

export default async function AuthPage({ 
// ...
  // UBAH: Tambahkan 'await' di sini
  const supabase = await createClient() 
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }


  // =======================================================
  // Komponen Form Login
  // =======================================================
  const SignInForm = () => (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signin}>
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
        Sign In
      </button>
      
      {/* Tombol untuk beralih ke Sign Up */}
      <div className="text-center mt-4">
        Belum punya akun?{' '}
        <button
          type="button"
          onClick={() => {window.location.hash = '#signup';}} // Gunakan arrow function
          className="text-green-500 hover:underline"
        >
          Daftar Sekarang
        </button>
      </div>
    </form>
  )


  // =======================================================
  // Komponen Form Sign Up
  // =======================================================
  const SignUpForm = () => (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signup}>
      <label className="text-md" htmlFor="firstName">
        Nama Depan
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="firstName"
        type="text"
        placeholder="John"
        required
      />
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
        Sign Up
      </button>
      
      {/* Tombol untuk beralih ke Login */}
      <div className="text-center mt-4">
        Sudah punya akun?{' '}
        <button
          type="button"
          onClick={() => {window.location.hash = '#signin';}} // Gunakan arrow function
          className="text-green-500 hover:underline"
        >
          Masuk
        </button>
      </div>
    </form>
  )
  
  // =======================================================
  // Main Render Function (FULL JSX DI SINI)
  // =======================================================
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <div id="signin">
        <h2 className="text-2xl font-bold mb-4 text-center">Masuk ke Akun Anda</h2>
        <SignInForm />
      </div>

      <div id="signup" className="hidden"> 
        <h2 className="text-2xl font-bold mb-4 text-center">Daftar Akun Baru</h2>
        <SignUpForm />
      </div>

      {searchParams.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}

      {/* Script untuk Mengganti Tampilan Form (Client Side) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const signInDiv = document.getElementById('signin');
            const signUpDiv = document.getElementById('signup');
            const handleHashChange = () => {
              if (window.location.hash === '#signup') {
                signInDiv.classList.add('hidden');
                signUpDiv.classList.remove('hidden');
              } else {
                signInDiv.classList.remove('hidden');
                signUpDiv.classList.add('hidden');
              }
            };
            window.addEventListener('hashchange', handleHashChange);
            handleHashChange(); // Run on initial load
          `,
        }}
      />
    </div>
  )
}
