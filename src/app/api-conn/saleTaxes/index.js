import apiClient from "../index";

const salesTaxURL = "/admin/SalesTax";

const getsalesTax = (pageNumber = 0, pageSize = 10) =>
  apiClient
    .get(salesTaxURL, { params: { pageNumber, pageSize } })
    .then((response) => response.data);

const getAllsalesTax = () =>
  apiClient.get(salesTaxURL + "/getAll").then((response) => response.data);

const getSaleTax = (id) =>
  apiClient.get(`${salesTaxURL}/${id}`).then((response) => response.data);

const postSaleTax = (userId, data) =>
  apiClient
    .post(`${salesTaxURL}/${userId}`, data)
    .then((response) => response.data);

const putSaleTax = (id, data) =>
  apiClient.put(`${salesTaxURL}/${id}`, data).then((response) => response.data);

const deleteSaleTax = (ids) =>
  apiClient
    .delete(salesTaxURL, { data: ids })
    .then((response) => response.data);

const registerSaleTax = (data) =>
  apiClient.post(salesTaxURL, data).then((response) => response.data);

export {
  getsalesTax,
  getAllsalesTax,
  getSaleTax,
  postSaleTax,
  putSaleTax,
  deleteSaleTax,
  registerSaleTax,
};
