"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "@mantine/form";
import nProgress from "nprogress";

import {
    setAPIToken,
    setRefreshTokenInterceptor,
    CLIENT_API,
    axiosClient,
    getJwtClient,
} from "@/services";
import useAuthStore from "@/states/zustand/auth";

export default function LoginForm() {
    const router = useRouter();

    const { setJwt } = useAuthStore();
    const { setJwt: setJwtIntoCookie } = getJwtClient();

    const form = useForm({
        initialValues: {
            mobileNumber: "",
            password: "",
        },
    });

    const [error, setError] = useState();

    const submitLogin = async (values) => {
        nProgress.start();

        const data = await CLIENT_API.signIn(values).catch((error) => {
            nProgress.done();
            if ("response" in error) {
                setError(error.response.data.message);
            }
        });
        if (data && data.accessToken) {
            await setJwtIntoCookie(data);
            setJwt(data);
            setAPIToken(axiosClient, data.accessToken);
            setRefreshTokenInterceptor({
                apiInstance: axiosClient,
            });
            nProgress.done();
            router.push("/");
        }
    };

    return (
        <>
            <p className="my-3 text-red-500">{error}</p>
            <form
                onSubmit={form.onSubmit(submitLogin)}
                className="flex flex-col gap-4"
            >
                <input
                    type="text"
                    size="lg"
                    className="placeholder:text-medium grow text-base leading-5 placeholder:text-base placeholder:text-gray-500"
                    placeholder="Mobile Number"
                    radius={8}
                    {...form.getInputProps("mobileNumber")}
                />
                <input
                    className="placeholder:text-medium grow text-base leading-5 placeholder:text-base placeholder:text-gray-500"
                    type="password"
                    size="lg"
                    placeholder="Password"
                    radius={8}
                    {...form.getInputProps("password")}
                />
                <button
                    disabled={
                        !(form.values.mobileNumber && form.values.password)
                    }
                    radius={8}
                    size="lg"
                    className="w-full bg-gray-950 text-base font-medium leading-5 text-white hover:bg-gray-900 disabled:bg-gray-600"
                    type="submit"
                    variant="filled"
                    color="gray.12"
                >
                    Login
                </button>
            </form>
        </>
    );
}
