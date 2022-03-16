import { Button, TableCell, TableRow } from "@material-ui/core";
import { formatDisplayDate } from "app/lib/formatDate";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ShipmentStatus } from "../helpData";
import { VisibilityOutlined } from "@material-ui/icons";
import CancelOutlined from "@material-ui/icons/CancelOutlined";

const CustomTableRow = ({ item, handleClick, handleCancelOrder }) => {
  const { t } = useTranslation("orders-admin");

  return (
    <TableRow
      className="h-56 cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key={item.id}
    >
      <TableCell
        className="p-4 md:p-10"
        component="th"
        scope="row"
        align="left"
      >
        {item.no}
      </TableCell>
      <TableCell
        className="p-4 md:p-10"
        component="th"
        scope="row"
        align="left"
      >
        {item.customer.company.name}
      </TableCell>

      <TableCell
        className="p-4 md:p-10"
        component="th"
        scope="row"
        align="left"
      >
        {formatDisplayDate(new Date(item.deliveryTime))}
      </TableCell>

      <TableCell
        className="p-4 md:p-10"
        component="th"
        scope="row"
        align="left"
      >
        <span className={`text-${ShipmentStatus[item.status].tColor}`}>
          <i className={`fa ${ShipmentStatus[item.status].icon} mr-5`}/>
          {t(ShipmentStatus[item.status].name)}
        </span>
      </TableCell>

      <TableCell
        className="p-4 md:p-10"
        component="th"
        scope="row"
        align="right"
      >
        <Button color="primary" onClick={() => handleClick(item)}>
          <VisibilityOutlined className="mr-5" /> View
        </Button>
        <Button
          color="primary"
          onClick={() => handleCancelOrder(item)}
          disabled={item.status === "Delivered"}
        >
          <span style={{color:item.status === "Delivered"?"#e37681":"#dc3545"}}>
          <CancelOutlined className="mr-5" /> Cancel
          </span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CustomTableRow;
CustomTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleCancelOrder: PropTypes.func.isRequired,
};
