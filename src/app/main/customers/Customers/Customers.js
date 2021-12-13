import React, { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseLoading from "@fuse/core/FuseLoading";
import rows from "./rows";
import { deleteCustomer, getCustomers } from "../../../api-conn/customers";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { openDialog } from "app/store/fuse/dialogSlice";
import RemoveDlg from "app/common/removeDlg";
import { showMessage } from "app/store/fuse/messageSlice";

const Header = lazy(() =>
  import("app/components/HeaderPage/PageCardedHeader").then((header) => header)
);
const CustomersTable = lazy(() =>
  import("./CustomersTable").then((table) => table)
);

function Customers() {
  const { t } = useTranslation("customers");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const loadCustomers = async (pageNumber, pageSize, name) => {
    setLoading(true);
    getCustomers(pageNumber, pageSize, name)
      .then((response) => {
        setCustomers(response.data.data);
        setTotalItems(response.data.totalItems);
        setLoading(false);
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
  function handleEditCustomer(customer) {
    history.push(`/customers/${customer.id}/edit`, { customer });
  }
  const submitFilter = (searchPattern) => {
    history.push(`/customers?name=${searchPattern}`);
  };
  function handleAddCustomer() {
    history.push(`/customers_create`);
  }

  const onProceed = (itemIds) => {
    setLoading(true);

    deleteCustomer(JSON.stringify(itemIds))
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
    let _name = new URLSearchParams(location.search).get("name");

    if (_name === "" || !_name) {
      _name = undefined;
    }

    loadCustomers(pageNumber, pageSize, _name);
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
          iconText="person"
          title={t("CUSTOMERS")}
          addButtonLabel={t("ADD_CUSTOMER")}
          addButtonCallback={handleAddCustomer}
          searchHint={t("SEARCH_BY_NAME")}
          submitFilter={submitFilter}
          urlSearchCallBack="customers"
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <CustomersTable
            customers={customers}
            rows={rows}
            page={pageNumber}
            rowsPerPage={pageSize}
            handleChangeRowsPerPage={handleChangePage}
            handleChangePage={handlePageNumber}
            handleClickEdit={handleEditCustomer}
            deleteCallback={removeCustomer}
            totalItems={totalItems}
          />
        )
      }
    />
  );
}

export default memo(Customers);
