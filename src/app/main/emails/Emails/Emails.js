import React, { lazy, memo, useEffect, useState, useCallback } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import rows from "./rows";
import { getEmails } from "../../../api-conn/emails";
import { showMessage } from "../../../store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";

const Header = lazy(() =>
  import("app/components/HeaderPage/PageCardedHeader").then((header) => header)
);
const EmailsTable = lazy(() => import("./EmailsTable").then((table) => table));

function Emails() {
  const { t } = useTranslation("emails");

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();

  const loadEmails = useCallback(
    (pageNumber = 0, pageSize = 10) => {
      setLoading(true);
      getEmails(pageNumber, pageSize)
        .then((data) => {
          setEmails(data.data.data);
          setTotalItems(data.data.totalItems);

          setLoading(false);
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
          setLoading(false);
        });
    },
    [dispatch, t]
  );

  function handleChangePage(event, value) {
    setPageNumber(value);
    console.log("page", value);
  }

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
  }

  useEffect(() => {
    loadEmails(pageNumber, pageSize);
  }, [pageSize, pageNumber, loadEmails]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <Header
          iconText="email"
          title={t("EMAILS")}
          addButtonLabel=""
          searchHint=""
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <EmailsTable
            data={emails}
            rows={rows}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            page={pageNumber}
            rowsPerPage={pageSize}
            totalItems={totalItems}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(Emails);
