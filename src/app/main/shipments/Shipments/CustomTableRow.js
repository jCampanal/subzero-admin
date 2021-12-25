import {
  Collapse,
  IconButton,
  TableCell,
  Typography,
  TableRow,
  Box,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import React from "react";
import Orders from "./Orders/Orders";

const CustomTableRow = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
