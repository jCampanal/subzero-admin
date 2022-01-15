import React, { useState } from "react";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import TableHeader from "app/components/TableHeader/TableHeader";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Button, Checkbox, Icon, TableCell, TableRow } from "@material-ui/core";
import { formatDisplayDate } from "app/lib/formatDate";
import ViewModal from "./ViewModal";

function SchedulesTable({
  data,
  rows,
  totalItems,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  editCallback,
  deleteCallback,
}) {
  const { t } = useTranslation("schedules");
  const [selected, setSelected] = useState([]);
  const [isViewModal, setIsViewModal] = useState(false);
  const [viewSchedule, setViewSchedule] = useState();

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

  function handleClick(item) {
    setViewSchedule(item);
    setIsViewModal(true);
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
          {t("NO_SCHEDULES")}
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeader
            namespace="schedules"
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
              .map((schedule) => {
                const isSelected = selected.indexOf(schedule.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={schedule.id}
                    selected={isSelected}
                    onClick={() => handleClick(schedule)}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, schedule.id)}
                      />
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {schedule.order.customer.name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {schedule.order.customer.company.name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {formatDisplayDate(new Date(schedule.nextOrder))}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <div className="grid grid-cols-3">
                        <Button
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            editCallback(schedule);
                          }}
                        >
                          <Icon className="mr-5">edit</Icon> {t("EDIT")}
                        </Button>
                        <Button color="primary">
                          <Icon className="mr-5">visibility</Icon> {t("VIEW")}
                        </Button>

                        <Button
                          color="primary"
                          onClick={() => deleteCallback([schedule.id])}
                        >
                          <Icon className="mr-5">delete</Icon> {t("DELETE")}
                        </Button>
                      </div>
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
      {viewSchedule && (
        <ViewModal
          schedule={viewSchedule}
          setIsModal={setIsViewModal}
          isModal={isViewModal}
        />
      )}
    </div>
  );
}

export default SchedulesTable;

SchedulesTable.propTypes = {
  data: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  totalItems: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  editCallback: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};
