import apiClient from "../../index";

const saleUnitBaseUrl = "/admin/Product/saleUnit";

const getSaleUnits = () =>
  apiClient.get(saleUnitBaseUrl).then((response) => response.data);

const getSaleUnitsByProductsId = (ids) => {
  console.log("ids", ids);
  console.log("ids", ids[0]);

  return apiClient
    .post("/admin/Product/saleUnitByProductId", ids)
    .then((response) => response.data);
};

const postSaleUnit = (data) =>
  apiClient.post(saleUnitBaseUrl, data).then((response) => response.data);

const putSaleUnit = (id, data) =>
  apiClient
    .put(`${saleUnitBaseUrl}/${id}`, data)
    .then((response) => response.data);

const deleteSaleUnit = (ids) =>
  apiClient
    .delete(saleUnitBaseUrl, { data: ids })
    .then((response) => response.data);

export {
  getSaleUnits,
  getSaleUnitsByProductsId,
  postSaleUnit,
  putSaleUnit,
  deleteSaleUnit,
};
