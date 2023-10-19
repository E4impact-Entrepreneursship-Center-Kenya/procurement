import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_API_ROOT, DEFAULT_APP_URL, LOCAL_STORAGE_KEYS, URLS } from "./config/constants";

export default async function middleware(req: NextRequest) {
    const cookies = req?.cookies
    const cookie_name = LOCAL_STORAGE_KEYS.token
    const CHECK_URL = `${DEFAULT_API_ROOT}${URLS.CHECK_LOGIN_STATUS}/`
    const token = cookies.get(cookie_name)

    const res = await fetch(CHECK_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token?.value}`,
        },
    });
    const data = await res?.json()
    
    if (data) {
        if (data?.logged_in) {
            return NextResponse.next()
        }
        else {
            const response = NextResponse.redirect(`${DEFAULT_APP_URL}/auth/login?message=token-expired`)
            response.cookies.delete(LOCAL_STORAGE_KEYS.token)
            response.cookies.delete(LOCAL_STORAGE_KEYS.user)
            response.cookies.delete(LOCAL_STORAGE_KEYS.user_id)
            response.cookies.delete(LOCAL_STORAGE_KEYS.login_status)
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    // matcher: "/:path*",
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - auth (auth pages)
         * - assets (assets dir in the public dir)
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        // '/((?!auth|api|assets|_next/static|_next/image|favicon.ico).*)',
        "/admin/:path*",
        "/account/:path*",
        "/invoices/:path*",
    ],
};