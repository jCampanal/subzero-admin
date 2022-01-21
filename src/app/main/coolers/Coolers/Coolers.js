import React, { memo, useCallback, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { deleteCooler, getCoolers } from "../../../api-conn/coolers";
import rows from "./tableRows";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import { showMessage } from "../../../store/fuse/messageSlice";
import FuseLoading from "../../../../@fuse/core/FuseLoading";
import PageCardedHeader from "./PageCardedHeader";
import CoolersTable from "./CoolersTable";
import whitProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { useTranslation } from "react-i18next";

function Coolers() {
  const [coolers, setCoolers] = useState({ data: [] });
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation("coolers");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [codigoSearch, setcodigoSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [dateSearch2, setDateSearch2] = useState("");

  const loadCoolers = useCallback(
    (
      pageNumber = 0,
      pageSize = 10,
      code = undefined,
      pickedUpFrom = undefined,
      pickedUpTo = undefined
    ) => {
      setLoading(true);
      getCoolers(pageNumber, pageSize, code, pickedUpFrom, pickedUpTo)
        .then((response) => {
          setCoolers(response.data);
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
    },
    [dispatch]
  );
  const onProceed = (itemIds) => {
    setLoading(true);
    deleteCooler(JSON.stringify(itemIds))
      .then(() => {
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        loadCoolers();
        return null;
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
  const removeCooler = (itemId) => {
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => onProceed(itemId)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a cooler, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );
  };

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
    setPageNumber(0);
  }
  function handleChangePage(event, value) {
    setPageNumber(value);
  }

  const createCooler = () => history.push("/coolers_create");
  const editCooler = (cooler) =>
    history.push(`/coolers/${cooler.id}/edit`, { cooler });

  useEffect(() => {
    document.title = "Coolers - Subzero Ice Services";
  }, []);

  useEffect(() => {
    let _code = new URLSearchParams(location.search).get("code");
    let pickedUpFrom = new URLSearchParams(location.search).get("pickedUpFrom");
    let pickedUpTo = new URLSearchParams(location.search).get("pickedUpTo");

    if (pickedUpFrom === "" || !pickedUpFrom) {
      pickedUpFrom = undefined;
    }
    if (pickedUpTo === "" || !pickedUpTo) {
      pickedUpTo = undefined;
    }

    if (_code === "" || !_code) {
      _code = undefined;
    }

    setcodigoSearch(_code);
    setDateSearch(pickedUpFrom);
    setDateSearch2(pickedUpTo);

    loadCoolers(pageNumber, pageSize, _code, pickedUpFrom, pickedUpTo);
  }, [location, pageSize, pageNumber, loadCoolers]);

  return (
    <FusePageCarded
      classes={{
        content: "flex mx-14",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <PageCardedHeader
          addCallback={createCooler}
          searchCallback={loadCoolers}
        />
      }
      contentToolbar={
        <div className="p-16 sm:p-24 max-w-2xl">
          {(codigoSearch || dateSearch || dateSearch2) && (
            <span>
              {t("SEARCH_RESULT")} (
              {codigoSearch && (
                <span className="mr-10">
                  {" "}
                  <b> {t("CODE")}:</b> {codigoSearch}
                </span>
              )}
              {dateSearch && (
                <span className="mr-10">
                  {" "}
                  <b>{t("DATE_1")}:</b> {dateSearch}
                </span>
              )}
              {dateSearch2 && (
                <span className="mr-10">
                  {" "}
                  <b> {t("DATE_2")}:</b> {dateSearch2}{" "}
                </span>
              )}
              )
            </span>
          )}
        </div>
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <CoolersTable
            coolers={coolers}
            rowsPerPage={pageSize}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={pageNumber}
            handleChangePage={handleChangePage}
            rows={rows}
            editCallback={editCooler}
            deleteCallback={removeCooler}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(whitProtectedRoute(Coolers));
