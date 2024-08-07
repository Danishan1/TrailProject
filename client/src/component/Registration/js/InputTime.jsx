import React, { useState } from "react";
import styles from "../css/InputTime.module.css";
import CustomDropdown from "../helper/CustomDropdown";

const TimeInput = ({ label, onTimeChange }) => {
  const [hours, setHours] = useState("--");
  const [minutes, setMinutes] = useState("--");
  const [period, setPeriod] = useState("--");

  const handleHoursChange = (value) => {
    setHours(value);
    notifyTimeChange(value, minutes, period);
  };

  const handleMinutesChange = (value) => {
    setMinutes(value);
    notifyTimeChange(hours, value, period);
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
    notifyTimeChange(hours, minutes, value);
  };

  const notifyTimeChange = (hours, minutes, period) => {
    if (hours !== "--" && minutes !== "--" && period !== "--") {
      const formattedTime = `${hours}:${minutes} ${period}`;
      onTimeChange(formattedTime);
    }
  };

  const hoursOptions = [...Array(12).keys()].map((h) =>
    String(h + 1).padStart(2, "0")
  );
  const minutesOptions = [...Array(60).keys()].map((m) =>
    String(m).padStart(2, "0")
  );
  const periodOptions = ["AM", "PM"];

  return (
    <div className={styles.timeInputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.timeSelectors}>
        <CustomDropdown
          options={hoursOptions}
          value={hours}
          onChange={handleHoursChange}
        />
        <span>
          <b>:</b>
        </span>
        <CustomDropdown
          options={minutesOptions}
          value={minutes}
          onChange={handleMinutesChange}
        />
        <CustomDropdown
          options={periodOptions}
          value={period}
          onChange={handlePeriodChange}
        />
      </div>
    </div>
  );
};

export default TimeInput;
