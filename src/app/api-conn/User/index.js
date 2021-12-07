import apiClient from "..";

const loginUrl = "/User/login";
const userURL = "/User";

export const postLogin = (credentials) =>
  apiClient.post(loginUrl, credentials).then((response) => response.data);
export const getAdmins = (pageSize, pageNumber, name = undefined) =>
  apiClient
    .get(userURL + `/get/${pageSize}/${pageNumber}`, {
      params: { pageNumber, pageSize, name },
    })
    .then((response) => response.data);
export const deleteUser = (ids) =>
  apiClient
    .delete(userURL + "/delete", { data: ids })
    .then((response) => response.data);
