// get date from ISO Date
export function getDate(dateTimeString) {
  const dateString = new Date(dateTimeString).toISOString().substring(0, 10);
  return dateString;
}

// get time from ISO Date
export function getTime(dateTimeString) {
  const timeString = new Date(dateTimeString).toLocaleTimeString();
  return timeString;
}

// get date and time from ISO Date
export function parseISODate(dateTimeString) {
  const dateString = getDate(dateTimeString);
  const timeString = getTime(dateTimeString);
  return `${dateString} ${timeString}`;
}
