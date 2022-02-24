import { lazy } from "react";

const LoginPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
          folded: false,
          position: "left",
        },
        toolbar: {
          display: false,
          style: "fixed",
          position: "below",
        },
      },
    },
  },
  routes: [
    {
      path: "/login",
      component: lazy(() => import("./LoginPage")),
    },
  ],
};

export default LoginPageConfig;
