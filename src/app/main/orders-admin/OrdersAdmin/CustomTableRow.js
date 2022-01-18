import { Button, Checkbox, Icon, TableCell, TableRow } from "@material-ui/core";
import { formatDisplayDate } from "app/lib/formatDate";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Visibility } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { changeStatus } from "app/api-conn/shipments_order";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { openDialog } from "app/store/fuse/dialogSlice";
import RemoveDlg from "app/common/removeDlg";
import { ShipmentStatus } from "../helpData";

const CustomTableRow = ({ item, isSelected, handleCheck, handleClick }) => {
  const { t } = useTranslation("orders-admin");
  const dispatch = useDispatch();
  const [status, setStatus] = useState(item.status);

  const onProceed = (status, id) => {
    changeStatus(id, status)
      .then(() => {
        setStatus(status);
        dispatch(
          showMessage({
            message: "Status changed!",
          })
        );

        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message:
              "Error during the update of the status. Please try again later",
            variant: "error",
          })
        );
      });
  };
  function handleChangeState(e, order) {
    const status = e.target.value;

    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={status}
            proceedCallback={() => onProceed(status, order.id)}
            dlgTitle="Warning"
            dlgText="You are you sure of update the status?"
          />
        ),
      })
    );
  }

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
        <Button color="primary">
          <Icon className="mr-5">edit</Icon> {t("EDIT")}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CustomTableRow;
CustomTableRow.propTypes = {
  item: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
