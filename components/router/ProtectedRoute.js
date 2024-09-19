import { getJwtServer } from "@/services/getJwtServer";
import { AccessDenied } from "../AccessDenied";

const ProtectedRoute = ({ onAuthenticated }) => {
    const { jwt } = getJwtServer();

    if (onAuthenticated) {
        if (jwt) {
            return onAuthenticated(jwt);
        }

        return <AccessDenied />;
    }

    return (
        <div className="grid min-h-[300px] w-full place-items-center">
            <h1>No Data</h1>
        </div>
    );
};

export { ProtectedRoute };
