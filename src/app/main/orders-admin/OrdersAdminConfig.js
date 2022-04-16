import i18next from "i18next";
import React from "react";
import en from "./i18n/en";
import es from "./i18n/es";

i18next.addResourceBundle("en", "orders-admin", en);
i18next.addResourceBundle("es", "orders-admin", es);



const OrdersAdminConfig = {  
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/orders_admin",
      component: React.lazy(() => import("./OrdersAdmin/OrdersAdmin")),
    },
    {
      path: "/orders_create",
      exact: true,
      component: React.lazy(() =>
        import("./OrdersAdminForm/OrdersAddForm").then((form) => form)
      ),
    },
  ],
};

export default OrdersAdminConfig;
