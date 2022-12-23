// get date from ISO Date
export function getDate(dateTimeString) {
  const dateString = new Date(dateTimeString).toISOString().substring(0, 10);
  return dateString;
}

// get time from ISO Date
export function getTime(dateTimeString) {
  const timeString = new Date(dateTimeString).toISOString().substring(11, 16);
  return timeString;
}
