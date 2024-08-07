export const formatDate = (date) => {
    date = new Date(date);

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    // Convert month to its first three letters
    const [day, month, year] = formattedDate.split(' ');
    const shortMonth = month.slice(0, 3);

    return `${day} ${shortMonth} ${year}`;
};