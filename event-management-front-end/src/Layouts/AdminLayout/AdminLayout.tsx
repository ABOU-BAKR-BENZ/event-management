import "./AdminLayout.css";
import { useStateContext } from "../../Context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../../Sections";

const AdminLayout = () => {
    const { token, userRole } = useStateContext();

    if (!token) {
        return <Navigate to="/Connexion" />;
    }

    if (userRole !== "admin") {
        return <Navigate to="/home" />;
    }
    return (
        <>
            <NavBar />
            <div className="AsidePackagesTable">
                <Outlet />
            </div>
        </>
    );
};

export default AdminLayout;
