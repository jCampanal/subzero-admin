import apiClient from '../index';

const warehousesURL = '/admin/Warehouse';

const getWarehouses = (pageNumber = 0, pageSize = 10) =>
    apiClient.get(`${warehousesURL}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);

export {getWarehouses};
