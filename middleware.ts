import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authUser = request.cookies.get('authUser')?.value;

  console.log('AuthUser:', authUser); // For debugging

  // If user not logged in and trying to access protected route
  if (!authUser && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and trying to access login again
  if (authUser && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/profile', '/login' , "/dashboard/users" , "/dashboard/rooms" ,"/dashboard/bookings","/dashboard/blogs", "/dashboard/ads", "/dashboard/notifications" , "/dashboard/email"],
};
