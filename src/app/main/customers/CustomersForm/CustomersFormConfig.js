import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "customers-form", en);
i18next.addResourceBundle("es", "customers-form", es);

const CustomersFormPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/customers_create",
      exact: true,
      component: React.lazy(() =>
        import("./CustomersAddForm").then((form) => form)
      ),
    },
    {
      path: "/customers/:id/edit",
      exact: true,
      component: React.lazy(() =>
        import("./CustomersEditForm").then((form) => form)
      ),
    },
  ],
};

export default CustomersFormPageConfig;
