import React, { useState } from "react";
import styles from "../css/CalendarBoxSmall.module.css";
import { leftS, rightS } from "../helper/Icons";
import RenderCalendar from "../helper/RenderCalender";
import {
  handleNextMonth,
  handlePrevMonthRestrict,
} from "../helper/handleMonths";

export const Calendar = ({ handleData, handleDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className={styles.calendarBox}>
      <div className={styles.calendarHeader}>
        {currentDate.getMonth() !== new Date().getMonth() ? (
          <div
            className={styles.iconBtn}
            onClick={() => handlePrevMonthRestrict(currentDate, setCurrentDate)}
          >
            {leftS}
          </div>
        ) : (
          <div></div>
        )}

        <h2>{`${currentDate
          .toLocaleString("default", {
            month: "long",
          })
          .substring(0, 3)} ${currentDate.getFullYear()}`}</h2>

        <div
          className={styles.iconBtn}
          onClick={() => handleNextMonth(currentDate, setCurrentDate)}
        >
          {rightS}
        </div>
      </div>

      <div className={styles.calendarBody}>
        <div className={styles.calendarDays}>
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className={styles.calendarDates}>
          <RenderCalendar
            date={currentDate}
            handleDateClick={handleDateClick}
          />
        </div>
      </div>
    </div>
  );
};
