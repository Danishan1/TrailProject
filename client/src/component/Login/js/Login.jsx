import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AlertContainer from "../../Registration/js/AlertContainer";
import style from "../css/Login.module.css";
import PasswordField from "./PasswordField";
import InputField from "../../Registration/js/InputField";
import { Button } from "../../Registration/js/Button";
import axios from "axios";

const LoginForm = () => {
  const [alertContainer, setAlertContainer] = useState([]);
  const navigate = useNavigate();

  const verifyDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { userID, password },
        { withCredentials: true }
      );
      if (response.data.code === "INVALID") {
        showAlert(
          "Invalid credentials. Please check your User ID & Password again or Register.",
          "error"
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const alertRef = useRef(null);
  const showAlert = (message, type) => {
    if (alertRef.current) {
      alertRef.current.addAlert(message, type);
    }
  };

  const [userID, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const isLogin = await verifyDetails();

    if (isLogin) {
      navigate("/discuss"); // Navigate to ChatApp page on successful login
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to Register page
  };

  return (
    <div className={style.formRapper}>
      <div className={style.userForm}>
        <AlertContainer
          ref={alertRef}
          setAlertContainer={setAlertContainer}
          alertContainer={alertContainer}
        />
        <form>
          <div className={style.formSection}>
            <p className="colorCyan boldL2" style={{ textAlign: "center" }}>
              Welcome to Login Page
            </p>
            <InputField
              label="User ID"
              type="text"
              name="userID"
              value={userID}
              onChange={(e) => setUserId(e.target.value)}
              required={true}
            />
            <PasswordField
              name={"password"}
              value={password}
              placeholder={"Pass Code"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={style.btnRapper}>
              <Button text={"Login"} onClick={handleLogin} />
              <Button text={"Register"} onClick={handleRegister} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
