import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import style from "../css/RegisterForm.module.css";
import Loading from "../../SpecialPages/js/Loading";
import { Button } from "./Button";
import { validateEmail, validateMobile } from "../helper/Validation";
import axios from "axios";

export const FormSection1 = ({
  setFormData,
  formData,
  showAlert,
  setFormFillStep,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGetOTP = async (type, purpose, userName, verificationId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/getOTP",
        {
          type,
          purpose,
          userName,
          verificationId,
        }
      );

      if (response.data.code === "INFO01" || response.data.code === "ERR01") {
        showAlert(response.data.message, "error");
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      showAlert("Failed to send OTP. Please try again.", "error");
      return false;
    }
  };

  const move2Section2 = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!validateEmail(formData.email)) {
      showAlert("Invalid email format.", "error");
      isValid = false;
    }

    if (!validateMobile(formData.mobile)) {
      showAlert("Invalid mobile number. Must be 10 digits.", "error");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    // OTP for Email Verification
    isValid = await handleGetOTP(
      "email",
      "verification",
      formData.name,
      formData.email
    );

    if (!isValid) {
      setLoading(false);
      return;
    }

    // OTP for Mobile Verification
    isValid = await handleGetOTP(
      "mobile",
      "verification",
      formData.name,
      formData.email
    );

    if (!isValid) {
      setLoading(false);
      return;
    }

    setLoading(false);

    showAlert("Great, Let's verify your details...", "success");
    setFormFillStep(1);
  };

  if (loading) return <Loading position="absolute" />;

  return (
    <div className={style.formSection}>
      <p className="colorCyan boldL2" style={{ textAlign: "center" }}>
        Welcome to Registration Page
      </p>
      <InputField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required={true}
      />
      <InputField
        label="Mobile"
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required={true}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required={true}
      />
      <InputField
        label="Designation"
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
      />
      <div className={style.btnRapper}>
        <Button text={"Verify Details"} onClick={move2Section2} />
        <Button text={"Login"} onClick={() => navigate("/login")} />
      </div>
    </div>
  );
};
