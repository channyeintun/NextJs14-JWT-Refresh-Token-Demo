"use client";

import { usePathname, useRouter } from "next/navigation";

import useAuthStore from "@/states/zustand/auth";
import { removeAPIToken, getJwtClient, axiosClient } from "@/services";
import Link from "next/link";

export const UserMenu = () => {
    const pathname = usePathname();

    const router = useRouter();

    const { removeJwt: removeJwtFromCookie } = getJwtClient();

    const { jwt, removeJwt: removeJwtFromStore } = useAuthStore();

    const handleLogout = () => {
        // call logout api here if need
        axiosClient.interceptors.response.clear();
        removeJwtFromStore();
        removeJwtFromCookie();
        removeAPIToken(axiosClient);
        if (pathname !== "/") {
            router.push("/");
        } else {
            router.refresh();
        }
    };

    return (
        jwt &&
        jwt.accessToken && (
            <div className="flex gap-4">
                <Link href="/protected">protected</Link>
                <button onClick={handleLogout}>logout</button>
            </div>
        )
    );
};
