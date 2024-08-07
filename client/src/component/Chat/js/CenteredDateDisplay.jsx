import React, { useState, useEffect } from "react";

function formatDate(date) {
  const currentDate = new Date();
  const messageDate = new Date(date);

  if (
    currentDate.getDate() === messageDate.getDate() &&
    currentDate.getMonth() === messageDate.getMonth() &&
    currentDate.getFullYear() === messageDate.getFullYear()
  ) {
    return "Today";
  }

  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  if (
    yesterday.getDate() === messageDate.getDate() &&
    yesterday.getMonth() === messageDate.getMonth() &&
    yesterday.getFullYear() === messageDate.getFullYear()
  ) {
    return "Yesterday";
  }

  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    messageDate
  );

  return formattedDate;
}

const CenteredDateDisplay = ({ newDate }) => {
  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    if (newDate) {
      const formatted = formatDate(newDate);
      setDisplayDate(formatted);

      // Clear the displayed date after a certain duration (e.g., 3 seconds)
      const timeoutId = setTimeout(() => {
        setDisplayDate(formatted);
      }, 3000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [newDate]);

  return displayDate ? (
    <div
      style={{
        display : "flex",
        justifyContent : "center",
        fontSize: "0.9em",
        margin: "15px 0", 
      }}
    >
      <p
      style={{
        backgroundColor: "var(--colorGray1)", 
        padding: "5px 15px", 
        borderRadius: "8px",
        fontWeight: "var(--boldL2)",
      }}
      >{displayDate}</p>
    </div>
  ) : null;
};

export default CenteredDateDisplay;
