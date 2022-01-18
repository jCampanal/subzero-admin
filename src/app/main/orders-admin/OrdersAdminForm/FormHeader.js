import React from "react";
import Icon from "@material-ui/core/Icon";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

function FormHeader() {
  const theme = useTheme();

  const { id } = useParams();
  const { t } = useTranslation("customer-form");

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
      ></motion.div>
    </div>
  );
}

export default FormHeader;
