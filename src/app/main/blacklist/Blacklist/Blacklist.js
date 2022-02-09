import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import FuseLoading from "@fuse/core/FuseLoading";
import { getBlacklisted } from "../../../api-conn/blacklist";
import rows from "./rows";
import { showMessage } from "../../../store/fuse/messageSlice";

const Header = lazy(() =>
  import("app/main/products/Products/PageCardedHeader").then((header) => header)
);
const BlacklistTable = lazy(() =>
  import("./BlacklistTable").then((table) => table)
);

function Blacklist() {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const { t } = useTranslation("blacklist");
  const [blacklisted, setBlacklisted] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loadBlacklisted = async () => {
    setLoading(true);
    const { data } = await getBlacklisted()
      .then((response) => ({ data: response.data, error: null }))
      .catch((error) => ({ error, data: null }));
    if (data) {
      setBlacklisted(data);
    } else {
      dispatch(
        showMessage({
          message:
            "We are facing problems to get the blacklisted list. Please try again later",
          variant: "error",
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!logged) history.push("/login");
  }, [logged, history]);
  useEffect(() => {
    document.title = "Blacklist - Subzero Ice Services";
  }, []);
  useEffect(() => {
    loadBlacklisted().finally();
  }, []);
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "",
      }}
      header={
        <Header
          iconText="block"
          title={t("BLACKLIST")}
          addButtonLabel={t("ADD_TO_BLACKLIST")}
          searchHint={t("SEARCH")}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <BlacklistTable items={blacklisted} rows={rows} />
        )
      }
      innerScroll
    />
  );
}

export default memo(Blacklist);
