import React, { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import rows from "./rows";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { showMessage } from "app/store/fuse/messageSlice";
import whitProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import FuseLoading from "@fuse/core/FuseLoading";
import { getDrivers } from "app/api-conn/drivers";
const Header = lazy(() => import("app/components/HeaderPage/PageCardedHeader"));
const ShipmentsTab = lazy(() => import("./ShipmentsTable"));

function Shipments() {
  const { t } = useTranslation("shipments");
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const loadData = async (pageNumber, pageSize) => {
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
  };
  const handleChangePage = (event) => {
    setPageSize(event.target.value);
  };
  function handlePageNumber(event, value) {
    setPageNumber(value);
  }
  // function handleEditShipment(shipment) {
  //   history.push(`/shipments_edit/${Shipment.id}/`, { shipment });
  // }

  function handleReassign() {
    history.push("/shipments_reassign");
  }

  // const onProceed = (itemIds) => {
  //   setLoading(true);

  //   deleteShipments(JSON.stringify(itemIds))
  //     .then(() => {
  //       dispatch(
  //         showMessage({
  //           message: "Deletion completed!",
  //         })
  //       );
  //       loadData();
  //     })
  //     .catch(() => {
  //       dispatch(
  //         showMessage({
  //           message: "Error during deletion. Please try again later",
  //           variant: "error",
  //         })
  //       );
  //       setLoading(false);
  //     });
  // };
  // const removeShipment = (itemId) => {
  //   dispatch(
  //     openDialog({
  //       children: (
  //         <RemoveDlg
  //           itemId={itemId}
  //           proceedCallback={() => onProceed(itemId)}
  //           dlgTitle="Warning, you have requested a risky operation"
  //           dlgText="You are attempting to delete a Shipment, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
  //         />
  //       ),
  //     })
  //   );
  // };

  useEffect(() => {
    loadData(pageNumber, pageSize);
  }, [pageSize, pageNumber]);

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
            handleChangeRowsPerPage={handleChangePage}
            handleChangePage={handlePageNumber}
            // handleClickEdit={handleEditShipment}
            // deleteCallback={removeShipment}
            totalItems={totalItems}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(whitProtectedRoute(Shipments));
