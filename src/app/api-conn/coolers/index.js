import apiClient from "../index";

const coolersUrl = "/admin/Coolers";

const getCoolers = (
  pageNumber = 0,
  pageSize = 10,
  code = undefined,
  date = undefined,
  returned = undefined
) =>
  apiClient
    .get(coolersUrl, { params: { pageSize, pageNumber, code, date, returned } })
    .then((response) => response.data);

const getCoolersActivity = (params) => {
  return apiClient
    .get(
      coolersUrl +
        `/getCoolerActivity?${
          params.dateTime ? "dateTime=" + params.dateTime + "&" : ""
        }pageSize=${params.pageSize}&pageNumber=${params.pageNumber}${
          params.code ? "&code=" + params.code : ""
        }`
    )
    .then((response) => response.data);
};

const moveCooler = (data) =>
  apiClient
    .put(coolersUrl + "/moveCooler", data)
    .then((response) => response.data);

const getCoolersByCustomers = (pageNumber = 0, pageSize = 10) =>
  apiClient
    .get(`${coolersUrl}/getCoolersByCustomers`, {
      params: { pageNumber, pageSize },
    })
    .then((response) => response.data);

const postCooler = (data) =>
  apiClient
    .post(coolersUrl, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);

const putCooler = (id, data) =>
  apiClient
    .put(`${coolersUrl}/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);

const deleteCooler = (ids) =>
  apiClient.delete(coolersUrl, { data: ids }).then((response) => response.data);

export {
  getCoolers,
  getCoolersByCustomers,
  postCooler,
  putCooler,
  deleteCooler,
  moveCooler,
  getCoolersActivity,
};
