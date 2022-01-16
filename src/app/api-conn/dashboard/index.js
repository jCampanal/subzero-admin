import apiClient from "../index";

const dashboardURL = "/Dashboard";

const getDashboardData = () =>
  apiClient.get(dashboardURL).then((response) => response.data);

export { getDashboardData };
