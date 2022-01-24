import React from "react";
import OrderItem from "../OrderItem/OrderItem";
import {
  ShimpmentCardS,
  HeaderS,
  BodyS,
  TitleS,
  CountS,
} from "./ShimpmentCard.style";

const ShimpmentCard = () => {
  return (
    <ShimpmentCardS>
      <HeaderS>
        <TitleS>Luis</TitleS>
        <CountS>2</CountS>
      </HeaderS>
      <BodyS>
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </BodyS>
    </ShimpmentCardS>
  );
};

export default ShimpmentCard;
