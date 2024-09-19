import axios from "axios";

import { API_URL, getJwtClient, setAPIToken } from "@/services";
import { refreshToken } from "./refreshToken";

let refreshing_token = null;
export function setRefreshTokenInterceptor({ apiInstance }) {
    // console.log("--------set refresh token interceptor--------");
    apiInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { jwt, setJwt } = getJwtClient();

            const originalRequest = error.config;

            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url !== API_URL.loginUrl
            ) {
                originalRequest._retry = true;

                try {
                    if (jwt && jwt.refreshToken) {
                        refreshing_token =
                            refreshing_token ?? refreshToken(jwt.refreshToken);
                        const response = await refreshing_token;
                        if (response.status === 200) {
                            const newJwt = await response.json();
                            if (newJwt && newJwt.accessToken) {
                                setJwt(newJwt);

                                setAPIToken(apiInstance, newJwt.accessToken);
                                const bearToken = `Bearer ${newJwt.accessToken}`;
                                axios.defaults.headers.common.Authorization =
                                    bearToken;
                                originalRequest.headers["Authorization"] =
                                    bearToken;
                            }
                        } else {
                            throw new Error(
                                "Unknown problem occurred with current session. Please log out and log in again.",
                            );
                        }
                    }

                    return apiInstance(originalRequest);
                } catch (refreshError) {
                    console.error("Refresh token failed:", refreshError);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        },
    );
}
