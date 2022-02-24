import apiClient from "../index";

const categoryBase = "/admin/Category";

const getCategories = (pageSize = 10, pageNumber = 0, name = "") =>
  apiClient
    .get(
      `${categoryBase}?pageSize=${pageSize}&pageNumber=${pageNumber}&name=${name}`
    )
    .then((response) => response.data);
const getAllCategories = () =>
  apiClient.get(`${categoryBase}/getAll`).then((response) => response.data);

const postCategory = (data) =>
  apiClient
    .post(categoryBase, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response);

const putCategory = (categoryId, data) =>
  apiClient
    .put(`${categoryBase}/${categoryId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response);

const getCategory = (categoryId) =>
  apiClient
    .get(`${categoryBase}/${categoryId}`)
    .then((response) => response.data);

const deleteCategory = (categoryId) =>
  apiClient
    .delete(categoryBase, { data: categoryId })
    .then((response) => response.data);

export {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
  getAllCategories,
};
