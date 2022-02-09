import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";
import { deleteUser, getAdmins } from "app/api-conn/User";
import { useHistory, useLocation } from "react-router";
import RemoveDlg from "app/common/removeDlg";
import { openDialog } from "app/store/fuse/dialogSlice";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const Header = lazy(() => import("app/components/HeaderPage/PageCardedHeader"));
const AdminsTable = lazy(() => import("./AdminsTable"));

const rows = [
  {
    id: "email",
    align: "left",
    disablePadding: false,
    label: "EMAIL",
    sort: true,
  },
  {
    id: "first-name",
    align: "left",
    disablePadding: false,
    label: "FIRST_NAME",
    sort: true,
  },
  {
    id: "last-name",
    align: "left",
    disablePadding: false,
    label: "LAST_NAME",
    sort: true,
  },
  {
    id: "phone",
    align: "left",
    disablePadding: false,
    label: "PHONE",
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

function Admins() {
  const { t } = useTranslation("admins");
  const location = useLocation();
  const history = useHistory();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();

  const loadAdmins = (pageNumber = 0, pageSize = 10, name = undefined) => {
    setLoading(true);
    getAdmins(pageSize, pageNumber, name)
      .then((data) => {
        setTotalItems(data.data.totalItems);
        setAdmins(data.data.data);
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

  const handleChangePage = (event) => {
    setPageSize(event.target.value);
    setPageNumber(0);
  };
  function handlePageNumber(event, value) {
    setPageNumber(value);
  }
  function handleEditAdmin(admin) {
    history.push(`/admins_edit/${admin.id}`, { admin });
  }
  function handleAddAdmin() {
    history.push("/admins_create");
  }

  const onProceed = (itemIds) => {
    setLoading(true);

    deleteUser(JSON.stringify(itemIds))
      .then(() => {
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        loadAdmins();
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
  const removeAdmin = (itemId) => {
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => onProceed(itemId)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a Admin, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );
  };

  useEffect(() => {
    let _name = new URLSearchParams(location.search).get("name");
    if (_name === "" || !_name) {
      _name = undefined;
    }
    loadAdmins(pageNumber, pageSize, _name);
  }, [location, pageSize, pageNumber]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "",
      }}
      header={
        <Header
          iconText="supervisor_account"
          title={t("ADMINS")}
          addButtonLabel={t("ADD_ADMIN")}
          searchHint={t("SEARCH_BY_NAME")}
          urlSearchCallBack={"admins"}
          addButtonCallback={handleAddAdmin}
          totalItems={totalItems}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <AdminsTable
            data={admins}
            rows={rows}
            page={pageNumber}
            rowsPerPage={pageSize}
            handleChangeRowsPerPage={handleChangePage}
            handleChangePage={handlePageNumber}
            handleClickEdit={handleEditAdmin}
            deleteCallback={removeAdmin}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(withProtectedRoute(Admins));
