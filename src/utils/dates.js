function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function getDateNDaysAgo(n) {
    const now = new Date(); // Current date and time
    now.setDate(now.getDate() - n); // Substract N days
    return formatDate(now);
}

export const dates = {
    startDate: getDateNDaysAgo(3), // ALter days to increase/decrease data set
    endDate: getDateNDaysAgo(1) // Leave at 1 to get yesterday's data
}
