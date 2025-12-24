import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log(pathname)

    const publicRoutes = [
        '/auth/signin',
        '/auth/signup',
        '/auth/verify-email',
    ];

    if (publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    const token = request.cookies.get('better-auth.session_token')?.value;

    if (!token) {
        return NextResponse.redirect(
            new URL('/auth/signin', request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
