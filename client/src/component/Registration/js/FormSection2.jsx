import React, { useState, useEffect } from "react";
import style from "../css/RegisterForm.module.css";
import { Button } from "./Button";
import OtpField from "./OtpField";
import axios from "axios";
import Loading from "../../SpecialPages/js/Loading";

export const FormSection2 = ({
  formData,
  setFormData,
  showAlert,
  setFormFillStep,
}) => {
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileErrorShown, setMobileErrorShown] = useState(false);
  const [emailErrorShown, setEmailErrorShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  useEffect(() => {
    setMobileErrorShown(false);
  }, [mobileOtp]);

  useEffect(() => {
    setEmailErrorShown(false);
  }, [emailOtp]);

  const verifyOTP = async (otp, type, verificationId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verifyOTP",
        {
          otp,
          type,
          verificationId,
        }
      );

      return response.data.isValid;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...formData,
        }
      );

      if (response.data.code === "SUCC") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          userId: response.data.userId,
          passcode: response.data.password,
        }));
        showAlert("Registration Successful!", "success");
        setFormFillStep(2);
      }
    } catch (error) {
      console.log(error);
      showAlert("Registration Failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  const move2Section3 = async (e) => {
    e.preventDefault();
    if (mobileVerified && emailVerified) {
      setLoading(true); // Set loading state to true
      await register(); // Register user
    } else {
      if (!mobileVerified && !emailVerified)
        showAlert("Please verify both Mobile and Email OTPs.", "error");
      else if (!mobileVerified) showAlert("Please verify Mobile OTP.", "error");
      else showAlert("Please verify Email OTP.", "error");
    }
  };

  const handleMobileChange = async (otp) => {
    setMobileOtp(otp);
    const isVerified = await verifyOTP(otp, "mobile", formData.email);
    if (isVerified) {
      if (!mobileVerified) {
        showAlert("Mobile OTP verified successfully!", "success");
        setMobileVerified(true);
        setMobileErrorShown(false);
      }
    } else if (!mobileErrorShown) {
      showAlert("Wrong Mobile OTP!", "error");
      setMobileVerified(false);
      setMobileErrorShown(true);
    }
  };

  const handleEmailChange = async (otp) => {
    setEmailOtp(otp);
    const isVerified = await verifyOTP(otp, "email", formData.email);
    if (isVerified) {
      if (!emailVerified) {
        showAlert("Email OTP verified successfully!", "success");
        setEmailVerified(true);
        setEmailErrorShown(false);
      }
    } else if (!emailErrorShown) {
      showAlert("Wrong Email OTP!", "error");
      setEmailVerified(false);
      setEmailErrorShown(true);
    }
  };

  if (loading) return <Loading position="absolute" />;

  return (
    <div className={`${style.formSection} ${style.formSection2}`}>
      <p className="colorCyan boldL2" style={{ textAlign: "center" }}>
        Verify Your Mobile & Email ID
      </p>
      <div>
        {!mobileVerified && (
          <p>
            <span className="colorCyan boldL2">Verify Mobile No : </span>
            {formData.mobile}
          </p>
        )}
        {!mobileVerified ? (
          <OtpField onChange={handleMobileChange} />
        ) : (
          <p className="colorBlue">Mobile OTP Verified.</p>
        )}
      </div>
      <div>
        {!emailVerified && (
          <p>
            <span className="colorCyan boldL2">Verify Email: </span>
            {formData.email}
          </p>
        )}
        {!emailVerified ? (
          <OtpField onChange={handleEmailChange} />
        ) : (
          <p className="colorBlue">Email OTP Verified.</p>
        )}
      </div>
      <div className={style.btnRapper}>
        <Button text={"Generate ID & Passcode"} onClick={move2Section3} />
      </div>
    </div>
  );
};
