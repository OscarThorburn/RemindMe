export function getFormattedDate(date) {
  const trimmedDate =
    date.toISOString().slice(5, 10) + " " + date.toISOString().slice(11, 16);
  const formatedDate = trimmedDate.replace("-", "/");
  return formatedDate;
}

export function setByTimezone (selectedDate) {
  const date = new Date(selectedDate)
  const x = date.setHours(date.getHours + 2)
  console.log(x)
  return formatedDate
}
