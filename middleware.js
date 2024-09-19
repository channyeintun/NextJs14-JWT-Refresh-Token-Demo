import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { refreshToken } from "@/services";
import { JWT_KEY_IN_COOKIE, MILLISECONDS_IN_A_YEAR } from "./constants";

dayjs.extend(utc);

export async function middleware(request) {
    const response = NextResponse.next();

    if (request.cookies.has(JWT_KEY_IN_COOKIE)) {
        const jwtCookie = request.cookies.get(JWT_KEY_IN_COOKIE);

        const options = {
            path: "/",
            maxAge: MILLISECONDS_IN_A_YEAR,
        };

        if (jwtCookie && jwtCookie.value) {
            let jwt = JSON.parse(jwtCookie.value);
            const expired = isExpired(jwt.expiration);
            if (expired) {
                const res = await refreshToken(jwt.refreshToken);
                if (res.status === 200) {
                    const resJson = await res.json();

                    request.cookies.delete(JWT_KEY_IN_COOKIE);
                    response.cookies.delete(JWT_KEY_IN_COOKIE);

                    request.cookies.set({
                        name: JWT_KEY_IN_COOKIE,
                        value: JSON.stringify(resJson),
                        ...options,
                    });
                    response.cookies.set({
                        name: JWT_KEY_IN_COOKIE,
                        value: JSON.stringify(resJson),
                        ...options,
                    });
                }
            }
        }
    }

    return response;
}

// add excluded paths to prevent triggering middleware
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.well-known|assets|flags).*)",
    ],
};

function isExpired(expiration) {
    const expirationDate = dayjs.utc(expiration);

    const now = dayjs.utc();

    const expired = expirationDate.isBefore(now);

    return expired;
}
