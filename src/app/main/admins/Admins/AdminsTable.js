import React, { useState } from "react";
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
import TableHeader from "app/components/TableHeader/TableHeader";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

function AdminsTable({
  handleChangeRowsPerPage,
  handleChangePage,
  deleteCallback,
  handleClickEdit,
  data,
  rows,
  page,
  rowsPerPage,
  totalItems,
}) {
  const { t } = useTranslation("admins");
  const [selected, setSelected] = useState([]);

  const history = useHistory();
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

  // function handleClick(item) {
  //   history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
  // }

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
          {t("NO_ADMINS")}
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeader
            namespace="admins"
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((admin) => {
                const isSelected = selected.indexOf(admin.id) !== -1;
                return (
                  <TableRow
                    className="h-56 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={admin.id}
                    selected={isSelected}
                    // onClick={(event) => handleClick(admin)}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, admin.id)}
                      />
                    </TableCell>

                    {/* <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      <img
                        className="w-full block rounded"
                        src={
                          admin.imageURL ??
                          `${process.env.PUBLIC_URL}/assets/images/ecommerce/product-image-placeholder.png`
                        }
                        alt={admin.name}
                      />
                    </TableCell> */}

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                    >
                      {admin.email}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                    >
                      {admin.name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {admin.lastName}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {admin.phoneNumber}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <Button
                        color="primary"
                        onClick={() => handleClickEdit(admin)}
                      >
                        <Icon>edit</Icon> {t("EDIT")}
                      </Button>
                      <Button
                        color="primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteCallback([admin.id]);
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

export default AdminsTable;

AdminsTable.propTypes = {
  data: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
};
