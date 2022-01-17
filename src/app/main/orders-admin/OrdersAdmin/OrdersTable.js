import React, { useEffect, useState } from "react";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import TableHeader from "app/main/products/Products/TableHeader";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import { getOrdersByWhareHose } from "app/api-conn/shipments_order";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import CustomTableRow from "./CustomTableRow";
const response = {
  data: [
    {
      id: "67b6e5fsdsd40-0985-49e2-8a7a-3af8278f6e2e",
      no: 0,
      deliveryTime: "2021-09-12T05:50:00.0000000",
      tag: "Dry Ice",
      status: "Waiting",
      priority: 1,
      pickUp: false,
      address: {
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        street: "Wall Street",
        city: "New York",
        state: "New York",
        zipCode: 10001,
      },
      driver: {
        email: "test@admin.com",
        enabled: true,
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        imageURL: "url",
        lastName: "Pérez",
        name: "Juan",
        phoneNumber: "test@admin.com",
        userName: "Pedro",
        warehouse: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "FLL Warehouse",
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
        },
      },
      customer: {
        company: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "Company 1",
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
        },
        email: "test@admin.com",
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        imageURL: "url",
        lastName: "Pérez",
        listID: "80000002-1636062834",
        name: "Juan",
        phoneNumber: "test@admin.com",
        priorityCustomer: false,
        userName: "Juan",
      },
      products: [
        {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          pendingQuanty: 200,
          completed: true,
          description: "Dry Ice 4 kg",
          quanty: 1,
          name: "Dry Ice",
          productTypeId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          listID: "80000002-1636062834",
        },
      ],
      listID: "80000002-1636062834",
    },
    {
      id: "67b6e5fsdsd40-0985-49e2-8a7a-3aasdf8278f6e2e",
      no: 0,
      deliveryTime: "2021-09-12T05:50:00.0000000",
      tag: "Dry Ice",
      status: "Waiting",
      priority: 1,
      pickUp: false,
      address: {
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        street: "Wall Street",
        city: "New York",
        state: "New York",
        zipCode: 10001,
      },
      driver: {
        email: "test@admin.com",
        enabled: true,
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        imageURL: "url",
        lastName: "Pérez",
        name: "Juan",
        phoneNumber: "test@admin.com",
        userName: "Pedro",
        warehouse: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "FLL Warehouse",
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
        },
      },
      customer: {
        company: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "Company 1",
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
        },
        email: "test@admin.com",
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        imageURL: "url",
        lastName: "Pérez",
        listID: "80000002-1636062834",
        name: "Juan",
        phoneNumber: "test@admin.com",
        priorityCustomer: false,
        userName: "Juan",
      },
      products: [
        {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          pendingQuanty: 200,
          completed: true,
          description: "Dry Ice 4 kg",
          quanty: 1,
          name: "Dry Ice",
          productTypeId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          listID: "80000002-1636062834",
        },
      ],
      listID: "80000002-1636062834",
    },
    {
      id: "67b6e5fsdsadsd40-0985-49e2-8a7a-3aasdf8278f6e2e",
      no: 0,
      deliveryTime: "2021-09-12T05:50:00.0000000",
      tag: "Dry Ice",
      status: "Waiting",
      priority: 1,
      pickUp: false,
      address: {
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        street: "Wall Street",
        city: "New York",
        state: "New York",
        zipCode: 10001,
      },
      driver: {
        email: "test@admin.com",
        enabled: true,
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        imageURL: "url",
        lastName: "Pérez",
        name: "Juan",
        phoneNumber: "test@admin.com",
        userName: "Pedro",
        warehouse: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "FLL Warehouse",
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
        },
      },
      customer: {
        company: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "Company 1",
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
        },
        email: "test@admin.com",
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        imageURL: "url",
        lastName: "Pérez",
        listID: "80000002-1636062834",
        name: "Juan",
        phoneNumber: "test@admin.com",
        priorityCustomer: false,
        userName: "Juan",
      },
      products: [
        {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          pendingQuanty: 200,
          completed: true,
          description: "Dry Ice 4 kg",
          quanty: 1,
          name: "Dry Ice",
          productTypeId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          listID: "80000002-1636062834",
        },
      ],
      listID: "80000002-1636062834",
    },
  ],
  totalPages: 5,
  currentPage: 1,
  haveNext: true,
  havePrevious: true,
  totalItems: 15,
};

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
      .then(() => {
        const res = response;
        setData({
          data: res.data,
          totalItems: res.totalItems,
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
                  <CustomTableRow
                    key={item.id}
                    item={item}
                    isSelected={isSelected}
                    handleCheck={handleCheck}
                    handleClick={handleClick}
                  />
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
