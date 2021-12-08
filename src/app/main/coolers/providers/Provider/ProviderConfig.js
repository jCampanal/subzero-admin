import i18next from "i18next";
import React from "react";
import en from "./translations/en";
import es from "./translations/es";

i18next.addResourceBundle("en", "provider", en);
i18next.addResourceBundle("es", "provider", es);

const ProviderConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/providers/",
      exact: true,
      component: React.lazy(() =>
        import("./Provider").then((provider) => provider)
      ),
    },
  ],
};

export default ProviderConfig;
