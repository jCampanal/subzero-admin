import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { Box, Button, Divider, Icon } from "@material-ui/core";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import { useFormContext } from "react-hook-form";
import { showMessage } from "../../../store/fuse/messageSlice";
import { formatDate, getBinaryDays } from "app/lib/formatDate";
import { postOrder, putShipment } from "app/api-conn/shipments_order";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";

const steps = [
  "Select the products",
  "Select the orders details",
  "Select the address",
];

function FormControls({ products, customers, drivers }) {
  const [activeStep, setActiveStep] = React.useState(2);
  const [skipped, setSkipped] = React.useState(new Set());
  const methods = useFormContext();
  const {
    getValues,
    formState: { dirtyFields, isValid },
  } = methods;
  const { t } = useTranslation("orders-admin");
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const saveData = () => {
    const formData = {
      customerId: getValues().customerId,
      deliveryTime: formatDate(getValues().deliveryTime),

      pickUp: getValues().pickUp,
      scheduleStatus: getValues().scheduleStatus,
      priority: parseInt(getValues().priority),
      products: getValues().products.map((product) => {
        const formatedProduct = product.productToSend;

        return formatedProduct;
      }),
      tag: getValues().tag,
      termOrder: getValues().termOrder,
    };
    formData.daysToOrder = getBinaryDays(getValues().daysToOrder);

    if (getValues().zipCode !== "" && getValues().addresSelection === "new") {
      formData.zipCode = getValues().zipCode;
    }
    if (getValues().street !== "" && getValues().addresSelection === "new") {
      formData.street = getValues().street;
    }
    if (getValues().state !== "" && getValues().addresSelection === "new") {
      formData.state = getValues().state;
    }
    if (getValues().driverId !== "") {
      const driverId = getValues().driverId;
      formData.driverId = driverId;
    }
    if (getValues().poNo !== "") {
      const intPhoNo = parseInt(getValues().poNo);
      formData.poNo = intPhoNo;
    }
    if (getValues().city !== "" && getValues().addresSelection === "new") {
      formData.city = getValues().city;
    }
    const customerSelected = customers.find(
      (customer) => customer.id === getValues().customerId
    );
    const addressId = customerSelected?.company.address.id;
    // const addressId = customerSelected?.company.address.id;
    if (addressId && getValues().addresSelection === "customer") {
      formData.addressId = addressId;
    }

    if (id) {
      formData.id = id;
      putShipment(id, formData)
        .then(() => {
          dispatch(
            showMessage({
              message: "The order was updated successfully",
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          history.push("/orders_admin");
          return null;
        })
        .catch((error) =>
          dispatch(
            showMessage({
              message: error.response.data.title,
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          )
        );
    } else {
      postOrder(formData)
        .then(() => {
          dispatch(
            showMessage({
              message: "The order was created successfully",
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          history.push("/orders_admin");
          return null;
        })
        .catch((error) =>
          dispatch(
            showMessage({
              message: error.response.data.title || error.response.data.message,
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          )
        );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <React.Fragment>
        <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
          <Step2 customers={customers} drivers={drivers} />

          {/* <Step3 handleNext={saveData} /> */}
          <Step1 products={products} />

          <Divider className="my-24" />
        </div>
      </React.Fragment>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={() => saveData()}
          startIcon={<Icon className="hidden sm:flex">save</Icon>}
          disabled={dirtyFields === {} || !isValid}
        >
          {t("SAVE")}
        </Button>
      </Box>
    </Box>
  );
}

export default FormControls;

FormControls.propTypes = {
  products: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  drivers: PropTypes.array.isRequired,
};
