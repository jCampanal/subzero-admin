import React, { useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import FuseLoading from "@fuse/core/FuseLoading";
import { deleteProviders, getProviders } from "../../../../api-conn/providers";
import rows from "./rows";
import { openDialog } from "../../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../../common/removeDlg";
import { showMessage } from "../../../../store/fuse/messageSlice";
import PageCardedHeader from "../../../../components/HeaderPage/PageCardedHeader";
import ProvidersTable from "./ProvidersTable";

const Providers = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    user: { logged },
  } = useSelector((state) => state);
  const { t } = useTranslation("providers");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [providers, setProviders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const loadProviders = (pageSize = 10, pageNumber = 0, name = undefined) => {
    setLoading(true);
    getProviders(pageNumber, pageSize, name)
      .then((response) => {
        setProviders(response.data.data);
        setTotalItems(response.data.totalItems);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Something went wrong. Try to reload the page",
            variant: "error",
          })
        );
      });
  };
  const showProvider = (provider) =>
    history.push(`/providers/${provider.id}`, { provider });
  const onProceed = (ids) => {
    setLoading(true);
    console.log("Delete provider", ids);
    deleteProviders(JSON.stringify(ids))
      .then(() => {
        dispatch(
          showMessage({
            message: t("DELETE_SUCCESSFUL"),
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
        setLoading(false);
        loadProviders();
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showMessage({
            message: t("DELETE_ERROR"),
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });
  };
  const editProvider = (provider) =>
    history.push(`/providers/${provider.id}/edit`, { provider });
  const deleteProvider = (ids) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={ids}
            proceedCallback={() => onProceed(ids)}
            dlgTitle={t("WARNING_TITLE")}
            dlgText={t("WARNING_TEXT")}
          />
        ),
      })
    );

  useEffect(() => {
    if (!logged) history.push("/login");
  }, [logged, history]);
  useEffect(() => {
    document.title = t("PAGE_TITLE");
  }, [t]);

  useEffect(() => {
    let _name = new URLSearchParams(location.search).get("name");
    if (_name === "" || !_name) {
      _name = undefined;
    }
    loadProviders(pageSize, pageNumber, _name);
  }, [location, pageSize, pageNumber]);

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
  }
  function handleChangePage(event, value) {
    setPageNumber(value);
  }

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <PageCardedHeader
          iconText="business"
          title="Providers"
          addButtonLabel={t("ADD")}
          addButtonCallback={() => history.push("/providers_create")}
          searchHint="Search by name"
          urlSearchCallBack="providers"
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <ProvidersTable
            rows={rows}
            providers={providers}
            rows={rows}
            page={pageNumber}
            rowsPerPage={pageSize}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            showProvider={showProvider}
            editCallback={editProvider}
            deleteCallback={deleteProvider}
            totalItems={totalItems}
          />
        )
      }
      innerScroll
    />
  );
};

export default Providers;
