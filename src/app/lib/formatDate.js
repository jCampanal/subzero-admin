export const formatDate = (date) => {
  const formattedDate = date.toISOString();
  // console.log("date", formattedDate);
  // const formattedDate =
  //   date.getMonth() +
  //   1 +
  //   "/" +
  //   date.getDate() +
  //   "/" +
  //   date.getFullYear() +
  //   " " +
  //   date.getHours() +
  //   ":" +
  //   date.getMinutes();
  return formattedDate;
};
export const formatDisplayDate = (date) => {
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthIndex = date.getMonth(); // 11
  const monthName = months[monthIndex]; // December
  const dayIndex = date.getDay(); // 0
  const dayName = days[dayIndex]; // Monday
  const year = date.getFullYear(); // 2019
  const dayNumber = date.getDate(); // 24
  let hour = date.getHours(); // 11
  let minutes = date.getMinutes(); // 56

  /* am o pm */
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedDate = `${dayName}, ${monthName} ${dayNumber}, ${year} ${hour}:${minutes} ${ampm}`;

  return formattedDate;
};

export const getBinaryDays = (indexDays) => {
  const days = [false, false, false, false, false, false, false];
  indexDays.forEach((day) => {
    days[day.index - 1] = true;
  });

  // let days = [0, 0, 0, 0, 0, 0, 0];
  // indexDays.forEach((day) => {
  //   days[day.index - 1] = 1;
  // });
  // days = days.join("");
  // days = parseInt(days);
  return days;
};
