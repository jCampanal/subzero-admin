import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "coolers", en);
i18next.addResourceBundle("es", "coolers", es);

const CoolersCustomersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/coolers_customers",
      exact: true,
      component: React.lazy(() =>
        import("./CoolersCustomers").then((customers) => customers)
      ),
    },
  ],
};

export default CoolersCustomersConfig;
