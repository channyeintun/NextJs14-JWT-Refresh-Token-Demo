import { API_URL } from "./apiUrl";
import { BASE_URL } from "./baseUrl";

// only for middleware because cannot use axios there, so used fetch
export function refreshToken(refreshToken) {
    const url = `${BASE_URL}${API_URL.refreshTokenUrl}`;
    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ refreshToken }),
    });
}
