import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getAllWarehouses } from "app/api-conn/warehouses";
import rows from "./rows";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";
import { formatDate } from "app/lib/formatDate";
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
  }, []);

  useEffect(() => {
    if (warehoseTab.length > 0) {
      // dispatch(fetchOrders({ wharehoseId: warehoseTab[0].id }));
      for (let index = 0; index < warehoseTab.length; index++) {
        const wareHouse = warehoseTab[index];
        const date1 = formatDate(new Date(new Date().setHours(-5,0,0,0)));
        const date2 = formatDate(new Date());
        dispatch(fetchOrders({ wharehose: wareHouse,
                               date2: date2,
                               date1: date1}));
      }
    }
  }, [warehoseTab]);
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "",
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
    />
  );
}

export default memo(withProtectedRoute(OrdersAdmin));
