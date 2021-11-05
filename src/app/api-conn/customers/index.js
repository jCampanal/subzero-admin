import apiClient from '../index';

const customersURL = '/admin/Customer';

const getCustomers = (pageNumber = 0, pageSize = 10) =>
    apiClient.get(`${customersURL}?pageSize=${pageSize}&pageNumber=${pageNumber}`).then((response) => response.data);

export {getCustomers};
