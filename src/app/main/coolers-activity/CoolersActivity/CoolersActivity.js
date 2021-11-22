import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useHistory } from "react-router";
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
  // {
  //   id: "image",
  //   align: "left",
  //   disablePadding: false,
  //   label: "",
  //   sort: true,
  // },
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
  const {
    user: { logged },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const moveCooler = (id) => {
    const cooler = coolersActivity.find((cooler) => cooler.code === id);

    history.push(`/coolers_activity_move/${id}`, { cooler });
  };

  const loadCoolersActivity = (
    pageNumber = 0,
    pageSize = 10,
    code = undefined
  ) => {
    setLoading(true);
    getCoolersActivity(pageNumber, pageSize, code)
      .then((response) => {
        setCoolersActivity(response.data.data);
        console.log("coolers activity", response.data);
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
  useEffect(loadCoolersActivity, []);
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<Header />}
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <CoolersActivityTable
            coolersActivity={coolersActivity}
            moveCallback={moveCooler}
            rows={rows}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(CoolersActivity);
