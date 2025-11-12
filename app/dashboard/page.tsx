import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signout } from '../auth/actions'

export default async function Dashboard() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Jika tidak ada sesi, redirect ke halaman login
    redirect('/auth')
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">🎉 Selamat Datang di Dashboard!</h1>
      <p className="mb-6 text-lg">Anda berhasil login sebagai: **{user.email}**</p>
      
      {/* Tombol Logout menggunakan Server Action */}
      <form action={signout}>
        <button 
          type="submit" 
          className="py-2 px-4 border rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          Logout
        </button>
      </form>
    </div>
  )
}
