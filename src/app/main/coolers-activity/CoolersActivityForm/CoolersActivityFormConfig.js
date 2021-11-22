import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "providers-form", en);
i18next.addResourceBundle("es", "providers-form", es);

const ProvidersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/coolers_activity_move/:id",
      component: React.lazy(() => import("./CoolersActivityForm.js")),
    },
  ],
};

export default ProvidersConfig;
