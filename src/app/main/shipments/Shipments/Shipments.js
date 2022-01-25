import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import whitProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getAllDrivers } from "app/api-conn/drivers";
import ListShipmets from "./NewShimpmets/ListShipmets";
import FuseLoading from "@fuse/core/FuseLoading";

function Shipments() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    getAllDrivers()
      .then((response) => {
        setData(response.data);

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
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Fragment>
      {loading ? <FuseLoading /> : <ListShipmets drivers={data} />}
    </Fragment>
  );

  /* return (
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
    /> */
}

export default memo(whitProtectedRoute(Shipments));
