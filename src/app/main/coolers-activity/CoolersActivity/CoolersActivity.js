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
    id: "deliver-date",
    align: "left",
    disablePadding: false,
    label: "DELIVER_DATE",
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
  const [coolerData, setCoolerData] = useState(null);

  const loadCoolersActivity = (
    pageNumber = 0,
    pageSize = 10,
    code = undefined,
    pickedUpFrom = undefined,
    pickedUpTo = undefined
  ) => {
    setLoading(true);
    getCoolersActivity(pageNumber, pageSize, code, pickedUpFrom, pickedUpTo)
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
  // useEffect(() => {

  //   }
  // }, [location]);

  useEffect(() => {
    let _code = new URLSearchParams(location.search).get("code");
    let pickedUpFrom = new URLSearchParams(location.search).get("pickedUpFrom");
    let pickedUpTo = new URLSearchParams(location.search).get("pickedUpTo");
    if (location.state) {
      setCoolerData(location.state.cooler);
    }

    if (pickedUpFrom !== "" && pickedUpFrom) {
    } else {
      pickedUpFrom = undefined;
    }
    if (pickedUpTo !== "" && pickedUpTo) {
    } else {
      pickedUpTo = undefined;
    }

    if (_code !== "" && _code) {
    } else {
      _code = undefined;
    }

    loadCoolersActivity(pageNumber, pageSize, _code, pickedUpFrom, pickedUpTo);
  }, [location, pageSize, pageNumber]);

  const handleMoveCoolerActivity = () => {
    history.push(`/coolers_activity_move/`, {
      cooler: coolerData,
    });
  };

  function handleChangePage(event, value) {
    setPageNumber(value);
  }

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
  }

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
          <CoolersActivityTable
            coolersActivity={coolersActivity}
            rows={rows}
            page={pageNumber}
            rowsPerPage={pageSize}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(CoolersActivity);
