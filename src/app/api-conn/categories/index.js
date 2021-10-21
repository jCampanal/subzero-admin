import apiClient from '../index';

const categoryBase = '/admin/Category';

export const getCategories = (pageSize = 10, pageNumber = 1) =>
    apiClient.get(`${categoryBase}?pageSize=${pageSize}&pageNumber=${pageNumber}`).then((response) => response.data);

export const postCategory = (data) => apiClient.post(categoryBase, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => response);

export const putCategory = (categoryId, data) =>
    apiClient.put(`${categoryBase}/${categoryId}`, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => response);

export const getCategory = (categoryId) => apiClient.get(`${categoryBase}/${categoryId}`).then((response) => response.data);

export const deleteCategory = (categoryId) => apiClient.delete(`${categoryBase}/${categoryId}`).then((response) => response.data);
