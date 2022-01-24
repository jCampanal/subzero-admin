import React from "react";
import { OrderItemS, ButtonsSectionS, TextS, ButtonS } from "./OrderItem.style";

const OrderItem = () => {
  return (
    <OrderItemS>
      <div>
        <TextS>THE FARMERS DOG</TextS>
        <p>30995</p>
      </div>

      <ButtonsSectionS>
        <ButtonS>
          <i className="fa fa-reply-all"></i>
        </ButtonS>
        <ButtonS>
          <i className="fa fa-business-time"></i>
        </ButtonS>
      </ButtonsSectionS>
    </OrderItemS>
  );
};

export default OrderItem;
