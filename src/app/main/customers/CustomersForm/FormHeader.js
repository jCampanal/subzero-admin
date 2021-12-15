import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerCustomer, putCustomer } from "../../../api-conn/customers";
import { showMessage } from "../../../store/fuse/messageSlice";

function FormHeader(props) {
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation("customer-form");
  const methods = useFormContext();
  const { getValues } = methods;
  const dispatch = useDispatch();

  const saveData = () => {
    if (id) {
      const formData = {
        companyAddress: {
          street: getValues().streetAddress,
          city: getValues().cityAddress,
          state: getValues().stateAddress,
          zipCode: getValues().zipCodeAddress,
        },
        companyAddressId: getValues().companyAddressId,
        companyName: getValues().companyName,
        email: getValues().email,
        lastname: getValues().lastname,
        name: getValues().name,
        phoneNumber: getValues().phoneNumber,
        priorityCustomer: getValues().priorityCustomer,
        salesTaxId: getValues().salesTaxId,
        username: getValues().username,
      };

      console.log("formData", formData);
      putCustomer(id, formData)
        .then(() => {
          dispatch(
            showMessage({
              message: "The customer was updated successfully",
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          history.push("/customers");
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
      const formData = {
        email: getValues().email,
        companyName: getValues().companyName,
        salesTaxId: getValues().salesTaxId,
        callbackURL: getValues().callbackURL,
      };
      registerCustomer(formData)
        .then(() => {
          dispatch(
            showMessage({
              message: "The customer was created successfully",
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          history.push("/customers");
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
    }
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/customers"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              {t("CUSTOMER")}
            </span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {t(id ? "EDIT" : "CREATE")}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {/* {id && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            onClick={() => props.removeCallback(id)}
            startIcon={<Icon className="hidden sm:flex">delete</Icon>}
          >
            {t("REMOVE")}
          </Button>
        )} */}
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={() => saveData()}
          startIcon={<Icon className="hidden sm:flex">save</Icon>}
        >
          {t("SAVE")}
        </Button>
      </motion.div>
    </div>
  );
}

export default FormHeader;
