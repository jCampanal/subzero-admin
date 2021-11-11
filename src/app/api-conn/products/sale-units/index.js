import apiClient from '../../index';

const saleUnitBaseUrl = '/admin/Product/saleUnit';

const getSaleUnits = () => apiClient.get(saleUnitBaseUrl).then((response) => response.data);

const postSaleUnit = (data) => apiClient.post(saleUnitBaseUrl, data).then((response) => response.data);

const putSaleUnit = (data) => apiClient.put(saleUnitBaseUrl, data).then((response) => response.data);

export {getSaleUnits, postSaleUnit, putSaleUnit};
