import React, { useState, useEffect, useRef } from "react";
import styles from "../css/CustomDropdown.module.css";

const CustomDropdown = ({ options, value, onChange, specialStyle = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAbove, setIsAbove] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (dropdownRect.bottom + 150 > windowHeight) {
      setIsAbove(true);
    } else {
      setIsAbove(false);
    }

    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef} style={specialStyle}>
      <div className={styles.dropdownSelected} onClick={toggleDropdown}>
        {value}
      </div>
      {isOpen && (
        <div
          className={`${styles.dropdownOptions} ${isAbove ? styles.above : ""}`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
