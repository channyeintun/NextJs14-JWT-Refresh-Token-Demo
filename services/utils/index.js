import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export function isEmptyObj(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getErrorMessage(error) {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.Response?.msg ||
        error?.message
    );
}
