export const formatDate = (date) => {
  let formatted_date =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  return formatted_date;
};
