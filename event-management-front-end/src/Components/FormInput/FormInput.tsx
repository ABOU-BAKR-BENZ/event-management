import { ChangeEvent, useState } from "react";
import "./FormInput.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const FormInput = ({
    type,
    forAttr,
    title,
    placeholder,
    width,
    height,
    otherAttr,
    changeFunc,
}: {
    type: string;
    forAttr: string;
    title?: string;
    placeholder: string;
    width?: string;
    height?: string;
    otherAttr?: Record<string, any>;
    changeFunc?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
    const [showPassword, setShowPassword] = useState(true);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (changeFunc) {
            changeFunc(event);
        }
    };
    return (
        <div className="formInput-Container">
            <label htmlFor={forAttr} className="form-label">
                {title}
            </label>
            <div className="Input-content">
                <input
                    {...(type === "tel"
                        ? { pattern: "^(07|05|06)\\d{8}", maxLength: 10 }
                        : {})}
                    {...(forAttr === "tracking_number"
                        ? {
                              pattern: "^BEX-[A-Za-z0-9]{6}$",
                              maxLength: 10,
                              minLength: 10,
                          }
                        : {})}
                    required
                    {...(type === "password"
                        ? { autoComplete: "off" }
                        : { autoComplete: "on" })}
                    {...otherAttr}
                    type={
                        type !== "password"
                            ? type
                            : showPassword
                            ? "password"
                            : "text"
                    }
                    className="form-control"
                    id={forAttr}
                    name={forAttr}
                    placeholder={placeholder}
                    style={{ width: `${width}`, height: `${height}` }}
                    onChange={(event) => handleChange(event)}
                />
                {type === "password" && (
                    <div
                        className="password-eye"
                        onClick={() =>
                            type === "password"
                                ? setShowPassword(!showPassword)
                                : null
                        }
                    >
                        {showPassword ? (
                            <FaEye className="password-eye-icon" />
                        ) : (
                            <FaEyeSlash className="password-eye-icon" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormInput;
