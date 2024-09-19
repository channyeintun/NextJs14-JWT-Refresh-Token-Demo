import { API_URL } from "./apiUrl";

export function createApi(apiInstance) {
    return {
        signIn: (data) =>
            apiInstance.post(API_URL.loginUrl, data).then((res) => res.data),
    };
}
