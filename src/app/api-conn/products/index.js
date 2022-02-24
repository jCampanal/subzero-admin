import apiClient from "../index";

const productsBase = "/admin/Product";

const getProducts = (pageSize = 10, pageNumber = 0, name = "") =>
  apiClient
    .get(productsBase, { params: { pageSize, pageNumber, name } })
    .then((response) => response.data);
const getAllProducts = (categoryId) =>
  apiClient
    .get(productsBase + "/getAll", { params: { categoryId: categoryId } })
    .then((response) => response.data);

const getProduct = (id) =>
  apiClient.get(`${productsBase}/${id}`).then((response) => response.data);

const postProduct = (data) =>
  apiClient.post(productsBase, data).then((response) => response.data);

const putProduct = (id, data) =>
  apiClient
    .put(`${productsBase}/${id}`, data)
    .then((response) => response.data);

const deleteProduct = (ids) =>
  apiClient
    .delete(productsBase, { data: ids })
    .then((response) => response.data);

export {
  getProducts,
  getAllProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
