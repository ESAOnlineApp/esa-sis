function dateSeperator(dateString) {
  // Parse the date string into a Date object
  const dateObject = new Date(dateString);

  // Extract year, month, and day
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = dateObject.getDate();

  // Return an object with the separated values
  return { year, month, day };
}

export default dateSeperator;
