import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "profile", en);
i18next.addResourceBundle("es", "profile", es);

const ProfilePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/profile",
      exact: true,
      component: React.lazy(() => import("./ProfileForm").then((form) => form)),
    },
  ],
};

export default ProfilePageConfig;
