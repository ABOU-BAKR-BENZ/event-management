import "./SignUp.css";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../Context/ContextProvider";
import axiosClient from "../../../API/axios-client";
import { FormInput } from "../../../Components/index";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData] = useState<FormData>(() => {
        const initialFormData = new FormData();
        initialFormData.append("name", "");
        initialFormData.append("email", "");
        initialFormData.append("password", "");
        initialFormData.append("password_confirmation", "");
        return initialFormData;
    });
    const [validationErrors, setValidationErrors] = useState<{
        [key: string]: string;
    }>({});
    const { setUser, setToken, setUserRole } = useStateContext();

    useEffect(() => {
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).forEach((error) => {
                toast.error(error, {
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
            });
        }
    }, [validationErrors]);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        identifier: string
    ) => {
        formData.set(identifier, event.target.value);
    };

    const formSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newValidationErrors: { [key: string]: string } = {};

        if (
            !formData.get("name") ||
            formData.get("name")!.toString().length > 30
        ) {
            newValidationErrors.name =
                "First name is required and must be at most 30 characters.";
        }

        if (
            !formData.get("email") ||
            !/^\S+@\S+\.\S+$/.test(formData.get("email")!.toString())
        ) {
            newValidationErrors.email = "Valid email is required.";
        }

        if (
            !formData.get("password") ||
            formData.get("password")!.toString().length < 8
        ) {
            newValidationErrors.password =
                "Password is required and must be at least 8 characters.";
        }

        if (
            !formData.get("password_confirmation") ||
            formData.get("password") !== formData.get("password_confirmation")
        ) {
            newValidationErrors.password_confirmation =
                "Passwords do not match.";
        }

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
        } else {
            setValidationErrors({});
            await axiosClient
                .post("/signup", formData)
                .then((response) => {
                    setToken(response.data.data.access_token);
                    setUser(response.data.data.user_name);
                    setUserRole(response.data.data.user_role);
                    // navigate("/dashboard");
                })
                .catch((error) => {
                    if (Object.keys(error.response.data.data).length > 0) {
                        Object.values(error.response.data.data).forEach(
                            (error) => {
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
                                    },
                                });
                            }
                        );
                        // }
                    }
                });
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form
                onSubmit={formSubmission}
                method="post"
                encType="multipart/form-data"
            >
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
                <h1>Create New Account</h1>
                <FormInput
                    type="text"
                    forAttr="name"
                    title=""
                    width="29rem"
                    height="3rem"
                    placeholder="Full name"
                    changeFunc={(e) => handleInputChange(e, "name")}
                />
                <FormInput
                    type="email"
                    forAttr="email"
                    title=""
                    placeholder="E-mail"
                    width="29rem"
                    height="3rem"
                    changeFunc={(e) => handleInputChange(e, "email")}
                />

                <FormInput
                    type="password"
                    forAttr="password"
                    title=""
                    placeholder="Password"
                    width="29rem"
                    height="3rem"
                    changeFunc={(e) => handleInputChange(e, "password")}
                />
                <FormInput
                    type="password"
                    forAttr="password_confirmation"
                    title=""
                    placeholder="Confirm your password"
                    width="29rem"
                    height="3rem"
                    changeFunc={(e) =>
                        handleInputChange(e, "password_confirmation")
                    }
                />
                <button type="submit" className="mt-5">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
