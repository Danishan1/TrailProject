export const convertDate2time = (dateInput) => {
    // Parse the dateInput based on its type
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Format hours and minutes
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Return formatted time
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};