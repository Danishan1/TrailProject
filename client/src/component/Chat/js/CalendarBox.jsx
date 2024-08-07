import React, { useState } from "react";
import styles from "../css/CalendarBox.module.css";
import { left, right } from "../helper/PlusButtonIcons";

export const CalendarBox = ({ handleData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalendar = (date) => {
    const calendarDates = [];
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarDates.push(
        <div key={`empty-${i}`} className={styles.emptyBox}></div>
      );
    }

    for (let i = 1; i <= lastDate; i++) {
      const isCurrentDate =
        i === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      calendarDates.push(
        <div
          key={i}
          className={isCurrentDate ? styles.currentDate : styles.contentBox}
        >
          {i}
        </div>
      );
    }

    return calendarDates;
  };

  const handlePrevMonth = () => {
    const prevMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevMonthDate);
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonthDate);
  };

  return (
    <div className={styles.calendarBox}>
      <div className={styles.calendarHeader}>
        <div className={styles.iconBtn} onClick={handlePrevMonth}>
          {left}
        </div>

        <h2>{`${currentDate.toLocaleString("default", {
          month: "long",
        })} ${currentDate.getFullYear()}`}</h2>

        <div className={styles.iconBtn} onClick={handleNextMonth}>
          {right}
        </div>
      </div>

      <div className={styles.calendarBody}>
        <div className={styles.calendarDays}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={styles.calendarDates}>
          {renderCalendar(currentDate)}
        </div>
      </div>
    </div>
  );
};
