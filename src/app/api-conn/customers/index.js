import apiClient from "../index";

const customersURL = "/admin/Customer";

const getCustomers = (pageNumber = 0, pageSize = 10, name = undefined) =>
  apiClient
    .get(customersURL, { params: { pageNumber, pageSize, name } })
    .then((response) => response.data);

const verifyCustomer = (
  UserId = undefined,
  Token = undefined,
  CompanyName = undefined,
  SalesTaxId = undefined
) =>
  apiClient
    .get("/api/User/confirmCustomerEmail", {
      params: { UserId, Token, CompanyName, SalesTaxId },
    })
    .then((response) => response);

const getAllCustomers = () =>
  apiClient.get(customersURL).then((response) => response.data);

const getCustomer = (id) =>
  apiClient.get(`${customersURL}/${id}`).then((response) => response.data);

const postCustomer = (userId, data) =>
  apiClient
    .post(`${customersURL}/${userId}`, data)
    .then((response) => response.data);

const registerCustomer = (data) =>
  apiClient
    .post("/User/registerCustomer", data)
    .then((response) => response.data);

const putCustomer = (id, data) =>
  apiClient
    .put(`${customersURL}/${id}`, data)
    .then((response) => response.data);

const deleteCustomer = (ids) =>
  apiClient
    .delete(customersURL, { data: ids })
    .then((response) => response.data);

export {
  getCustomers,
  getAllCustomers,
  getCustomer,
  postCustomer,
  putCustomer,
  deleteCustomer,
  registerCustomer,
  verifyCustomer,
};
