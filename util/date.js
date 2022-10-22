export function getFormattedDate(date) {
  const trimmedDate =
    date.toISOString().slice(5, 10) + " " + date.toISOString().slice(11, 16);
  const formatedDate = trimmedDate.replace("-", "/");
  return formatedDate;
}