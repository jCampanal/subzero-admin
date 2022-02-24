import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const withProtectedRoute =
  (Component) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    const {
      user: { logged },
    } = useSelector((state) => state);
    const history = useHistory();

    useEffect(() => {
      if (!logged) history.push("/login");
    }, [logged, history]);
    return <Component {...props} />;
  };

export default withProtectedRoute;
