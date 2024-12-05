function dateFormatter(dateString) {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-indexed in JavaScript
  const day = parseInt(dateParts[2]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedMonth = `${months[month]} ${day} ${year}`;
  return formattedMonth;
}

export default dateFormatter;
