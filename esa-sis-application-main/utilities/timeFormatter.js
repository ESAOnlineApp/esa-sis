function timeFormatter(timeString) {
  console.log('time' , timeString)
  const [time] = timeString.split("+");
  const [hours, minutes] = time.split(":");

  // Add leading zeros if needed
  const formattedHours = hours.padStart(2, "0");
  const formattedMinutes = minutes.padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export default timeFormatter;
