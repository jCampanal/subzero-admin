import React, { lazy, memo, useCallback, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import {
  deleteSchedule,
  getSchedules,
  toggleStatus,
} from "app/api-conn/schedules";
import { showMessage } from "app/store/fuse/messageSlice";
import rows from "./rows";
import FuseLoading from "@fuse/core/FuseLoading";
import RemoveDlg from "app/common/removeDlg";
import { openDialog } from "app/store/fuse/dialogSlice";
const Header = lazy(() => import("./PageCardedHeader"));
const SchedulesTable = lazy(() => import("./SchedulesTable"));

function Schedules() {
  const [schedules, setSchedules] = useState({ data: [], totalItems: 0 });
  const location = useLocation();
  const { t } = useTranslation("schedules");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [customerSearch, setcustomerSearch] = useState("");
  const [companySearch, setcompanySearch] = useState("");

  const loadSchedules = useCallback(
    (
      pageNumber = 0,
      pageSize = 10,
      company = undefined,
      customer = undefined
    ) => {
      setLoading(true);
      getSchedules(pageNumber, pageSize, company, customer)
        .then((response) => {
          setSchedules({
            data: response.data.data,
            totalItems: response.data.totalItems,
          });
          setLoading(false);
          return false;
        })
        .catch(() => {
          dispatch(
            showMessage({
              message: "There is something wrong, try to refresh the page",
              variant: "error",
            })
          );
          setLoading(false);
        });
    },
    [dispatch]
  );

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
    setPageNumber(0);
  }
  function handleChangePage(event, value) {
    setPageNumber(value);
  }

  const onProceed = (itemIds) => {
    setLoading(true);
    deleteSchedule(JSON.stringify(itemIds))
      .then(() => {
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        loadSchedules();
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "Error during deletion. Please try again later",
            variant: "error",
          })
        );
        setLoading(false);
      });
  };
  const removeCooler = (itemId) => {
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => onProceed(itemId)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a cooler, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );
  };
  const handleSetOnGoing = (id) => {
    toggleStatus(id)
      .then(() => {
        loadSchedules(pageNumber, pageSize);

        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
      });
  };

  useEffect(() => {
    document.title = "Schedules - Subzero Ice Services";
  }, []);

  useEffect(() => {
    let _compnay = new URLSearchParams(location.search).get("company");
    let _customer = new URLSearchParams(location.search).get("customer");

    if (_compnay === "" || !_compnay) {
      _compnay = undefined;
    }
    if (_customer === "" || !_customer) {
      _customer = undefined;
    }
    setcustomerSearch(_customer);
    setcompanySearch(_compnay);

    loadSchedules(pageNumber, pageSize, _compnay, _customer);
  }, [location.search, pageSize, pageNumber, loadSchedules]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "",
      }}
      header={<Header />}
      contentToolbar={
        <div className="p-16 sm:p-24 max-w-2xl">
          {(customerSearch || companySearch) && (
            <span>
              {t("SEARCH_RESULT")} (
              {customerSearch && (
                <span className="mr-10">
                  {" "}
                  <b> {t("CUSTOMER")}:</b> {customerSearch}
                </span>
              )}
              {companySearch && (
                <span className="mr-10">
                  {" "}
                  <b>{t("COMPANY")}:</b> {companySearch}
                </span>
              )}
              )
            </span>
          )}
        </div>
      }
      content={
        <>
          {loading ? (
            <FuseLoading />
          ) : (
            <>
              <SchedulesTable
                data={schedules.data}
                rows={rows}
                totalItems={schedules.totalItems}
                page={pageNumber}
                rowsPerPage={pageSize}
                deleteCallback={removeCooler}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleSetOnGoing={handleSetOnGoing}
              />
            </>
          )}
        </>
      }
      innerScroll
    />
  );
}

export default memo(withProtectedRoute(Schedules));
