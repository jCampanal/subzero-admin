import apiClient from "../index";

const orderURL = "/admin/Order";

const getAllOrders = () =>
  apiClient
    .get(orderURL, { params: { pageNumber: 0, pageSize: 10 } })
    .then((response) => response.data);

const getShipment = (id) =>
  apiClient
    .get(`${orderURL}/getByDriver/${id}`)
    .then((response) => response.data);

const postShipment = (userId, data) =>
  apiClient
    .post(`${orderURL}/${userId}`, data)
    .then((response) => response.data);

const putShipment = (id, data) =>
  apiClient.put(`${orderURL}/${id}`, data).then((response) => response.data);
const reassignOrder = (idOrder, idDriver) =>
  apiClient
    .put(`${orderURL}/toggleToDriver`, {
      params: { orderId: idOrder, driverId: idDriver },
    })
    .then((response) => response.data);

const deleteShipment = (ids) =>
  apiClient.delete(orderURL, { data: ids }).then((response) => response.data);

const registerShipment = (data) =>
  apiClient
    .post("/User/registershipment", data)
    .then((response) => response.data);

export {
  getAllOrders,
  getShipment,
  postShipment,
  putShipment,
  reassignOrder,
  deleteShipment,
  registerShipment,
};
