import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { putAdmin } from "app/api-conn/User";

function FormHeader({user}) {
  const theme = useTheme();
  const history = useHistory();
  const { t } = useTranslation("profile");
  const methods = useFormContext();
  const {
    getValues,
    reset,
    formState: { dirtyFields, isValid },
  } = methods;
  const dispatch = useDispatch();

  const saveData = () => {
    const formData = new FormData();

    formData.append("Email", getValues().email);
    formData.append("Name", getValues().name);
    formData.append("LastName", getValues().lastname);
    formData.append("PhoneNumber", getValues().phoneNumber);
    formData.append("UserName", getValues().username);
    if (getValues().password !== "") formData.append("Password", getValues().password);
    if (getValues().confirmPassword !== "") formData.append("ConfirmPassword", getValues().confirmPassword);
    if (getValues().image !== null) formData.append("Image", getValues().image);
    
      putAdmin(user.id, formData)
        .then(() => {
          dispatch(
            showMessage({
              message: "The User was updated successfully",
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          history.push("/profile");
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
    
  };
  const cancel = ()=>{
    reset(user)
  }

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
            to="/"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              {t("DASHBOARD")}
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
                {t( "EDIT" )}
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
          {t("UPDATE")}
        </Button>
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="default"
          onClick={() => cancel()}
          startIcon={<Icon className="hidden sm:flex">cancel</Icon>}
         
        >
          {t("CANCEL")}
        </Button>
      </motion.div>
    </div>
  );
}

export default memo( FormHeader);
