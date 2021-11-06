import apiClient from '../index';

const warehousesURL = '/admin/Warehouse';

const getWarehouses = (pageNumber = 0, pageSize = 10) =>
    apiClient.get(`${warehousesURL}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);

const postWarehouse = (data) => apiClient.post(warehousesURL, data).then((response) => response.data);

const putWarehouse = (id, data) => apiClient.put(`${warehousesURL}/${id}`, data).then((response) => response.data);

const deleteWarehouse = (id) => apiClient.delete(`${warehousesURL}/${id}`).then((response) => response.data);

export {getWarehouses, postWarehouse, putWarehouse, deleteWarehouse};
