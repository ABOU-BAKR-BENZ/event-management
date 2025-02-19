import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { NavItem, NavLinkRoute, PrimaryBtn } from "../../Components/index";
import logo from "../../Assets/Images/Logo.png";
import { useEffect } from "react";
import { useStateContext } from "../../Context/ContextProvider";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../API/axios-client";

const NavBar = () => {
    const { token, userRole, setUser, setUserRole, setToken } =
        useStateContext();
    console.log(userRole === "admin");

    useEffect(() => {
        let lastScrollPosition: number = 0;
        const transNavBar = document.querySelector(".navbar");

        const scrollListener = () => {
            lastScrollPosition = window.scrollY;

            if (lastScrollPosition > 20) {
                transNavBar?.classList.add("bg-light");
            } else {
                transNavBar?.classList.remove("bg-light");
            }
        };

        if (transNavBar) {
            window.addEventListener("scroll", scrollListener);
        }

        return () => {
            window.removeEventListener("scroll", scrollListener);
        };
    }, []);

    const Logout = async (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        axiosClient
            .post("/logout")
            .then((response) => {
                toast.success(String(response.data.message), {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        width: "165%",
                        fontWeight: "700",
                        color: "#000",
                    },
                });
                setTimeout(() => {
                    setUser("");
                    setUserRole("");
                    setToken(null);
                }, 2000);
            })
            .catch((error) => {
                toast.error(String(error.response.data.data[1]), {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        width: "165%",
                        fontWeight: "700",
                        color: "#000",
                    },
                });
            });
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container-fluid">
                    <Link to={"/"}>
                        <img
                            src={logo}
                            className="navbar-brand ms-5 brand-logo"
                            alt="Platform Logo"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="navbar-collapse collapse"
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav">
                            <NavItem direction="/Home">Home</NavItem>
                            {userRole === "admin" ? (
                                <NavLinkRoute direction="/dashboard">
                                    Dashboard
                                </NavLinkRoute>
                            ) : null}
                            {token ? (
                                <a
                                    onClick={Logout}
                                    className="btn btn-outline-danger ms-5 fw-bold"
                                    href="/logout"
                                >
                                    Log out
                                </a>
                            ) : (
                                <NavLinkRoute direction="/Connection">
                                    Sign In
                                </NavLinkRoute>
                            )}
                            <div className="package-track">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/Events"
                                >
                                    <PrimaryBtn>All the events</PrimaryBtn>
                                </NavLink>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
