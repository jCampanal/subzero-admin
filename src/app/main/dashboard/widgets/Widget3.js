import Card from "@material-ui/core/Card";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { memo } from "react";
import ReactApexChart from "react-apexcharts";
import _ from "@lodash";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function Widget3({ dataArray }) {
  const { t } = useTranslation("dashboard");
  const theme = useTheme();
  const options = {
    id: "widget2",
    conversion: {
      value: 492,
      ofTarget: 13,
    },
    series: [
      {
        name: "Conversion",
        data: dataArray,
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
  };

  const data = _.merge({}, options);

  _.setWith(data, "options.colors", [theme.palette.secondary.main]);

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-20 pb-0">
        <Typography className="h3 font-medium">{t("CANCEL")}</Typography>

        {/* <div className="flex flex-row flex-wrap items-center mt-12">
          <Typography className="text-48 font-semibold leading-none tracking-tighter">
            {data.impressions.value}
          </Typography>

          <div className="flex flex-col mx-8">
            {data.impressions.ofTarget > 0 && (
              <Icon className="text-green text-20">trending_up</Icon>
            )}
            {data.impressions.ofTarget < 0 && (
              <Icon className="text-red text-20">trending_down</Icon>
            )}
            <div className="flex items-center">
              <Typography className="font-semibold" color="textSecondary">
                {data.impressions.ofTarget}%
              </Typography>
              <Typography
                className="whitespace-nowrap mx-4"
                color="textSecondary"
              >
                of target
              </Typography>
            </div>
          </div>
        </div> */}
      </div>
      <div className="h-96 w-100-p mt-96">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type={data.options.chart.type}
          height={data.options.chart.height}
        />
      </div>
    </Card>
  );
}

export default memo(Widget3);

Widget3.propTypes = {
  dataArray: PropTypes.array.isRequired,
};
