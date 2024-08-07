export const handlePrevMonth = (currentDate, setCurrentDate) => {
  const prevMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  setCurrentDate(prevMonthDate);
};

export const handleNextMonth = (currentDate, setCurrentDate) => {
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  setCurrentDate(nextMonthDate);
};

export const handlePrevMonthRestrict = (currentDate, setCurrentDate) => {
    if (currentDate.getMonth() !== new Date().getMonth() || currentDate.getFullYear() !== new Date().getFullYear()) {
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      setCurrentDate(prevMonthDate);
    }
  };

export const handleNextMonthRestrict = (currentDate, setCurrentDate) => {
    if (currentDate.getMonth() !== new Date().getMonth() || currentDate.getFullYear() !== new Date().getFullYear()) {
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      setCurrentDate(prevMonthDate);
    }
  };