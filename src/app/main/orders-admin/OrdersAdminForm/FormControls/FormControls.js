import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import CustomerForm from "./Commons/CustomerForm/CustomerForm";
import Header from "./Commons/Header/Header";
import { FormControlsS, UserSectionS } from "./FormControl.style";
import PropTypes from "prop-types";
import TimeSection from "./Commons/TimeSection/TimeSection";
import FormDate from "./Commons/FormDate/FormDate";
import ProductForm from "./Commons/ProductForm/ProductForm";
import InvitedForm from "./Commons/InvitedForm/InvitedForm";

const FormControls = (props ) => {
  const [tabSelected, setTabSelected] = useState("customer");
  const [tryCreateOrder,setTryCreateOrder]=useState(false)

  const handlerTryCreateOrder=()=>{
    setTryCreateOrder(true)
  }
  return (
    <FormControlsS>
      <Header tabSelected={tabSelected} setTabSelected={setTabSelected} />
      <Divider />
      <UserSectionS>
        {tabSelected === "customer" ? (
          <CustomerForm customers={props.customers} TryCreateOrder={tryCreateOrder}/>
        ) : (
          <InvitedForm warehouses={props.warehouses} TryCreateOrder={tryCreateOrder}/>
        )}
      </UserSectionS>
      <TimeSection />
      <FormDate />
      <ProductForm ClickClose={props.ClickClose} TryCreate={()=>handlerTryCreateOrder()}/>
    </FormControlsS>
  );
};

export default FormControls;

FormControls.propTypes = {
  customers: PropTypes.array.isRequired,
  warehouses: PropTypes.array.isRequired,
};
