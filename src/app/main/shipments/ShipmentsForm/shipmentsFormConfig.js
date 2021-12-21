import React from "react";

const ShipmentsFormPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/shipments_create",
      exact: true,
      component: React.lazy(() =>
        import("./ShipmentsAddForm").then((form) => form)
      ),
    },
    {
      path: "/shipments_edit/:id",
      exact: true,
      component: React.lazy(() =>
        import("./ShipmentsEditForm").then((form) => form)
      ),
    },
  ],
};

export default ShipmentsFormPageConfig;
