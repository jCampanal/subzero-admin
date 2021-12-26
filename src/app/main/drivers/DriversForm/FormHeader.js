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
import { showMessage } from "../../../store/fuse/messageSlice";
import { putDriver, registerDriver } from "app/api-conn/drivers";

function FormHeader() {
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation("drivers-form");
  const methods = useFormContext();
  const {
    getValues,
    formState: { dirtyFields, isValid },
  } = methods;
  const dispatch = useDispatch();

  const saveData = () => {
    if (id) {
      const formData = {
        email: getValues().email,
        lastname: getValues().lastname,
        name: getValues().name,
        phoneNumber: getValues().phoneNumber,
        username: getValues().username,
        warehouseId: getValues().warehouseId,
      };

      putDriver(id, formData)
        .then(() => {
          dispatch(
            showMessage({
              message: t("SUCCESS_UPDATE"),
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          history.push("/drivers");
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
      const formData = new FormData();
      formData.append("Username", getValues().userName);
      formData.append("Name", getValues().name);
      formData.append("Lastname", getValues().lastName);
      formData.append("Password", getValues().password);
      formData.append("ConfirmPassword", getValues().confirmPassword);
      formData.append("PhoneNumber", getValues().phoneNumber);
      formData.append("WarehouseId", getValues().warehouseId);
      if (getValues().email !== "") formData.append("Email", getValues().email);
      if (getValues().file !== null)
        formData.append("Image", getValues().image);
      registerDriver(formData)
        .then(() => {
          dispatch(
            showMessage({
              message: t("SUCCESS_CREATE"),
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          history.push("/drivers");
        })
        .catch((error) =>
          dispatch(
            showMessage({
              message: error.response.data.title ?? error.response.data.message,
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
            to="/drivers"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              {t("DRIVERS")}
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
                {t(id ? "EDIT" : "CREATE_NEW")}
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
      </motion.div>
    </div>
  );
}

export default FormHeader;
