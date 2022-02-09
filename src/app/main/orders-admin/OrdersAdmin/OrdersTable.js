import React, { useEffect, useState } from "react";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import TableHeader from "app/components/TableHeader/TableHeader";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { cancelOrder } from "app/api-conn/shipments_order";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import CustomTableRow from "./CustomTableRow";
import ViewModal from "./modals/ViewModal";
import RemoveDlg from "app/common/removeDlg";
import { openDialog } from "app/store/fuse/dialogSlice";
import { fetchOrders } from "app/store/oredersAdmin/ordersAdminSlice";

function OrdersTable({ wharehose, rows, data }) {
  const { t } = useTranslation("orders-admin");
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const location = useLocation();

  const [isViewModal, setIsViewModal] = useState(false);
  const [viewOrder, setViewOrder] = useState();
  const [isLoad, setIsLoad] = useState(false);

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

  function handleClick(order) {
    setViewOrder(order);
    setIsViewModal(true);
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
    dispatch(
      fetchOrders({
        wharehose: wharehose,
        date2,
        _compnay,
        date1,
        _noOrder,
        rowsPerPage,
        page,
      })
    );

    // .catch(() => {
    //   dispatch(
    //     showMessage({
    //       message: t("PROBLEM_FETCHING"),
    //       anchorOrigin: {
    //         vertical: "top",
    //         horizontal: "right",
    //       },
    //       variant: "error",
    //     })
    //   );
    // });
  }, [wharehose, t, dispatch, location.search, page, rowsPerPage, isLoad]);

  // useEffect(() => {
  //   handleCountOrders(data.length);
  // }, [data]);

  const acceptCancelOrder = (id) => {
    cancelOrder(id)
      .then(() => {
        setIsLoad(!isLoad);
        return null;
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: error.response.data.title ?? error.response.data.message,
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });
  };
  const cancelOder = (order) => {
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={order.id}
            proceedCallback={() => acceptCancelOrder(order.id)}
            dlgTitle={t("DELETE_WARNING_TITLE")}
            dlgText={`You are going to cancel the order ${order.no}. Proceed with the request?`}
          />
        ),
      })
    );
  };

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
      <FuseScrollbars className="flex-grow overflow-x-auto ">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeader
            namespace="orders-admin"
            rows={rows}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.data.length}
            disableCheck
          />

          <TableBody>
            {data.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <CustomTableRow
                    key={item.id}
                    item={item}
                    handleClick={handleClick}
                    handleCancelOrder={cancelOder}
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

      {viewOrder && (
        <ViewModal
          data={viewOrder}
          setIsModal={setIsViewModal}
          isModal={isViewModal}
        />
      )}
    </div>
  );
}

export default OrdersTable;

OrdersTable.propTypes = {
  wharehose: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};
