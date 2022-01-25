/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { getShipment } from "app/api-conn/shipments_order";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const WithOrders = (WrappedComponent) => (props) => {
  // curry
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const loadOrders = useCallback(
    (id) => {
      setLoading(true);
      // eslint-disable-next-line promise/catch-or-return
      getShipment(id)
        .then((response) => {
          setOrders(response.data.data);
          return null;
        })
        .catch(() => {
          dispatch(
            showMessage({
              message: "There is something wrong, try to refresh the page",
              variant: "error",
            })
          );
          return null;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    loadOrders(props.driver.id);
  }, [props.driver.id, loadOrders]);

  return (
    <WrappedComponent {...props} orders={orders} loadOrders={loadOrders} />
  );
};

export default WithOrders;

WithOrders.propTypes = {
  driver: PropTypes.object.isRequired,
};
