"use client";

import { ErrorMessage } from "@/components/ErrorMessage";

export default function Error({ error }) {
    return <ErrorMessage error={error} />;
}
