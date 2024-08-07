import React, { useEffect, useState } from "react";
import style from "../css/Alert.module.css";

const Alert = ({ message, type, onDismiss }) => {
  const TIME_LIMIT = 10; // Adjusted to 10 seconds for clarity
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [width, setwidth] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, TIME_LIMIT * 100);

    setwidth((timeLeft * 100) / TIME_LIMIT);

    if (width <= -10) {
      onDismiss();
    }
    return () => clearInterval(timer);
  }, [timeLeft, onDismiss, width, setwidth]);

  return (
    <div className={`${style.alert} ${style[type]}`}>
      {message}
      <div className={style.statusBar} style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default Alert;
