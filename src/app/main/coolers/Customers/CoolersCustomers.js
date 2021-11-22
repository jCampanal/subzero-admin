import React, { memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCoolersByCustomers } from "../../../api-conn/coolers";
import rows from "./rows";
import coolersRows from "../Coolers/tableRows";
import { openDialog } from "../../../store/fuse/dialogSlice";
import { showMessage } from "../../../store/fuse/messageSlice";
import FuseLoading from "../../../../@fuse/core/FuseLoading";
import PageCardedHeader from "./PageCardedHeader";
import CoolersTable from "./CoolersTable";
import CoolersListDlg from "./CoolersListDlg";

function CoolersCustomers() {
  const [coolersCustomers, setCoolersCustomers] = useState([]);
  const history = useHistory();
  const {
    user: { logged },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loadCustomers = (pageNumber = 0, pageSize = 10) => {
    setLoading(true);
    getCoolersByCustomers(pageNumber, pageSize)
      .then((response) => {
        setCoolersCustomers(response.data);
        console.log("response.data", response.data);
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
  };
  const showCoolers = (coolers) => {
    dispatch(
      openDialog({
        children: <CoolersListDlg rows={coolersRows} coolers={coolers} />,
      })
    );
  };

  useEffect(() => {
    if (!logged) history.push("/login");
  }, [logged, history]);
  useEffect(() => {
    document.title = "Coolers customers - Subzero Ice Services";
  }, []);
  useEffect(loadCustomers, []);

  return (
    <FusePageCarded
      classes={{
        content: "flex mx-14",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<PageCardedHeader />}
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <CoolersTable
            coolers={coolersCustomers.data}
            rows={rows}
            showCoolersList={showCoolers}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(CoolersCustomers);
