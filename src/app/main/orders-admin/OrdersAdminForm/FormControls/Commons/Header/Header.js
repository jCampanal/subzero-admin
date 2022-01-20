import { ButtonGroup } from "@material-ui/core";
import React from "react";
import { ButtonS, HeaderS } from "./Header.style";
import PropTypes from "prop-types";

const Header = ({ tabSelected, setTabSelected }) => {
  const handleChangeTab = (tab) => {
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
          Customer
        </ButtonS>
        <ButtonS
          rigth
          selected={tabSelected === "invited"}
          onClick={() => handleChangeTab("invited")}
        >
          Invited
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
