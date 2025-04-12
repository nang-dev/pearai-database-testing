import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // Convert Supabase cookie options to Next.js cookie options
            cookieStore.set({
              name,
              value,
              httpOnly: options.httpOnly,
              maxAge: options.maxAge,
              path: options.path,
              sameSite: options.sameSite,
              secure: options.secure,
            })
          },
          remove(name: string, options: CookieOptions) {
            // Set empty value with same options to remove
            cookieStore.set({
              name,
              value: '',
              httpOnly: options.httpOnly,
              maxAge: 0, // Expire immediately
              path: options.path,
              sameSite: options.sameSite,
              secure: options.secure,
            })
          },
        },
      }
    )

    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/', request.url))
}