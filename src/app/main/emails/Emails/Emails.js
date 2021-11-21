import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import rows from "./rows";
import { getEmails } from "../../../api-conn/emails";
import { showMessage } from "../../../store/fuse/messageSlice";

const Header = lazy(() =>
  import("app/main/products/Products/PageCardedHeader").then((header) => header)
);
const EmailsTable = lazy(() => import("./EmailsTable").then((table) => table));

function Emails() {
  const { t } = useTranslation("emails");
  const [emails, setEmails] = useState({ data: [] });
  const dispatch = useDispatch();

  const fetchEmailData = () => {
    const loadEmails = async () => {
      const { data, error } = await getEmails()
        .then((response) => ({ data: response.data }))
        .catch((e) => ({ error: e }));
      if (data) setEmails(data);
      if (error)
        dispatch(
          showMessage({
            message: error.message,
            variant: "error",
          })
        );
    };
    loadEmails().finally();
  };

  useEffect(fetchEmailData, [dispatch]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <Header
          iconText="email"
          title={t("EMAILS")}
          addButtonLabel=""
          searchHint=""
        />
      }
      content={<EmailsTable emails={emails} rows={rows} />}
      innerScroll
    />
  );
}

export default memo(Emails);
