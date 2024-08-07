import React, { useState } from "react";
import style from "../css/PasswordField.module.css";

const PasswordField = ({ name, value, onChange, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    onChange(e);
    validatePasswordStrength(value);
  };

  const validatePasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength) {
      setPasswordStrength("Short");
    } else if (
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setPasswordStrength("Weak");
    } else if (password.length >= 6 && password.length < 10) {
      setPasswordStrength("Medium");
    } else if (password.length >= 10) {
      setPasswordStrength("Strong");
    }
  };

  const showPasswordIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={style.passwordIcon}
      onClick={() => setShowPassword(true)}
    >
      <path
        className={style.passwordIcon}
        fill="currentColor"
        d="M2.984 8.625v.003a.5.5 0 0 1-.612.355c-.431-.114-.355-.611-.355-.611l.018-.062s.026-.084.047-.145a6.7 6.7 0 0 1 1.117-1.982C4.096 5.089 5.605 4 8 4s3.904 1.089 4.802 2.183a6.7 6.7 0 0 1 1.117 1.982a4 4 0 0 1 .06.187l.003.013v.004l.001.002a.5.5 0 0 1-.966.258l-.001-.004l-.008-.025l-.035-.109a5.7 5.7 0 0 0-.945-1.674C11.286 5.912 10.045 5 8 5s-3.285.912-4.028 1.817a5.7 5.7 0 0 0-.945 1.674l-.035.109zM5.5 9.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"
      />
    </svg>
  );

  const hidePasswordIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={style.passwordIcon}
      onClick={() => setShowPassword(false)}
    >
      <path
        className={style.passwordIcon}
        fill="currentColor"
        d="M2.22 2.22a.75.75 0 0 0-.073.976l.073.084l4.034 4.035a10 10 0 0 0-3.955 5.75a.75.75 0 0 0 1.455.364a8.5 8.5 0 0 1 3.58-5.034l1.81 1.81A4 4 0 0 0 14.8 15.86l5.919 5.92a.75.75 0 0 0 1.133-.977l-.073-.084l-6.113-6.114l.001-.002l-6.95-6.946l.002-.002l-1.133-1.13L3.28 2.22a.75.75 0 0 0-1.06 0M12 5.5c-1 0-1.97.148-2.889.425l1.237 1.236a8.503 8.503 0 0 1 9.899 6.272a.75.75 0 0 0 1.455-.363A10 10 0 0 0 12 5.5m.195 3.51l3.801 3.8a4.003 4.003 0 0 0-3.801-3.8"
      />
    </svg>
  );

  return (
    <div className={style.passwordInput}>
      <div className={style.inputContainer}>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={handlePasswordChange}
          className={style.formControl}
          placeholder={placeholder}
        />
        {showPassword ? hidePasswordIcon : showPasswordIcon}
      </div>
      {passwordStrength && (
        <p className={`${style.strength} ${style[passwordStrength]}`}>
          {passwordStrength === "Weak"
            ? "It Must have Uppercase, Lowercase, Numbers & Special Characters"
            : passwordStrength}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
