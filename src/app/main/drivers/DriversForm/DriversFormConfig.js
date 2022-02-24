import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "drivers-form", en);
i18next.addResourceBundle("es", "drivers-form", es);

const DriversFormPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/drivers_create",
      exact: true,
      component: React.lazy(() =>
        import("./DriversAddForm").then((form) => form)
      ),
    },
    {
      path: "/drivers_edit/:id",
      exact: true,
      component: React.lazy(() =>
        import("./DriversEditForm").then((form) => form)
      ),
    },
  ],
};

export default DriversFormPageConfig;
