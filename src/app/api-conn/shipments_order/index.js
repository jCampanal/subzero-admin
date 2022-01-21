import { formatDate } from "app/lib/formatDate";
import apiClient from "../index";

const orderURL = "/admin/Order";

const getAllOrders = () =>
  apiClient.get(orderURL + "/getAll").then((response) => response.data);
const getOrdersByWhareHose = (
  idWahrehose,
  secondDate = formatDate(new Date()),
  companyName = undefined,
  firstDate = undefined,
  noOrder = undefined,
  pageSize = 10,
  pageNumber = 0
) =>
  apiClient
    .get(orderURL + `/getByWarehouse/${idWahrehose}`, {
      params: {
        companyName,
        firstDate,
        secondDate,
        noOrder,
        pageSize,
        pageNumber,
      },
    })
    .then((response) => response.data);

const getShipment = (id) =>
  apiClient
    .get(`${orderURL}/getByDriver/${id}`)
    .then((response) => response.data);

const postOrder = (data, url) =>
  apiClient.post(`${url}`, data).then((response) => response.data);

const putShipment = (id, data) =>
  apiClient.put(`${orderURL}/${id}`, data).then((response) => response.data);
const changeStatus = (orderId, statusOrder) =>
  apiClient
    .put(
      `${orderURL}/changeStatus?orderId=${orderId}&statusOrder=${statusOrder}`
    )
    .then((response) => response.data);
const reassignOrder = (idOrder, idDriver) =>
  apiClient
    .put(`${orderURL}/toggleToDriver?orderId=${idOrder}&driverId=${idDriver}`)
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
  postOrder,
  putShipment,
  reassignOrder,
  deleteShipment,
  registerShipment,
  getOrdersByWhareHose,
  changeStatus,
};
