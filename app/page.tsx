// app/page.tsx

import Link from 'next/link'

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        🚀 Aplikasi Login Keren Sudah Siap!
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Semua logika autentikasi (login, daftar, logout) sudah berfungsi.
      </p>
      
      <Link href="/auth" legacyBehavior>
        <a className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-150 ease-in-out text-lg">
          Lanjut ke Halaman Autentikasi
        </a>
      </Link>
    </div>
  )
}
