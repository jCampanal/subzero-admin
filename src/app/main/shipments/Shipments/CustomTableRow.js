import { Collapse, IconButton, TableCell, TableRow } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import React, { useEffect } from "react";
import Orders from "./Orders/Orders";
import PropsTypes from "prop-types";

const CustomTableRow = ({ row, isOpen }) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>

        <TableCell align="left">{row.lastName}</TableCell>
        <TableCell align="left">{row.phoneNumber}</TableCell>
        <TableCell align="left">{row.warehouse.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Orders driverId={row.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CustomTableRow;

CustomTableRow.propTypes = {
  row: PropsTypes.object.isRequired,
  isOpen: PropsTypes.bool.isRequired,
};
