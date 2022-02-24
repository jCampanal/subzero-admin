import i18next from "i18next";
import React from "react";
import en from "./i18n/en";
import es from "./i18n/es";

i18next.addResourceBundle("en", "schedules", en);
i18next.addResourceBundle("es", "schedules", es);

const SchedulesPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/schedules",
      component: React.lazy(() => import("./Schedules/Schedules")),
    },
  ],
};

export default SchedulesPageConfig;
