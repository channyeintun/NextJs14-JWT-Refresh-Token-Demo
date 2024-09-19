export function ErrorMessage({ error }) {
    return (
        <div className="w-100 grid h-80 place-items-center">
            <p className="text-md m-0 w-full p-0 text-center font-medium text-gray-600 first-letter:capitalize">
                {typeof error === "string"
                    ? error
                    : error && "message" in error
                      ? error.message
                      : "Unknown error occurred."}
            </p>
        </div>
    );
}
