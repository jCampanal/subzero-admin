import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import TableHeader from "app/main/products/Products/TableHeader";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Box, TableHead } from "@material-ui/core";

function ShipmentsTable({
  data,
  rows,
  page,
  rowsPerPage,
  totalItems,
  handleChangeRowsPerPage,
  handleChangePage,
  handleClickEdit,
  deleteCallback,
}) {
  const { t } = useTranslation("shipments");
  const [selected, setSelected] = useState([]);

  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    // history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          {t("NO_Shipments")}
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <Box sx={{ margin: 1 }} className="pb-10">
        <Typography variant="h6" gutterBottom component="div">
          Orders
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              {rows.map((row) => {
                return (
                  <TableCell
                    className="p-4 md:p-16"
                    key={row.id}
                    align={row.align}
                    padding={row.disablePadding ? "none" : "normal"}
                    // sortDirection={
                    //   props.order.id === row.id ? props.order.direction : false
                    // }
                  >
                    <span>{t(`${row.label}`)}</span>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    align="left"
                    scope="row"
                  >
                    {order.driver.name}
                  </TableCell>
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    align="left"
                    scope="row"
                  >
                    {order.customer.name}
                  </TableCell>
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    align="left"
                    scope="row"
                  >
                    {order.address.city}
                  </TableCell>
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    align="left"
                    scope="row"
                  >
                    {order.products.length}
                  </TableCell>
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    align="left"
                    scope="row"
                  >
                    {order.status}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* {row.history.map((historyRow) => (
                  ))} */}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        className="flex-shrink-0 border-t-1"
        component="div"
        count={totalItems}
        labelRowsPerPage={t("ROWS_PER_PAGE")}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ShipmentsTable;
