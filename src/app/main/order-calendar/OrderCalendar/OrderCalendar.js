import React, { lazy, memo } from "react";
import { useTranslation } from "react-i18next";
import DateRangeIcon from "@material-ui/icons/DateRange";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import TableBody from "@material-ui/core/TableBody";

const OrdersByDateTab = lazy(() => import("./OrdersByDateTab"));

const Days = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};
const dummyCompanies = [
  "posuere",
  "sollicitudin",
  "aliquam",
  "ultrices",
  "sagittis",
  "orci a scelerisque",
  "purus semper",
  "eget duis at tellus",
  "at urna",
  "condimentum",
  "mattis pellentesque",
  "id nibh",
  "tortor id aliquet",
  "lectus proin",
  "nibh nisl",
  "condimentum",
  "id venenatis",
  "a condimentum",
  "vitae sapien",
  "pellentesque",
  "habitant morbi",
  "tristique",
  "senectus",
  "et netus",
  "et malesuada",
  "fames ac turpis",
  "egestas",
  "sed tempus",
  "urna et pharetra",
  "pharetra",
  "massa massa",
  "ultricies mi quis",
  "hendrerit dolor",
  "magna eget est lorem",
  "ipsum dolor",
  "sit amet consectetur",
  "adipiscing elit pellentesque",
  "habitant morbi",
  "tristique senectus",
  "et netus et malesuada",
  "fames ac turpis",
  "egestas integer eget",
  "aliquet nibh praesent",
  "tristique magna",
  "sit amet purus",
  "gravida quis",
  "blandit turpis",
  "cursus",
];
const now = new Date();
const future = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
const dates = [now];
let currentTime = now.getTime();
const lastTime = future.getTime();
while (currentTime <= lastTime) {
  const newDate = new Date(currentTime);
  currentTime = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate() + 1
  );
  dates.push(new Date(currentTime));
}

const dummyOrders = dummyCompanies.map((company, index) => ({
  id: index,
  companyName: company,
  arriveTime: new Date(
    now.getTime() + Math.random() * (future.getTime() - now.getTime())
  ),
  products: {
    dryIce: Math.round(Math.random() * 500),
    pellets: Math.round(Math.random() * 500),
    blasting: Math.round(Math.random() * 500),
  },
}));

function OrderCalendar() {
  const { t } = useTranslation("orders-calendar");
  return (
    <div className="px-10 md:px-20">
      <p className="h2 sm:h1 mt-12">
        <DateRangeIcon className="text-32 mr-14" />
        {t("ORDERS_CALENDAR")}{" "}
        <span className="text-gray-50 rounded-full px-16 bg-blue-600">
          {dummyOrders.length}
        </span>
      </p>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg my-14">
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <Table className="min-w-xl" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow className="h-48 sm:h-64">
                <TableCell padding="none" className="w-40 md:w-64 text-center">
                  {t("PRODUCT")}
                </TableCell>
                {dates.slice(0, 7).map((date) => (
                  <TableCell
                    padding="none"
                    className="w-40 md:w-64 text-center"
                  >
                    {`${t(Days[date.getDay()])} ${date.getDate()}/${
                      date.getMonth() + 1
                    }`}
                  </TableCell>
                ))}
                <TableCell padding="none" className="w-40 md:w-64 text-center">
                  {t("TOTAL")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="h-56 cursor-pointer" hover tabIndex={-1}>
                <TableCell
                  className="p-4 md:p-10 text-center"
                  component="th"
                  scope="row"
                >
                  {t("DRY_ICE")}
                </TableCell>
                {dates.slice(0, 7).map((date) => (
                  <TableCell
                    className="p-4 md:p-10 text-center"
                    component="th"
                    scope="row"
                  >
                    {dummyOrders
                      .filter(
                        (item) => item.arriveTime.getDate() === date.getDate()
                      )
                      .reduce(
                        (total, currentValue) =>
                          total + currentValue.products.dryIce,
                        0
                      )}
                  </TableCell>
                ))}
                <TableCell
                  className="p-4 md:p-10 text-center"
                  component="th"
                  scope="row"
                >
                  {dates
                    .slice(0, 7)
                    .map((date) =>
                      dummyOrders
                        .filter(
                          (item) => item.arriveTime.getDate() === date.getDate()
                        )
                        .reduce(
                          (total, currentValue) =>
                            total + currentValue.products.dryIce,
                          0
                        )
                    )
                    .reduce((total, value) => total + value, 0)}
                </TableCell>
              </TableRow>
              <TableRow className="h-56 cursor-pointer" hover tabIndex={-1}>
                <TableCell
                  className="p-4 md:p-10 text-center"
                  component="th"
                  scope="row"
                >
                  {t("PELLETS")}
                </TableCell>
                {dates.slice(0, 7).map((date) => (
                  <TableCell
                    className="p-4 md:p-10 text-center"
                    component="th"
                    scope="row"
                  >
                    {dummyOrders
                      .filter(
                        (item) => item.arriveTime.getDate() === date.getDate()
                      )
                      .reduce(
                        (total, currentValue) =>
                          total + currentValue.products.pellets,
                        0
                      )}
                  </TableCell>
                ))}
                <TableCell
                  className="p-4 md:p-10 text-center"
                  component="th"
                  scope="row"
                >
                  {dates
                    .slice(0, 7)
                    .map((date) =>
                      dummyOrders
                        .filter(
                          (item) => item.arriveTime.getDate() === date.getDate()
                        )
                        .reduce(
                          (total, currentValue) =>
                            total + currentValue.products.pellets,
                          0
                        )
                    )
                    .reduce((total, value) => total + value, 0)}
                </TableCell>
              </TableRow>
              <TableRow className="h-56 cursor-pointer" hover tabIndex={-1}>
                <TableCell
                  className="p-4 md:p-10 text-center"
                  component="th"
                  scope="row"
                >
                  {t("BLASTING")}
                </TableCell>
                {dates.slice(0, 7).map((date) => (
                  <TableCell
                    className="p-4 md:p-10 text-center"
                    component="th"
                    scope="row"
                  >
                    {dummyOrders
                      .filter(
                        (item) => item.arriveTime.getDate() === date.getDate()
                      )
                      .reduce(
                        (total, currentValue) =>
                          total + currentValue.products.blasting,
                        0
                      )}
                  </TableCell>
                ))}
                <TableCell
                  className="p-4 md:p-10 text-center"
                  component="th"
                  scope="row"
                >
                  {dates
                    .slice(0, 7)
                    .map((date) =>
                      dummyOrders
                        .filter(
                          (item) => item.arriveTime.getDate() === date.getDate()
                        )
                        .reduce(
                          (total, currentValue) =>
                            total + currentValue.products.blasting,
                          0
                        )
                    )
                    .reduce((total, value) => total + value, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </FuseScrollbars>
      </div>
      <div>
        <OrdersByDateTab tabHeaders={dates} tabItems={dummyOrders} />
      </div>
    </div>
  );
}

export default memo(OrderCalendar);
