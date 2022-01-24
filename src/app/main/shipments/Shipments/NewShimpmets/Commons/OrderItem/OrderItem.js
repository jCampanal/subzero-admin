import React from "react";
import { OrderItemS, ButtonsSectionS, TextS, ButtonS } from "./OrderItem.style";
import PropTypes from "prop-types";

const OrderItem = ({ order, handleSelectOrder, handleToogleOrder }) => {
  return (
    <OrderItemS>
      <div>
        <TextS>THE FARMERS DOG</TextS>
        <p>30995</p>
      </div>

      <ButtonsSectionS>
        <ButtonS onClick={() => handleSelectOrder(/* order.id */)}>
          <i className="fa fa-reply-all"></i>
        </ButtonS>
        <ButtonS onClick={() => handleToogleOrder(/* order */)}>
          <i className="fa fa-business-time"></i>
        </ButtonS>
      </ButtonsSectionS>
    </OrderItemS>
  );
};

export default OrderItem;
OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  handleSelectOrder: PropTypes.func.isRequired,
  handleToogleOrder: PropTypes.func.isRequired,
};
