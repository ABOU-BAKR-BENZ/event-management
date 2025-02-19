import "./GuestLayout.css";
import { NavBar } from "../../Sections/index";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default GuestLayout;
