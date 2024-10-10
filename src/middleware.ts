import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 export { default } from "next-auth/middleware"
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token= await getToken({req : request})
  const url =request.nextUrl
//   const publicPath= path ==="/log-in"|| path ==="/sign-up"
//   const token =request.cookies.get('token')?.value||""
//   if(publicPath && token){
//      return NextResponse.redirect(new URL("/",request.nextUrl))
//   }
//   if(!publicPath && !token){
//     return NextResponse.redirect(new URL("/login",request.nextUrl))
//  }
  if(token && (
    url.pathname.startsWith('sign-in')

  )){
    return NextResponse.redirect(new URL("/",request.url))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/log-in',
    // '/sign-up',
    // '/',
    '/sign-in'
  ],
}