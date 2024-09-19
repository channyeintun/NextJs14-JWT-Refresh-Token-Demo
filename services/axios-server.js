import axios from "axios";
import { createApi } from "./createApi";
import { BASE_URL } from "./baseUrl";

export const axiosServer = axios.create({
    baseURL: BASE_URL,
});

export const SERVER_API = createApi(axiosServer);
