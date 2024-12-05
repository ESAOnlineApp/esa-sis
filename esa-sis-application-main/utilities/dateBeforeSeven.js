function getSevenDaysBefore(givenDate) {
  // Parse the given date string into a Date object
  const dateObject = new Date(givenDate);

  // Subtract 7 days
  dateObject.setDate(dateObject.getDate() - 7);

  // Format the new date as 'YYYY-MM-DD'
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(dateObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default getSevenDaysBefore;
