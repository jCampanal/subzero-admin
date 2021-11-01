import apiClient from '../index';

const productsBase = '/admin/Product';

export const getProducts = (pageSize = 10, pageNumber = 0) => apiClient.get(productsBase, {params: {pageSize, pageNumber}}).then((response) => response.data);

export const getProductById = (id) => apiClient.get(`${productsBase}/${id}`).then((response) => response.data);

export const postProduct = (data) => apiClient.post(productsBase, data).then((response) => response.data);

export const putProduct = (id, data) => apiClient.put(`${productsBase}/${id}`, data).then((response) => response.data);

export const getSaleUnits = () => apiClient.get(`${productsBase}/saleUnit`).then((response) => response.data);
