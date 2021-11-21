import React, { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseLoading from "@fuse/core/FuseLoading";
import rows from "./rows";
import { getCustomers } from "../../../api-conn/customers";

const Header = lazy(() =>
  import("app/main/products/Products/PageCardedHeader").then((header) => header)
);
const CustomersTable = lazy(() =>
  import("./CustomersTable").then((table) => table)
);

function Customers() {
  const { t } = useTranslation("customers");
  const [customers, setCustomers] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    const { data } = await getCustomers();

    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers().finally();
  }, []);

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
          addButtonCallback={() => null}
          searchHint={t("SEARCH_BY_NAME")}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <CustomersTable customers={customers} rows={rows} />
        )
      }
    />
  );
}

export default memo(Customers);
