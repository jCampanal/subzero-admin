import { lazy } from "react";
import i18next from "i18next";
import en from "./i18n/en";
import es from "./i18n/es";

i18next.addResourceBundle("en", "dashboard", en);
i18next.addResourceBundle("es", "dashboard", es);

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/dashboard",
      component: lazy(() => import("./Dashboard")),
    },
  ],
};

export default DashboardConfig;
