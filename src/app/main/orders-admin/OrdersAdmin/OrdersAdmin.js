import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getAllWarehouses } from "app/api-conn/warehouses";
import rows from "./rows";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";
import {
  fetchOrders,
  selectTotal,
} from "app/store/oredersAdmin/ordersAdminSlice";

const Header = lazy(() => import("./PageCardedHeader"));
const OrdersTab = lazy(() => import("./OrdersTab"));

function OrdersAdmin() {
  const [warehoseTab, setWarehoseTab] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalOrders = useSelector(selectTotal);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    getAllWarehouses()
      .then((res) => {
        setWarehoseTab(res.data);
        setLoading(false);
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (warehoseTab.length > 0) {
      // dispatch(fetchOrders({ wharehoseId: warehoseTab[0].id }));
      for (let index = 0; index < warehoseTab.length; index++) {
        const wareHouse = warehoseTab[index];

        dispatch(fetchOrders({ wharehose: wareHouse }));
      }
    }
  }, [warehoseTab, dispatch]);
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<Header totalOrders={totalOrders} />}
      content={
        <>
          {loading ? (
            <FuseLoading />
          ) : (
            <OrdersTab
              tabItems={warehoseTab}
              rows={rows}
              totalOrders={totalOrders}
            />
          )}
        </>
      }
      innerScroll
    />
  );
}

export default memo(withProtectedRoute(OrdersAdmin));
