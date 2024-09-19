import { ProtectedRoute } from "@/components/router/ProtectedRoute";

export default function ProtectedPage() {
    return (
        <>
            <h1 className="my-6 text-2xl font-medium leading-10 text-gray-950">
                Protected page demo
            </h1>
            <ProtectedRoute
                onAuthenticated={() => <h1>Authentication's valid!</h1>}
            />
        </>
    );
}

export const metadata = {
    title: "Protected",
};
