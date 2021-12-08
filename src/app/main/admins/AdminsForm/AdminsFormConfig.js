import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "admins-form", en);
i18next.addResourceBundle("es", "admins-form", es);

const AdminsFormPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/admins_create",
      exact: true,
      component: React.lazy(() =>
        import("./AdminsAddForm").then((form) => form)
      ),
    },
    {
      path: "/admins_edit/:id",
      exact: true,
      component: React.lazy(() =>
        import("./AdminsEditForm").then((form) => form)
      ),
    },
  ],
};

export default AdminsFormPageConfig;
