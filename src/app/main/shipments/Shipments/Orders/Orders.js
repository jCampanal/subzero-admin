import { getShipment } from "app/api-conn/shipments_order";
import OrdersTable from "./OrdersTable";
import React, { useCallback, useEffect, useState } from "react";
import rows from "./rows";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import PropTypes from "prop-types";

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
        });
    },
    [dispatch]
  );

  useEffect(() => {
    loadOrders(driverId);
  }, [driverId, loadOrders]);

  console.log(orders);
  return (
    <OrdersTable
      data={orders.data}
      rows={rows}
      page={page}
      rowsPerPage={rowPerPage}
      totalItems={orders.totalItems}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default Orders;

Orders.propTypes = {
  driverId: PropTypes.string.isRequired,
};
