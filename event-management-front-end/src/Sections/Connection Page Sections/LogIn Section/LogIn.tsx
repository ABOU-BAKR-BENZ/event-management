import "./LogIn.css";
import { FormInput, SecondaryBtn } from "../../../Components/index";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../../API/axios-client";
import { useStateContext } from "../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const LogIn = () => {
    const [formData] = useState<FormData>(() => {
        const initialFormData = new FormData();
        initialFormData.append("emal", "");
        initialFormData.append("password", "");
        return initialFormData;
    });
    const { setUser, setToken, setUserRole } = useStateContext();
    const [notRobot, setNotRobot] = useState<boolean>(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const SignUpBtn: HTMLDivElement | null =
            document.querySelector(".SecondaryBtn");
        const SignUpSec: HTMLDivElement | null =
            document.querySelector(".sign-up-container");
        if (SignUpBtn && SignUpSec) {
            SignUpBtn?.addEventListener("click", () => {
                SignUpSec.style.zIndex = "2";
            });
        }
    }, []);
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        identifier: string
    ) => {
        formData.set(identifier, event.target.value);
    };

    const changeReCAPTCHA = () => {
        setNotRobot(true);
    };

    const expireReCAPTCHA = () => {
        setNotRobot(false);
    };

    const formSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!notRobot) {
            toast.error("Kindly verify the reCAPTCHA to proceed.", {
                position: "top-left",
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
            return;
        }
        await axiosClient
            .post("/login", formData)
            .then((response) => {
                setToken(response.data.data.token);
                setUser(response.data.data.user_name);
                setUserRole(response.data.data.user_role);
                console.log(response);
                toast.success(String(response.data.message), {
                    position: "top-left",
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
            })
            .catch((error) => {
                if (Object.keys(error.response.data.data).length > 0) {
                    Object.values(error.response.data.data).forEach((error) => {
                        toast.error(String(error), {
                            position: "top-left",
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
                                marginTop: "3rem",
                            },
                        });
                    });
                }
                if (recaptchaRef.current) {
                    expireReCAPTCHA();
                    recaptchaRef.current.reset();
                }
            });
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={formSubmission}>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <h1>Sign In</h1>
                <FormInput
                    type="email"
                    forAttr="email"
                    title=""
                    placeholder="Email"
                    width="20rem"
                    height="3rem"
                    changeFunc={(e) => handleInputChange(e, "email")}
                />
                <FormInput
                    type="password"
                    forAttr="password"
                    title=""
                    placeholder="Password"
                    width="20rem"
                    height="3rem"
                    changeFunc={(e) => handleInputChange(e, "password")}
                />
                <button type="submit" className="mt-5">
                    Sign In
                </button>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Ldz7z8pAAAAAFOBkjO8zzCiQdq3jo2t7enDeI1w"
                    onChange={changeReCAPTCHA}
                    onExpired={expireReCAPTCHA}
                    className="mt-3 recaptcha"
                />
                <div className="line"></div>
                <SecondaryBtn>Sign Up</SecondaryBtn>
            </form>
        </div>
    );
};

export default LogIn;
