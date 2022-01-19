import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { Box, TableHead } from "@material-ui/core";
import { ImportExport, NextWeek } from "@material-ui/icons";
import ViewModal from "./ViewModal";
import PropType from "prop-types";

function ShipmentsTable({
  data,
  rows,
  page,
  rowsPerPage,
  totalItems,
  handleChangeRowsPerPage,
  handleChangePage,
  handleToogleOrder,
  loadOrders,
}) {
  const { t } = useTranslation("shipments");
  const [order, setOrder] = useState();
  const [isViewModal, setIsViewModal] = useState(false);

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

  const handleSetOrderModal = (order) => {
    setOrder(order);
    setIsViewModal(true);
  };
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
                  <TableCell
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                    align="right"
                  >
                    <div className="grid grid-cols-2">
                      <Button
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetOrderModal(order);
                        }}
                      >
                        <ImportExport className="mr-12" /> {t("REASIGNAR")}
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => handleToogleOrder(order)}
                      >
                        <NextWeek className="mr-12" /> {t("CHANGE STATUS")}
                      </Button>
                    </div>
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
        labelRowsPerPage={t("ROWS2_PER_PAGE")}
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

      {isViewModal && (
        <ViewModal
          data={order}
          setIsModal={setIsViewModal}
          loadOrders={loadOrders}
          isModal={isViewModal}
        />
      )}
    </div>
  );
}

export default ShipmentsTable;

ShipmentsTable.propTypes = {
  data: PropType.array.isRequired,
  rows: PropType.array.isRequired,
  page: PropType.number.isRequired,
  rowsPerPage: PropType.number.isRequired,
  totalItems: PropType.number.isRequired,
  handleChangeRowsPerPage: PropType.func.isRequired,
  handleChangePage: PropType.func.isRequired,
  handleToogleOrder: PropType.func.isRequired,
  loadOrders: PropType.func.isRequired,
};
