import apiClient from "../index";

const orderURL = "/admin/Order";
const shipmentURL = "/driver/Order";

const getShipments = (pageNumber = 0, pageSize = 10) =>
  apiClient
    .get(shipmentURL, { params: { pageNumber, pageSize } })
    .then((response) => response.data);

const getAllOrders = () =>
  apiClient.get(orderURL).then((response) => response.data);

const getShipment = (id) =>
  apiClient.get(`${orderURL}/${id}`).then((response) => response.data);

const postShipment = (userId, data) =>
  apiClient
    .post(`${orderURL}/${userId}`, data)
    .then((response) => response.data);

const putShipment = (id, data) =>
  apiClient.put(`${orderURL}/${id}`, data).then((response) => response.data);

const deleteShipment = (ids) =>
  apiClient.delete(orderURL, { data: ids }).then((response) => response.data);

const registerShipment = (data) =>
  apiClient
    .post("/User/registershipment", data)
    .then((response) => response.data);

export {
  getShipments,
  getAllOrders,
  getShipment,
  postShipment,
  putShipment,
  deleteShipment,
  registerShipment,
};
