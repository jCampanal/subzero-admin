import Typography from "@material-ui/core/Typography";
import React, { lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getDashboardData } from "app/api-conn/dashboard";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import Widget3 from "./widgets/Widget3";
import { useTranslation } from "react-i18next";
const Widget6 = lazy(() => import("./widgets/Widget6"));

const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const dispatch = useDispatch();

  const [data, setData] = useState({
    processedOrdersThisYear: [],
    confirmedOrdersLastWeek: [],
    cancelOrdersLastWeek: [],
    customersAdresses: [],
  });

  useEffect(() => {
    const getData = () => {
      getDashboardData()
        .then((res) => {
          setData(res.data);
          return null;
        })
        .catch(() => {
          dispatch(
            showMessage({
              message: "There is something wrong, try to refresh the page",
              variant: "error",
            })
          );
          // setLoading(false);
        });
    };

    getData();
  }, [dispatch]);
  return (
    <div className="w-full">
      <Widget1 dataArray={data.processedOrdersThisYear} />

      <motion.div
        className="flex flex-col md:flex-row sm:p-8 container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-1 flex-col min-w-0 pt-16">
          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-normal"
            color="textSecondary"
          >
            {t("TRENDING")}
          </Typography>

          <div className="flex flex-col sm:flex sm:flex-row pb-32">
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/3 p-16"
            >
              <Widget2 dataArray={data.confirmedOrdersLastWeek} />
            </motion.div>
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/3 p-16"
            >
              <Widget3 dataArray={data.cancelOrdersLastWeek} />
            </motion.div>
          </div>

          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-normal"
            color="textSecondary"
          >
            {t("WHERE_CUSTOMER")}
          </Typography>

          <motion.div variants={item} className="widget w-full p-16 pb-32">
            <Widget6 dataArray={data.customersAdresses} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default withProtectedRoute(withProtectedRoute(Dashboard));
