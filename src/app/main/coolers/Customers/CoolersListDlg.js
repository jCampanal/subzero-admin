import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import { motion } from "framer-motion";
import Typography from "@material-ui/core/Typography";
import TableHeader from "../../products/Products/TableHeader";
import FuseScrollbars from "../../../../@fuse/core/FuseScrollbars/FuseScrollbars";
import { closeDialog } from "../../../store/fuse/dialogSlice";

const CoolersListDlg = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("coolers-customers");
  const [selected, setSelected] = useState([]);
  const data = props.coolers;
  console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5" className="text-center">
          {t("NO_COOLERS")}
        </Typography>
      </motion.div>
    );
  }

  return (
    <>
      <DialogTitle id="alert-dialog-title">{t("COOLERS_LIST")}</DialogTitle>
      <DialogContent>
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <TableHeader
              namespace="coolers"
              rows={props.rows}
              selectedProductIds={selected}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              onMenuItemClick={handleDeselect}
              deleteSelectedItemsCallback={() => props.deleteCallback(selected)}
            />

            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cooler) => {
                  const isSelected = selected.indexOf(cooler.item1.id) !== -1;
                  return (
                    <TableRow
                      className="h-56 cursor-pointer"
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={cooler.item1.id}
                      selected={isSelected}
                    >
                      <TableCell
                        className="w-40 md:w-64 text-center"
                        padding="none"
                      >
                        <Checkbox
                          checked={isSelected}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            handleCheck(event, cooler.item1.id)
                          }
                        />
                      </TableCell>

                      <TableCell
                        className="w-52 px-4 md:px-0"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        <img
                          className="w-full block rounded"
                          src={
                            cooler.item1.imageURL
                              ? cooler.item1.imageURL
                              : `${process.env.PUBLIC_URL}/assets/images/ecommerce/product-image-placeholder.png`
                          }
                          alt={cooler.code}
                        />
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-10"
                        component="th"
                        scope="row"
                      >
                        {cooler.item1.code}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-10"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {cooler.item1.providerName}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-10"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {cooler.item1.coolerStatus}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-10"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {new Date(cooler.item1.pickedUp).toLocaleDateString()}
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
          count={data.length}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeDialog())} color="primary">
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default CoolersListDlg;
