import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { CookieOptions } from '@supabase/ssr'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const createServerComponentClient = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value,
            httpOnly: options.httpOnly,
            maxAge: options.maxAge,
            path: options.path,
            sameSite: options.sameSite as ResponseCookie['sameSite'],
            secure: options.secure,
          })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value: '',
            httpOnly: options.httpOnly,
            maxAge: 0,
            path: options.path,
            sameSite: options.sameSite as ResponseCookie['sameSite'],
            secure: options.secure,
          })
        },
      },
    }
  )
}