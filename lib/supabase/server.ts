// lib/supabase/server.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

// FUNGSI HARUS DIJADIKAN ASYNC
export async function createClient() { 
  // Gunakan await untuk memastikan kita mendapatkan objek cookies yang sinkron.
  // Walaupun cookies() dari next/headers seharusnya synchronous,
  // build worker sering salah mengetiknya sebagai Promise.
  const cookieStore: ReadonlyRequestCookies = await cookies() 

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Di sini, cookieStore sudah pasti objek ReadonlyRequestCookies
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ini bisa terjadi di Server Component yang tidak dapat memanggil cookies.set
            // Panggil cookies.set hanya di Server Action atau Route Handler
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Panggil cookies.remove hanya di Server Action atau Route Handler
          }
        },
      },
    }
  )
}
