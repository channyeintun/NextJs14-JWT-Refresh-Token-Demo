"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";

nProgress.configure({ showSpinner: true });

export const NProgressBar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const url = `${pathname}?${searchParams}`;

    useEffect(() => {
        const handleClick = (event) => {
            const ANCHOR = "a";
            const target = event.target.closest(ANCHOR);

            if (target && isSameOrigin(target.origin)) {
                if (
                    target.target === "_blank" ||
                    target.rel === "noopener noreferrer" ||
                    event.ctrlKey ||
                    event.metaKey
                ) {
                    return;
                }

                const targetPathName = target.pathname;
                targetPathName !== pathname && nProgress.start();
            }
        };

        document.addEventListener("click", handleClick);

        return () => document.removeEventListener("click", handleClick);
    }, [pathname]);

    useEffect(() => {
        nProgress.done();
    }, [url]);

    return;
};

const isSameOrigin = (origin) =>
    window && window.location.origin.includes(origin);
