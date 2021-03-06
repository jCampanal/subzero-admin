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
import TableHeader from "app/components/TableHeader/TableHeader";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import _ from "lodash";

function CustomersTable({
  customers,
  rows,
  page,
  rowsPerPage,
  totalItems,
  handleChangeRowsPerPage,
  handleChangePage,
  handleClickEdit,
  deleteCallback,
}) {
  const { t } = useTranslation("customers");
  const [selected, setSelected] = useState([]);
  const [data] = useState(customers);

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
          {t("NO_CUSTOMERS")}
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto overflow-y-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeader
            namespace="customers"
            rows={rows}
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
            deleteSelectedItemsCallback={() => deleteCallback(selected)}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => {
                const isSelected = selected.indexOf(customer.id) !== -1;
                return (
                  <TableRow
                    className="h-56 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={customer.id}
                    selected={isSelected}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, customer.id)}
                      />
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {customer.email}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                    >
                      {customer.name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                    >
                      {customer.lastName}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {customer.phoneNumber}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {customer.company.name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <Button onClick={() => handleClickEdit(customer)}>
                        <Icon>edit</Icon> {t("EDIT")}
                      </Button>
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteCallback([customer.id]);
                        }}
                      >
                        <Icon>delete</Icon> {t("DELETE")}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

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

export default withRouter(CustomersTable);

CustomersTable.propTypes = {
  customers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};
