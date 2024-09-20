"use client";

import axios from "axios";

import { createApi } from "./createApi";
import { BASE_URL } from "./baseUrl";
import { getClientJwt } from "./getClientJwt";
import { setAPIToken } from "./setAPIToken";
import { setRefreshTokenInterceptor } from "./setRefreshTokenInterceptor";

export const axiosClient = axios.create({
    baseURL: BASE_URL,
});

const { jwt } = getClientJwt();

axiosClient.defaults.headers["Cache-Control"] = "no-cache";
axiosClient.defaults.headers["Pragma"] = "no-cache";
axiosClient.defaults.headers["Expires"] = "0";

if (jwt) {
    setAPIToken(axiosClient, jwt.accessToken);
    setRefreshTokenInterceptor({ apiInstance: axiosClient });
}

export const CLIENT_API = createApi(axiosClient);
