// app/dashboard/page.tsx

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// Import Server Action Logout
import { signout } from '../auth/actions' 

export default async function Dashboard() {
  const supabase = createClient()

  // Ambil sesi pengguna dari cookies (dilakukan di server)
  const { 
    data: { user },
  } = await supabase.auth.getUser()

  // Jika tidak ada user, redirect ke halaman autentikasi
  if (!user) {
    redirect('/auth')
  }

  // Jika ada user, tampilkan dashboard
  return (
    <div className="flex-1 w-full flex flex-col items-center p-10 bg-gray-50 min-h-screen">
      
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          🎉 Dashboard Utama
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Selamat datang di area terproteksi, **{user.email}**!
        </p>
        
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600">
            Informasi Sesi Pengguna
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              **User ID (UUID):** <code className="bg-gray-100 p-1 rounded text-sm break-all">{user.id}</code>
            </p>
            <p className="text-gray-700">
              **Email:** <code className="bg-gray-100 p-1 rounded text-sm break-all">{user.email}</code>
            </p>
            <p className="text-gray-700">
              **Dibuat pada:** <code className="bg-gray-100 p-1 rounded text-sm">{new Date(user.created_at).toLocaleDateString()}</code>
            </p>
            {/* Kamu bisa menampilkan data profil tambahan dari tabel 'profiles' di sini */}
          </div>
        </div>

        <div className="mt-8">
          {/* Form yang memanggil Server Action signout */}
          <form action={signout}>
            <button
              type="submit"
              className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Sign Out / Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
