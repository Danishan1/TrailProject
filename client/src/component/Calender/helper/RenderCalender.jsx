import { useState } from "react";
import styles from "../css/CalendarBoxSmall.module.css";
export const RenderCalendar = ({ date, handleDateClick }) => {
  const [clicked, setClicked] = useState(new Date());

  const calendarDates = [];
  const month = date.getMonth();
  const year = date.getFullYear();
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDates.push(
      <div key={`empty-${i}`} className={styles.emptyBox}></div>
    );
  }

  const formateDate = (date) =>
    `${date.getDate().toString().padStart(2, "0")}-${date
      .getMonth()
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

  for (let i = 1; i <= lastDate; i++) {
    const cellDate = new Date(year, month, i);
    const isCurrentDate = cellDate.toDateString() === today.toDateString();
    const isBeforeCurrentDate = cellDate < today;
    const isAfterCurrentDate = cellDate > today;
    const isClicked = cellDate.toDateString() === clicked.toDateString();

    calendarDates.push(
      <div
        key={i}
        className={`${styles.contentBox} ${
          isClicked ? styles.currentDate : ""
        } ${
          isBeforeCurrentDate && !isCurrentDate ? styles.beforeCurDate : ""
        } ${isAfterCurrentDate || isCurrentDate ? styles.afterCurDate : ""}`}
        onClick={
          isAfterCurrentDate || isCurrentDate
            ? () => {
                handleDateClick(formateDate(cellDate));
                setClicked(cellDate);
              }
            : undefined
        }
      >
        {i}
      </div>
    );
  }

  return <>{calendarDates}</>;
};

export default RenderCalendar;
