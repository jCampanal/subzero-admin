import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useTranslation } from "react-i18next";
import { getDrivers } from "app/api-conn/drivers";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/fuse/messageSlice";

const Header = lazy(() => import("app/components/HeaderPage/PageCardedHeader"));
const DriversTable = lazy(() => import("./DriversTable"));

const rows = [
  {
    id: "image",
    align: "left",
    disablePadding: true,
    label: "",
    sort: false,
  },
  {
    id: "username",
    align: "left",
    disablePadding: false,
    label: "USERNAME",
    sort: true,
  },
  {
    id: "full-name",
    align: "left",
    disablePadding: false,
    label: "FULL_NAME",
    sort: true,
  },
  {
    id: "warehouse",
    align: "left",
    disablePadding: false,
    label: "WAREHOUSE",
    sort: true,
  },
  {
    id: "actions",
    align: "right",
    disablePadding: false,
    label: "",
    sort: false,
  },
];
const dummyDrivers = [
  { id: 1, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 2, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 3, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 4, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 5, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 6, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 7, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 8, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 9, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 10, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 11, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 12, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 13, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 14, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
  { id: 15, username: "gue", name: "Gue Ipsum", warehouse: "Lorem" },
];

function Drivers() {
  const location = useLocation();
  const { t } = useTranslation("drivers");
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();

  const loadDrivers = (pageSize = 10, pageNumber = 0, name = undefined) => {
    setLoading(true);
    getDrivers(pageNumber, pageSize, name)
      .then((data) => {
        setDrivers(data.data.data);
        setLoading(false);
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
  };
  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
  }
  function handleChangePage(event, value) {
    setPageNumber(value);
  }

  useEffect(() => {
    let _name = new URLSearchParams(location.search).get("name");
    if (_name === "" || !_name) {
      _name = undefined;
    }
    loadDrivers(pageNumber, pageSize, _name);
  }, [location, pageSize, pageNumber]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <Header
          iconText="local_shipping"
          title={t("DRIVERS")}
          addButtonLabel={t("ADD_DRIVER")}
          searchHint={t("SEARCH_BY_NAME")}
          disableSearch
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <DriversTable
            drivers={drivers}
            rows={rows}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            pageNumber={pageNumber}
            pageSize={pageSize}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(Drivers);
