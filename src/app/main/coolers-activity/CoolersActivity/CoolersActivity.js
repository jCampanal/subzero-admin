import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useHistory, useLocation, useParams } from "react-router";
import { getCoolersActivity } from "app/api-conn/coolers";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";

const Header = lazy(() => import("./PageCardedHeader"));
const CoolersActivityTable = lazy(() => import("./CoolersActivityTable"));

const rows = [
  {
    id: "code",
    align: "left",
    disablePadding: false,
    label: "CODE",
    sort: true,
  },

  {
    id: "from",
    align: "left",
    disablePadding: false,
    label: "FROM",
    sort: true,
  },
  {
    id: "to",
    align: "left",
    disablePadding: false,
    label: "TO",
    sort: true,
  },
  {
    id: "driver",
    align: "left",
    disablePadding: false,
    label: "DRIVER",
    sort: true,
  },
  {
    id: "date",
    align: "left",
    disablePadding: false,
    label: "DATE",
    sort: true,
  },
  {
    id: "actions",
    align: "left",
    disablePadding: false,
    label: "",
    sort: false,
  },
];

function CoolersActivity() {
  const [coolersActivity, setCoolersActivity] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const {
    user: { logged },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [code, setCode] = useState(undefined);
  const [dateTime, setDateTime] = useState(undefined);
  const [coolerData, setCoolerData] = useState(null);

  const loadCoolersActivity = (
    pageNumber = 0,
    pageSize = 10,
    code = undefined,
    dateTime = undefined
  ) => {
    setLoading(true);
    getCoolersActivity({ pageNumber, pageSize, code, dateTime })
      .then((response) => {
        setCoolersActivity(response.data.data);
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

  useEffect(() => {
    if (!logged) history.push("/login");
  }, [logged, history]);

  useEffect(() => {
    document.title = "CoolersActivity - Subzero Ice Services";
  }, []);
  useEffect(() => {
    const _code = new URLSearchParams(location.search).get("code");
    const _date = new URLSearchParams(location.search).get("date");
    if (location.state) {
      setCoolerData(location.state.cooler);
    }

    if (_date !== "" && _date) {
      setDateTime(_date);
    } else {
      setDateTime(undefined);
    }

    if (_code !== "" && _code) {
      setCode(_code);
    } else {
      setCode(undefined);
    }
  }, [location]);

  useEffect(() => {
    loadCoolersActivity(pageNumber, pageSize, code, dateTime);
  }, [code, dateTime, pageSize, pageNumber]);

  const handleMoveCoolerActivity = () => {
    history.push(`/coolers_activity_move/`, {
      cooler: coolerData,
    });
  };
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <Header
          code={coolerData ? coolerData.code : null}
          handleMoveCoolerActivity={handleMoveCoolerActivity}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <CoolersActivityTable coolersActivity={coolersActivity} rows={rows} />
        )
      }
      innerScroll
    />
  );
}

export default memo(CoolersActivity);
