import React, { useEffect } from "react";

import style from "../css/RegisterForm.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const FormSection3 = ({ formData, showAlert }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("formData");
    localStorage.removeItem("formFillStep");
  }, []);

  const handleSubmit = (name) => {
    showAlert(`Register Successfully, ${name}. Kindly Login now`, "success");
    navigate("/discuss");
  };

  return (
    <div className={style.formSection}>
      <p className={style.userIdNote}>
        <span className="colorRed boldL2">Note: </span>Keep your{" "}
        <span className="boldL2">User ID & Passcode </span>
        in a secure place, as it is required for login and cannot be
        regenerated.
      </p>
      <p className={style.userId}>
        <span className="colorCyan boldL2">User ID: </span>
        {formData.userId}
      </p>

      <p className={style.userId}>
        <span className="colorCyan boldL2">Passcode: </span>
        {formData.passcode}
      </p>

      <div className={style.btnRapper}>
        <Button
          text={"Let's Login"}
          onClick={() => handleSubmit(formData.name)}
        />
      </div>
    </div>
  );
};
