import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "coolers-form", en);
i18next.addResourceBundle("es", "coolers-form", es);

const CoolersPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/coolers_create",
      exact: true,
      component: React.lazy(() =>
        import("./CoolerAddForm").then((form) => form)
      ),
    },
    {
      path: "/coolers/:id/edit",
      exact: true,
      component: React.lazy(() =>
        import("./CoolerEditForm").then((form) => form)
      ),
    },
  ],
};

export default CoolersPageConfig;
