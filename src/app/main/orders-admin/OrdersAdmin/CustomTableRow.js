import { Button, Checkbox, TableCell, TableRow } from "@material-ui/core";
import { formatDisplayDate } from "app/lib/formatDate";
import React from "react";
import PropTypes from "prop-types";
import { Visibility } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { ShipmentStatus } from "../helpData";

const CustomTableRow = ({ item, isSelected, handleCheck, handleClick }) => {
  const { t } = useTranslation("orders-admin");

  return (
    <TableRow
      className="h-72 cursor-pointer"
      hover
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      key={item.id}
      selected={isSelected}
    >
      <TableCell className="w-40 md:w-64 text-center" padding="none">
        <Checkbox
          checked={isSelected}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => handleCheck(event, item.id)}
        />
      </TableCell>

      <TableCell
        className="p-4 md:p-16"
        component="th"
        scope="row"
        align="left"
      >
        {item.customer.company.name}
      </TableCell>

      <TableCell
        className="p-4 md:p-16"
        component="th"
        scope="row"
        align="left"
      >
        {formatDisplayDate(new Date(item.deliveryTime))}
      </TableCell>

      <TableCell
        className="p-4 md:p-16"
        component="th"
        scope="row"
        align="left"
      >
        <span className={`text-${ShipmentStatus[item.status].tColor}`}>
          <i className={`fa ${ShipmentStatus[item.status].icon} mr-2`} />
          {t(ShipmentStatus[item.status].name)}
        </span>
      </TableCell>

      <TableCell
        className="p-4 md:p-16"
        component="th"
        scope="row"
        align="right"
      >
        <Button color="primary" onClick={() => handleClick(item)}>
          <Visibility className="mr-5" />
          {t("VIEW")}
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
  handleEdit: PropTypes.func.isRequired,
};
