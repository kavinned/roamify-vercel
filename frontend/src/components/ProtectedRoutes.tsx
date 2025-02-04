import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";
import Loader from "./Loader";

export default function ProtectedRoutes() {
    const { isAuth, status } = useAppSelector((state) => state.auth);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (!isAuth && status !== "loading") {
            timeoutId = setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isAuth, status]);

    if (status === "loading" || status === "idle") {
        return <Loader />;
    }

    if (!isAuth && status === "failed") {
        return (
            <div className="flex flex-col gap-5 w-screen h-screen z-50 items-center justify-center md:text-3xl text-xl">
                <p>Unauthorized. Redirecting to login...</p>
                <div
                    className="animate-spin inline-block md:size-6 size-10 border-8 md:border-4 border-current border-t-transparent text-red-600 rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return <Outlet />;
}
