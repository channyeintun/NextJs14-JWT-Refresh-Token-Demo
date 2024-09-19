import { cookies } from "next/headers";
import { JWT_KEY_IN_COOKIE } from "@/constants";
import { isEmptyObj } from "./utils";

// cookies can only be accessed inside components or routes
export function getJwtServer() {
    const cookiesList = cookies();

    let jwt;

    if (cookiesList.has(JWT_KEY_IN_COOKIE)) {
        const jwtString = cookiesList.get(JWT_KEY_IN_COOKIE).value;
        const parsedJSON = JSON.parse(jwtString);
        if (
            parsedJSON === "{}" ||
            parsedJSON === "[]" ||
            isEmptyObj(parsedJSON)
        ) {
            jwt = null;
        } else {
            jwt = parsedJSON;
        }
    }

    const removeJwt = () => cookiesList.delete(JWT_KEY_IN_COOKIE);

    const setJwt = (_jwt) => {
        if (
            !_jwt ||
            _jwt === undefined ||
            _jwt === null ||
            isEmptyObj(_jwt) ||
            _jwt === "{}" ||
            _jwt === "[]"
        )
            return;
        switch (typeof _jwt) {
            case "string":
                cookiesList.set(JWT_KEY_IN_COOKIE, _jwt);
                break;
            case "object": {
                if (_jwt && _jwt.accessToken) {
                    cookiesList.set(JWT_KEY_IN_COOKIE, JSON.stringify(_jwt));
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
