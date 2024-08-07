import React from "react";
import styles from "../css/Button.module.css";

////////////////////////////////////////////////////////////////
// Code : ABAB005
export const Button = ({ text, onClick, style = {} }) => {
  return (
    <>
      <div className={styles.btn} style={style} onClick={(e) => onClick(e)}>
        {text}
      </div>
    </>
  );
};
