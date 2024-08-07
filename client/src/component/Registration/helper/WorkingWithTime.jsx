export const convertTo24HourFormat = (time) => {
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }
  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

export const compareTimes = (startTime, endTime) => {
  const start = convertTo24HourFormat(startTime);
  const end = convertTo24HourFormat(endTime);

  const startTotalMinutes = start.hours * 60 + start.minutes;
  const endTotalMinutes = end.hours * 60 + end.minutes;

  return endTotalMinutes > startTotalMinutes;
};

export const calculateDuration = (startTime, endTime) => {
  const start = convertTo24HourFormat(startTime);
  const end = convertTo24HourFormat(endTime);

  const startTotalMinutes = start.hours * 60 + start.minutes;
  const endTotalMinutes = end.hours * 60 + end.minutes;

  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const durationHours = Math.floor(durationMinutes / 60);
  const durationRemainingMinutes = durationMinutes % 60;

  return { hours: durationHours, minutes: durationRemainingMinutes };
};
