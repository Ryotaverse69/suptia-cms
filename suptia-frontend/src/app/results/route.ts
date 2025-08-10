import {NextResponse} from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const res = NextResponse.redirect(new URL('/results', request.url))
    res.cookies.set('persona', JSON.stringify(data), {httpOnly: true, sameSite: 'lax', path: '/'})
    return res
  } catch (e) {
    return NextResponse.json({error: 'invalid request'}, {status: 400})
  }
}


