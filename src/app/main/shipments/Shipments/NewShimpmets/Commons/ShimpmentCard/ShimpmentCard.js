import React, { useState } from "react";
import OrderItem from "../OrderItem/OrderItem";
import {
  ShimpmentCardS,
  HeaderS,
  BodyS,
  TitleS,
  CountS,
} from "./ShimpmentCard.style";
import PropTypes from "prop-types";
import WithOrders from "../../../Orders/Orders";
import { Grid } from "@material-ui/core";
import ViewModal from "../../../Orders/ViewModal";
import { useDispatch } from "react-redux";
import { reassignOrder } from "app/api-conn/shipments_order";
import { showMessage } from "app/store/fuse/messageSlice";

const ShimpmentCard = ({ driver, loading, orders, loadOrders }) => {
  const [order, setOrder] = useState();
  const [isViewModal, setIsViewModal] = useState(false);

  const dispatch = useDispatch();

  const handleSelectOrder = (/* id */) => {
    const id = "123asdsa"; /* Eliminar */
    setOrder(id);
  };
  const handleToogleOrder = (/* order */) => {
    const order = {
      /* Eliminar */ id: "asdasdasdsa",
      driver: "asdasds",
    };
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

  //   if (orders.length === 0) {
  //     return null;
  //   }
  return (
    <Grid item md={4} sm={6} xs={12}>
      <ShimpmentCardS>
        <HeaderS>
          <TitleS>{driver.name}</TitleS>
          <CountS>{orders.length}</CountS>
        </HeaderS>
        <BodyS>
          {orders.map((order) => {
            return (
              <OrderItem
                key={order.id}
                order={order}
                handleSelectOrder={handleSelectOrder}
                handleToogleOrder={handleToogleOrder}
              />
            );
          })}
          <OrderItem
            order={order}
            handleSelectOrder={handleSelectOrder}
            handleToogleOrder={handleToogleOrder}
          />
          <OrderItem
            order={order}
            handleSelectOrder={handleSelectOrder}
            handleToogleOrder={handleToogleOrder}
          />
        </BodyS>
      </ShimpmentCardS>
      {isViewModal && order && (
        <ViewModal
          data={order}
          setIsModal={setIsViewModal}
          loadOrders={loadOrders}
          isModal={isViewModal}
        />
      )}
    </Grid>
  );
};

export default WithOrders(ShimpmentCard);

ShimpmentCard.propTypes = {
  driver: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadOrders: PropTypes.func.isRequired,
};
