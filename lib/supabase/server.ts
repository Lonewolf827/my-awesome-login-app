// lib/supabase/server.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

// FUNGSI INI HARUS ASYNC
export async function createClient() { 
  // FIX: Menggunakan 'await cookies()' untuk mendapatkan objek yang benar
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
            // Error ini diabaikan karena cookies.set hanya boleh di Server Action/Route Handler
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Error ini diabaikan karena cookies.remove hanya boleh di Server Action/Route Handler
          }
        },
      },
    }
  )
}
