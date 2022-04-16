/**
 * Converts a JS Date obj into a string in YYYY-MM-DD HH:MM:SS format
 */
const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  // time will be in 24 hour format
  const time = date.toLocaleTimeString("en-US", { hour12: false });
  return `${year}-${month}-${day} ${time}`;
};

export default formatDateTime;
