import apiClient from '../../index';

const saleUnitBaseUrl = '/admin/Product/saleUnit';

export const postSaleUnit = (data) => apiClient.post(saleUnitBaseUrl, data).then((response) => response.data);

export const putSaleUnit = (data) => apiClient.put(saleUnitBaseUrl, data).then((response) => response.data);
