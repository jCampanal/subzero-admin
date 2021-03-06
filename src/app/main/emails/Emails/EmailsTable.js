import React, { useState } from "react";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { withRouter } from "react-router-dom";
import TableHeader from "app/components/TableHeader/TableHeader";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import _ from "lodash";

function EmailsTable({
  data,
  rows,
  page,
  totalItems,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
}) {
  const { t } = useTranslation("emails");
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

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography
          color="textSecondary"
          variant="h5"
          className="text-center px-5"
        >
          {t("NO_EMAILS")}
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeader
            namespace="emails"
            rows={rows}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            disableCheck
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "to": {
                      return o.toEmail;
                    }
                    case "subtitle": {
                      return o.subtitle;
                    }
                    case "subject": {
                      return o.subject;
                    }
                    case "status": {
                      return "Sent";
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
              .map((email, i) => {
                return (
                  <TableRow
                    className="h-56 cursor-pointer"
                    hover
                    /*  key={email.emailId} */
                    key={i}
                  >
                    {/* <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {email.hasAttachments && <Icon>attach_file</Icon>}
                    </TableCell> */}

                    {/* <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                    >
                      {email.id}
                    </TableCell> */}

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                    >
                      {email.toEmail}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {email.subtitle.slice(0, 49)}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {email.subject.slice(0, 49)}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-10"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      Sent
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

export default withRouter(EmailsTable);

EmailsTable.propTypes = {
  data: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};
