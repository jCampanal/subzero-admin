import React, { lazy, memo, useCallback, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getSchedules } from "app/api-conn/schedules";
import { showMessage } from "app/store/fuse/messageSlice";
import rows from "./rows";
import FuseLoading from "@fuse/core/FuseLoading";
const Header = lazy(() => import("./PageCardedHeader"));
const SchedulesTable = lazy(() => import("./SchedulesTable"));

function Schedules() {
  const [schedules, setSchedules] = useState({ data: [], totalItems: 0 });
  const history = useHistory();
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
          console.log("schedules : ", response);
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
  }
  function handleChangePage(event, value) {
    setPageNumber(value);
  }

  const editCooler = (cooler) =>
    history.push(`/coolers/${cooler.id}/edit`, { cooler });

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
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
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
                  <b> {t("CODE")}:</b> {customerSearch}
                </span>
              )}
              {companySearch && (
                <span className="mr-10">
                  {" "}
                  <b>{t("DATE_1")}:</b> {companySearch}
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
            <SchedulesTable
              data={schedules.data}
              rows={rows}
              totalItems={schedules.totalItems}
            />
          )}
        </>
      }
      innerScroll
    />
  );
}

export default memo(withProtectedRoute(Schedules));
