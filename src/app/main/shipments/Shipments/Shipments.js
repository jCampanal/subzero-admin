import React, { lazy, memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import rows from "./rows";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import whitProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import FuseLoading from "@fuse/core/FuseLoading";
import { getDrivers } from "app/api-conn/drivers";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
const Header = lazy(() => import("app/components/HeaderPage/PageCardedHeader"));
const ShipmentsTab = lazy(() => import("./ShipmentsTable"));

function Shipments() {
  const { t } = useTranslation("shipments");
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const loadData = useCallback(
    async (pageNumber, pageSize) => {
      setLoading(true);
      getDrivers(pageNumber, pageSize)
        .then((response) => {
          setData(response.data.data);
          setTotalItems(response.data.totalItems);
          setLoading(false);
          return null;
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
      setLoading(true);
    },
    [dispatch]
  );
  const handleChangePage = (event) => {
    setPageSize(event.target.value);
  };
  function handlePageNumber(event, value) {
    setPageNumber(value);
  }

  useEffect(() => {
    loadData(pageNumber, pageSize);
  }, [pageSize, pageNumber, loadData]);

  const [collapseAll, setCollapseAll] = useState(false);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <Header
          title={t("SHIPMENTS")}
          iconText="fa-truck-loading"
          disableSearch
          addButtonLabel={collapseAll ? "Close all" : "Open All"}
          addButtonCallback={() => setCollapseAll(!collapseAll)}
          addIcon={collapseAll ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <ShipmentsTab
            data={data}
            rows={rows}
            page={pageNumber}
            rowsPerPage={pageSize}
            totalItems={totalItems}
            collapseAll={collapseAll}
            handleChangeRowsPerPage={handleChangePage}
            handleChangePage={handlePageNumber}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(whitProtectedRoute(Shipments));
