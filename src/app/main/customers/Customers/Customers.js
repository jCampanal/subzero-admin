import React, { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseLoading from "@fuse/core/FuseLoading";
import rows from "./rows";
import { getCustomers } from "../../../api-conn/customers";
import { useHistory, useLocation } from "react-router";

const Header = lazy(() =>
  import("app/components/HeaderPage/PageCardedHeader").then((header) => header)
);
const CustomersTable = lazy(() =>
  import("./CustomersTable").then((table) => table)
);

function Customers() {
  const { t } = useTranslation("customers");
  const location = useLocation();
  const history = useHistory();
  const [customers, setCustomers] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const loadCustomers = async (pageNumber, pageSize, name) => {
    setLoading(true);
    const { data } = await getCustomers(pageNumber, pageSize, name);

    setCustomers(data);
    setLoading(false);
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
          />
        )
      }
    />
  );
}

export default memo(Customers);
