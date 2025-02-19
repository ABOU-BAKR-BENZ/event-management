import "./DefaultLayout.css";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../Context/ContextProvider";
import { NavBar } from "../../Sections";

const DefaultLayout = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/Connexion" />;
    }

    return (
        <>
            <NavBar />
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default DefaultLayout;
