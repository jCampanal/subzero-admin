import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useTranslation } from "react-i18next";
import { deleteDriver, getDrivers } from "app/api-conn/drivers";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/fuse/messageSlice";
import RemoveDlg from "app/common/removeDlg";
import { openDialog } from "app/store/fuse/dialogSlice";

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
    id: "name",
    align: "left",
    disablePadding: false,
    label: "NAME",
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
  const history = useHistory();
  const { t } = useTranslation("drivers");
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();

  const loadDrivers = (pageNumber = 0, pageSize = 10, name = undefined) => {
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
  const handleClickAdd = () => {
    history.push("/drivers_create");
  };
  const handleClickEdit = (driver) => {
    history.push(`/drivers_edit/${driver.id}`, { driver });
  };
  const onProceed = (itemIds) => {
    setLoading(true);
    deleteDriver(JSON.stringify(itemIds))
      .then(() => {
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        loadDrivers();
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
  const removeDriver = (itemIds) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemIds}
            proceedCallback={() => onProceed(itemIds)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a Driver, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );

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
          addButtonCallback={handleClickAdd}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <DriversTable
            data={drivers}
            rows={rows}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            page={pageNumber}
            rowsPerPage={pageSize}
            deleteCallback={removeDriver}
            editCallback={handleClickEdit}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(Drivers);
