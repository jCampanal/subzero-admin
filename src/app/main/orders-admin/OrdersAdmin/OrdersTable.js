import React, { useEffect, useState } from "react";
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
import TableHeader from "app/main/products/Products/TableHeader";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import { getOrdersByWhareHose } from "app/api-conn/shipments_order";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import { ShipmentStatus } from "../helpData";

function OrdersTable({ wharehoseId, rows }) {
  const { t } = useTranslation("orders-admin");
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState({ data: [], totalItems: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const location = useLocation();
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
      setSelected(data.data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
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

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  useEffect(() => {
    let _compnay = new URLSearchParams(location.search).get("company");
    let _noOrder = new URLSearchParams(location.search).get("noOrden");
    let date1 = new URLSearchParams(location.search).get("pickedUpFrom");
    let date2 = new URLSearchParams(location.search).get("pickedUpTo");

    if (_compnay === "" || !_compnay) {
      _compnay = undefined;
    }
    if (_noOrder === "" || !_noOrder) {
      _noOrder = undefined;
    }
    if (date1 === "" || !date1) {
      date1 = undefined;
    }
    if (date2 === "" || !date2) {
      date2 = undefined;
    }
    getOrdersByWhareHose(
      wharehoseId,
      date2,
      _compnay,
      date1,
      _noOrder,
      rowsPerPage,
      page
    )
      .then((res) => {
        setData({
          data: res.data.data,
          totalItems: res.data.totalItems,
        });
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: t("PROBLEM_FETCHING"),
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            variant: "error",
          })
        );
      });
  }, [wharehoseId, t, dispatch, location.search, page, rowsPerPage]);

  if (data.data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          {t("NO_ORDERS")}
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeader
            namespace="orders-admin"
            rows={rows}
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {data.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                const isSelected = selected.indexOf(item.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={item.id}
                    selected={isSelected}
                    onClick={() => handleClick(item)}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
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
                      {item.deliveryTime}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <span
                        className={`text-${ShipmentStatus[item.status].tColor}`}
                      >
                        <i
                          className={`fa ${
                            ShipmentStatus[item.status].icon
                          } mr-2`}
                        />
                        {t(ShipmentStatus[item.status].name)}
                      </span>
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <Button color="primary">
                        <Icon>edit</Icon> {t("EDIT")}
                      </Button>
                      <Button color="primary">
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
        count={data.totalItems}
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

export default OrdersTable;

OrdersTable.propTypes = {
  wharehoseId: PropTypes.number,
  rows: PropTypes.array.isRequired,
};
