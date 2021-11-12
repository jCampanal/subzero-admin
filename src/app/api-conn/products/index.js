import apiClient from '../index';

const productsBase = '/admin/Product';

const getProducts = (pageSize = 10, pageNumber = 0) => apiClient.get(productsBase, {params: {pageSize, pageNumber}}).then((response) => response.data);

const getProductById = (id) => apiClient.get(`${productsBase}/${id}`).then((response) => response.data);

const postProduct = (data) => apiClient.post(productsBase, data).then((response) => response.data);

const putProduct = (id, data) => apiClient.put(`${productsBase}/${id}`, data).then((response) => response.data);

const deleteProduct = (ids) => apiClient.delete(productsBase, {data: ids}).then((response) => response.data);

export {getProducts, getProductById, postProduct, putProduct, deleteProduct};
