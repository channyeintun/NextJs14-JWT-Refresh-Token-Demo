import { getErrorMessage } from "@/services";
import { useEffect, useState } from "react";

export default function useFetch(fetcher, initial = false) {
    const [loading, setLoading] = useState(initial);

    const [data, setData] = useState();

    const [error, setError] = useState();

    useEffect(() => {
        (async () => {
            if (initial) {
                try {
                    const data = await fetcher();
                    setData(data);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setData(undefined);
                    setError(getErrorMessage(err));
                    setLoading(false);
                }
            }
        })();
    }, [initial]);

    const reset = () => {
        setData(undefined);
        setError(undefined);
    };

    const trigger = async (...args) => {
        setError(undefined);
        setLoading(true);
        return fetcher(...args)
            .then((data) => {
                setData(data);
                setLoading(false);
                return data;
            })
            .catch((err) => {
                console.error(err);
                setData(undefined);
                setError(getErrorMessage(err));
                setLoading(false);
            });
    };

    return {
        loading,
        error,
        data,
        trigger,
        reset,
    };
}
