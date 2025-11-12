// lib/supabase/server.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

// FUNGSI HARUS DIJADIKAN ASYNC DAN MENGGUNAKAN AWAIT
export async function createClient() { 
  // Menggunakan await untuk memastikan kita mendapatkan objek cookies yang sinkron
  const cookieStore: ReadonlyRequestCookies = await cookies() 

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ini akan menangani kasus di mana cookies.set dipanggil di Server Component (yang tidak boleh)
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Ini akan menangani kasus di mana cookies.remove dipanggil di Server Component (yang tidak boleh)
          }
        },
      },
    }
  )
}
