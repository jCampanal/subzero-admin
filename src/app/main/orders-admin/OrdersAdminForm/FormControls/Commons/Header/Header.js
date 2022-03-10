import { ButtonGroup } from "@material-ui/core";
import React from "react";
import { ButtonS, HeaderS } from "./Header.style";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Header = ({ tabSelected, setTabSelected }) => {
  const methods = useFormContext();
  const { t } = useTranslation("orders-admin");
  const { setValue } = methods;
  const handleChangeTab = (tab) => {
    setValue("profile", tab);
    setTabSelected(tab);
  };
  return (
    <HeaderS>
      <ButtonGroup>
        <ButtonS
          left
          selected={tabSelected === "customer"}
          onClick={() => handleChangeTab("customer")}
        >
          {t("CUSTOMER")}
        </ButtonS>
        <ButtonS
          rigth
          selected={tabSelected === "invited"}
          onClick={() => handleChangeTab("invited")}
        >
          {t("INVITED")}
        </ButtonS>
      </ButtonGroup>
    </HeaderS>
  );
};

export default Header;

Header.propTypes = {
  tabSelected: PropTypes.string.isRequired,
  setTabSelected: PropTypes.func.isRequired,
};
