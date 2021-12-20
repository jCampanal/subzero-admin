import { lazy } from "react";

const CustomerRegisterConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
          folded: false,
          position: "left",
        },
        toolbar: {
          display: false,
          style: "fixed",
          position: "below",
        },
      },
    },
  },
  routes: [
    {
      path: "/customers_register",
      exact: true,
      component: lazy(() =>
        import("./CustomersRegisterForm").then((form) => form)
      ),
    },
  ],
};

export default CustomerRegisterConfig;
