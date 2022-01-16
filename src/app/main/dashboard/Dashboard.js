import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getDashboardData } from "app/api-conn/dashboard";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import Widget3 from "./widgets/Widget3";
import { useTranslation } from "react-i18next";
import Widget6 from "./widgets/Widget6";

const analyticsDashboardAppDB = {
  widgets: [
    {
      id: "widget1",
      series: {
        2019: [
          {
            name: "ORDERS",
            data: [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5, 3.8, 4.1, 3.8, 3.2, 2.9],
            fill: "start",
          },
        ],
        2020: [
          {
            name: "ORDERS",
            data: [2.2, 2.9, 3.9, 2.5, 3.8, 3.2, 2.9, 1.9, 3, 3.4, 4.1, 3.8],
            fill: "start",
          },
        ],
        THIS_YEAR: [
          {
            name: "ORDERS",
            data: [3.9, 2.5, 3.8, 4.1, 1.9, 3, 3.8, 3.2, 2.9, 3.4, 2.2, 2.9],
            fill: "start",
          },
        ],
      },
      options: {
        chart: {
          type: "area",
          height: "100%",
          background: "transparent",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        theme: {
          mode: "dark",
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
        },
        markers: {
          size: 3,
          strokeWidth: 1.5,
          strokeOpacity: 1,
          strokeDashArray: 0,
          fillOpacity: 1,
          shape: "circle",
          radius: 2,
          hover: {
            size: 5,
          },
        },
        fill: {
          type: "solid",
          opacity: 0.7,
          gradient: {
            shadeIntensity: 0.4,
            opacityFrom: 1,
            opacityTo: 0.5,
            stops: [30, 100, 100],
          },
        },
        grid: {
          show: true,
          strokeDashArray: 3,
          position: "back",
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          width: 1.5,
          dashArray: 0,
        },
      },
    },
    {
      id: "widget2",
      conversion: {
        value: 492,
        ofTarget: 13,
      },
      series: [
        {
          name: "Conversion",
          data: [221, 428, 380, 471, 413, 344, 494],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: "100%",
          sparkline: {
            enabled: true,
          },
        },
        fill: {
          type: "solid",
          opacity: 0.7,
        },
        xaxis: {
          categories: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        tooltip: {
          followCursor: true,
          theme: "dark",
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
    },
    {
      id: "widget3",
      impressions: {
        value: "87k",
        ofTarget: 12,
      },
      series: [
        {
          name: "Impression",
          data: [
            67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000,
            98700, 112000, 136000, 110000, 149000, 98000,
          ],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: "100%",
          sparkline: {
            enabled: true,
          },
        },
        xaxis: {
          categories: [
            "Jan 1",
            "Jan 2",
            "Jan 3",
            "Jan 4",
            "Jan 5",
            "Jan 6",
            "Jan 7",
            "Jan 8",
            "Jan 9",
            "Jan 10",
            "Jan 11",
            "Jan 12",
            "Jan 13",
            "Jan 14",
            "Jan 15",
          ],
        },
        fill: {
          type: "solid",
          opacity: 0.7,
        },
        tooltip: {
          followCursor: true,
          theme: "dark",
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
    },

    {
      id: "widget6",
      markers: [
        {
          lat: 52,
          lng: -73,
          label: "120",
        },
        {
          lat: 37,
          lng: -104,
          label: "498",
        },
        {
          lat: 21,
          lng: -7,
          label: "443",
        },
        {
          lat: 55,
          lng: 75,
          label: "332",
        },
        {
          lat: 51,
          lng: 7,
          label: "50",
        },
        {
          lat: 31,
          lng: 12,
          label: "221",
        },
        {
          lat: 45,
          lng: 44,
          label: "455",
        },
        {
          lat: -26,
          lng: 134,
          label: "231",
        },
        {
          lat: -9,
          lng: -60,
          label: "67",
        },
        {
          lat: 33,
          lng: 104,
          label: "665",
        },
      ],
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#444444",
            },
          ],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [
            {
              color: "#f2f2f2",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              saturation: -100,
            },
            {
              lightness: 45,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified",
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              color: "#039be5",
            },
            {
              visibility: "on",
            },
          ],
        },
      ],
    },
  ],
};

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
            <Widget6
              dataArray={
                analyticsDashboardAppDB.widgets.filter(
                  (widget) => widget.id === "widget6"
                )[0]
              }
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default withProtectedRoute(withProtectedRoute(Dashboard));
