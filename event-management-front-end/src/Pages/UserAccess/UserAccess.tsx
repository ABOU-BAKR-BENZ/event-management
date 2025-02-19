import { useEffect, useState } from "react";
import "./UserAccess.css";
import { SignUp, LogIn, OverlaySec } from "../../Sections/index";
import { useStateContext } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const UserAccess = () => {
    const { token } = useStateContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };
    const containerClass = isSignUpActive
        ? "AccessContainer right-panel-active"
        : "AccessContainer";

    return (
        <div className={containerClass} id="AccessContainer">
            <SignUp />
            <LogIn />
            <div className="overlay-container">
                <div className="overlay">
                    <OverlaySec
                        title="Welcome back!"
                        paragraph="To stay connected, please log in with your personal information."
                        handleFunc={handleSignInClick}
                        btnText="Log In"
                        classesToAdd="overlay-left"
                    />
                    <OverlaySec
                        title="Hello, There"
                        paragraph="Sign up by providing your personal details."
                        handleFunc={handleSignUpClick}
                        btnText="Sign Up"
                        classesToAdd="overlay-right"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserAccess;
