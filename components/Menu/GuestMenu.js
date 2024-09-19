import Link from "next/link";
import useAuthStore from "@/states/zustand/auth";
import { isEmptyObj } from "@/services";

export const GuestMenu = () => {
    const { jwt } = useAuthStore();

    const isNoJwt = jwt === undefined || jwt === null || isEmptyObj(jwt);

    return isNoJwt && <Link href="/login">Login</Link>;
};
