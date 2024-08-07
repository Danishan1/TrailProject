import React from "react";
import style from "../css/InputField.module.css";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className={style.inputField}>
      <input
        type={type}
        placeholder={label}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        title=""
      />
      {required ? <p className={style.required}>*</p> : <></>}
      <span className={style.tooltip}>{label}</span>
    </div>
  );
};

export default InputField;

/*

<InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required={true}
      />



*/
