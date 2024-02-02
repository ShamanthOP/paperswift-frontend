import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar";

const RootLayout = () => {
    const { key } = useAuth();

    if (!key) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
