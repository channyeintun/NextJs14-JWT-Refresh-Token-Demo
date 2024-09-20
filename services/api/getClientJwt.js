import { parseCookies, destroyCookie, setCookie } from "nookies";
import { JWT_KEY_IN_COOKIE, MILLISECONDS_IN_A_YEAR } from "@/constants";
import { isEmptyObj } from "../utils";

export function getClientJwt() {
    const cookies = parseCookies();

    const _setCookie = (token) =>
        setCookie(null, JWT_KEY_IN_COOKIE, token, {
            maxAge: MILLISECONDS_IN_A_YEAR,
            path: "/",
        });

    let jwt;
    if (JWT_KEY_IN_COOKIE in cookies) {
        const parsedJSON = cookies[JWT_KEY_IN_COOKIE]
            ? JSON.parse(cookies[JWT_KEY_IN_COOKIE])
            : null;
        if (
            parsedJSON === "{}" ||
            parsedJSON === "[]" ||
            isEmptyObj(parsedJSON)
        ) {
            jwt = undefined;
        } else {
            jwt = parsedJSON;
        }
    }

    const removeJwt = () =>
        destroyCookie(null, JWT_KEY_IN_COOKIE, {
            path: "/",
        });

    const setJwt = (token) => {
        if (
            !token ||
            token === undefined ||
            token === null ||
            isEmptyObj(token) ||
            token === "{}" ||
            token === "[]"
        )
            return;
        switch (typeof token) {
            case "string":
                _setCookie(token);
                break;
            case "object": {
                if (token && token.accessToken) {
                    _setCookie(JSON.stringify(token));
                }
                break;
            }
        }
    };

    return {
        jwt,
        removeJwt,
        setJwt,
    };
}
