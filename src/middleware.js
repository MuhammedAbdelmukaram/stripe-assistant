import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const verifyAdminToken = async (request) => {
    const url = request.nextUrl.clone();
    const tokenObj = request.cookies.get('adminToken');

    console.log('Token from cookies:', tokenObj); // Log token object

    if (!tokenObj || !tokenObj.value) {
        url.pathname = '/admin-signin'; // Redirect to admin sign-in if no token
        return NextResponse.redirect(url);
    }

    const token = tokenObj.value; // Extract the token value

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        console.error('Invalid or expired token:', error);
        url.pathname = '/admin-signin'; // Redirect to admin sign-in if token is invalid or expired
        return NextResponse.redirect(url);
    }
};

const verifyUrlToken = async (request) => {
    const url = request.nextUrl.clone();
    const token = url.searchParams.get('token');

    if (!token) {
        // No token found, redirect to home page or an accesss denied page
        url.pathname = '/expired-signup';
        return NextResponse.redirect(url);
    }

    console.log(token)
    try {
        const response = await fetch(`${request.nextUrl.origin}/api/verify-token?token=${encodeURIComponent(token)}`);
        const data = await response.json();

        if (!data.isValid) {
            url.pathname = '/expired-signup'; // Redirect to home page or an access denied page if token is invalid or premium
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error verifying token:', error);
        url.pathname = '/'; // Redirect to home page or an access denied page on error
        return NextResponse.redirect(url);
    }
};


// Main middleware function
export async function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin-panel')) {
        return verifyAdminToken(request);
    }

    if (pathname.startsWith('/signup/user')) {
        return verifyUrlToken(request);
    }

    return NextResponse.next();
}

export const config = {
        matcher: ['/admin-panel/:path*', '/signup/user/:path*'], // Protect all routes under /admin-panel
};
