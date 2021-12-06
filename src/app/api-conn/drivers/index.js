import apiClient from "../index";

const driversURL = "/admin/Driver";

const getDrivers = (pageNumber = 0, pageSize = 10, name = undefined) =>
  apiClient
    .get(driversURL, { params: { pageNumber, pageSize, name } })
    .then((response) => response.data);

const getAllDrivers = () =>
  apiClient.get(driversURL).then((response) => response.data);

const getDriver = (id) =>
  apiClient.get(`${driversURL}/${id}`).then((response) => response.data);

const postDriver = (userId, data) =>
  apiClient
    .post(`${driversURL}/${userId}`, data)
    .then((response) => response.data);

const putDriver = (id, data) =>
  apiClient.put(`${driversURL}/${id}`, data).then((response) => response.data);

const deleteDriver = (ids) =>
  apiClient.delete(driversURL, { data: ids }).then((response) => response.data);

const registerDriver = (data) =>
  apiClient
    .post("/User/registerDriver", data)
    .then((response) => response.data);

export {
  getDrivers,
  getAllDrivers,
  getDriver,
  postDriver,
  putDriver,
  deleteDriver,
  registerDriver,
};
