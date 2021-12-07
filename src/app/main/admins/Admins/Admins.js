import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";
import { deleteUser, getAdmins } from "app/api-conn/User";

const Header = lazy(() => import("app/components/HeaderPage/PageCardedHeader"));
const AdminsTable = lazy(() => import("./AdminsTable"));

const rows = [
  // {
  //     id: 'image',
  //     align: 'left',
  //     disablePadding: true,
  //     label: '',
  //     sort: false,
  // },
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
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();

  const loadAdmins = (pageNumber = 0, pageSize = 10, name = undefined) => {
    setLoading(true);
    getAdmins(pageNumber, pageSize, name)
      .then((data) => {
        setAdmins(data.data);
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
  };
  function handlePageNumber(event, value) {
    setPageNumber(value);
  }
  function handleEditCustomer(customer) {
    history.push(`/customers/${customer.id}/edit`, { customer });
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
        loadCustomers();
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
  const removeCustomer = (itemId) => {
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => onProceed(itemId)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a Customer, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );
  };

  useEffect(() => {
    loadAdmins(pageNumber, pageSize);
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
          iconText="supervisor_account"
          title={t("ADMINS")}
          addButtonLabel={t("ADD_ADMIN")}
          searchHint={t("SEARCH_BY_NAME")}
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
            handleClickEdit={handleEditCustomer}
            deleteCallback={removeCustomer}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(Admins);
