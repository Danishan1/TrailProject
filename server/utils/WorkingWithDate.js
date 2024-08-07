/**
 * 
 * @param {dateString} take date as string in the Formate : DD-MM-YYYY 
 * @returns Date Object
 */
export const convertToDate = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * 
 * @param {timeString} take time as string in the Formate : HH:MM AM/PM
 * @returns Date Object
 */
export const convertTimeToDate = (timeString) => {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
      hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
  }

  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
};