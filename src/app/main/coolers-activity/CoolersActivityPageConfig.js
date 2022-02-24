import i18next from "i18next";
import React from "react";
import en from "./i18n/en";
import es from "./i18n/es";

i18next.addResourceBundle("en", "coolers-activity", en);
i18next.addResourceBundle("es", "coolers-activity", es);

const CoolersActivityPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/coolers_activity",
      component: React.lazy(() => import("./CoolersActivity/CoolersActivity")),
    },
  ],
};

export default CoolersActivityPageConfig;
