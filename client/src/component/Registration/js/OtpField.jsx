import React, { useState } from "react";
import style from "../css/OtpField.module.css";

const OtpField = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("Text").split("");
    if (data.length === length) {
      setOtp([...data]);
      onChange(data.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
      } else if (e.target.previousSibling) {
        e.target.previousSibling.focus();
        setOtp([...otp.map((d, idx) => (idx === index - 1 ? "" : d))]);
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  React.useEffect(() => {
    const myOtp = otp.join("");
    if (myOtp.length === length) onChange(myOtp);
  }, [otp, onChange, length]);

  return (
    <div className={style.otpInputContainer}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          className={style.otpInput}
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

export default OtpField;
