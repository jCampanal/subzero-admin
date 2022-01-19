import { getShipment, reassignOrder } from "app/api-conn/shipments_order";
import OrdersTable from "./OrdersTable";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import rows from "./rows";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import PropTypes from "prop-types";
import FuseLoading from "@fuse/core/FuseLoading";

const Orders = ({ driverId }) => {
  const [orders, setOrders] = useState({ data: [], totalItems: 20 });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  const handleChangePage = (event) => {
    setRowPerPage(event.target.value);
  };
  function handleChangeRowsPerPage(event, value) {
    setPage(value);
  }

  const dispatch = useDispatch();
  const loadOrders = useCallback(
    (id) => {
      setLoading(true);
      // eslint-disable-next-line promise/catch-or-return
      getShipment(id)
        .then((response) => {
          setOrders({
            data: response.data.data,
            totalItems: response.data.totalItems,
          });

          // setTotalItems(response.data.totalItems);
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

  const handleToogleOrder = (order) => {
    reassignOrder(order.id, order.driver.id)
      .then(() => {
        dispatch(
          showMessage({
            message: "The reassigment was done successfully",
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
        loadOrders();
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
      });
  };

  useEffect(() => {
    loadOrders(driverId);
  }, [driverId, loadOrders]);

  return (
    <Fragment>
      {loading ? (
        <FuseLoading />
      ) : (
        <OrdersTable
          data={orders.data}
          rows={rows}
          page={page}
          rowsPerPage={rowPerPage}
          totalItems={orders.totalItems}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleToogleOrder={handleToogleOrder}
          loadOrders={loadOrders}
        />
      )}
    </Fragment>
  );
};

export default Orders;

Orders.propTypes = {
  driverId: PropTypes.string.isRequired,
};
