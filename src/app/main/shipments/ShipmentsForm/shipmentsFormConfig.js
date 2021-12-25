import React from "react";

const ShipmentsFormPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/shipments_reassign",
      exact: true,
      component: React.lazy(() =>
        import("./ShipmentsForm").then((form) => form)
      ),
    },
  ],
};

export default ShipmentsFormPageConfig;
