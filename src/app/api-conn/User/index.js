import apiClient from "..";

const loginUrl = "/User/login";
const userURL = "/User";

export const postLogin = (credentials) =>
  apiClient.post(loginUrl, credentials).then((response) => response.data);
export const getAdmins = (pageSize, pageNumber, name = undefined) =>
  apiClient
    .get(userURL + `/get/${pageSize}/${pageNumber}`, {
      params: { name },
    })
    .then((response) => response.data);
export const registerAdmin = (data) =>
  apiClient
    .post(userURL + "/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
export const putAdmin = (id, data) =>
  apiClient
    .put(userURL + `/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);

export const deleteUser = (ids) =>
  apiClient.delete(userURL, { data: ids }).then((response) => response.data);
