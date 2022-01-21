import React, { lazy, useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { CancelRounded } from "@material-ui/icons";

const DateRangePicker = lazy(() =>
  import("../../coolers/Coolers/DateRangePicker")
);

function PageCardedHeader() {
  const { t } = useTranslation("orders-admin");
  const history = useHistory();
  const mainTheme = useSelector(selectMainTheme);
  const [dateRangeDlgIsOpen, openDateRangeDlg] = useState(false);
  const [filter, setFilter] = useState({
    noOrden: "",
    company: "",
    dateFrom: "",
    dateTo: "",
  });
  const [noOrden, setNoOrden] = useState("");
  const [companySearch, setCompanySearch] = useState("");

  const toggleDateRangeDlgIsOpen = () => {
    openDateRangeDlg(!dateRangeDlgIsOpen);
  };

  const searchByDate = (dateFrom, dateTo) => {
    if (dateFrom || dateTo) {
      if (dateFrom && dateTo) {
        setFilter({ ...filter, dateFrom: dateFrom, dateTo: dateTo });
      } else {
        if (dateFrom) {
          setFilter({ ...filter, dateFrom: "", dateTo: dateFrom });
        }
        if (dateTo) {
          setFilter({ ...filter, dateFrom: "", dateTo: dateTo });
        }
      }
    }
  };
  const searchByNoOrden = () => {
    setFilter({ ...filter, noOrden: noOrden });
  };
  const searchByCompany = () => {
    setFilter({ ...filter, company: companySearch });
  };

  const submitFilter = useCallback(() => {
    history.push(
      `/orders_admin?noOrden=${filter.noOrden}&company=${filter.company}&pickedUpFrom=${filter.dateFrom}&pickedUpTo=${filter.dateTo}`
    );
  }, [filter, history]);

  const clearFilter = () => {
    if (
      filter.noOrden !== "" ||
      filter.company !== "" ||
      filter.dateFrom !== "" ||
      filter.dateTo !== ""
    ) {
      setFilter({
        noOrden: "",
        company: "",
        dateFrom: "",
        dateTo: "",
      });
      setNoOrden("");
      setCompanySearch("");
    }
    history.push("/orders_admin");
  };

  const handleCHangeSearchNoOrder = (e) => {
    setNoOrden(e.target.value);
  };
  const handleOnChangeCompany = (e) => {
    setCompanySearch(e.target.value);
  };

  useEffect(() => {
    console.log("filter");
    if (
      filter.noOrden !== "" ||
      filter.company !== "" ||
      filter.dateFrom !== "" ||
      filter.dateTo !== ""
    ) {
      submitFilter();
    }
  }, [filter, submitFilter]);

  return (
    <div className="flex flex-col w-full sm:py-16">
      <div className="flex sm:flex-1 items-center justify-between">
        <div className="flex items-center">
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
            assignment_turned_in
          </Icon>
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
          >
            {t("ORDERS_ADMIN")}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-center px-12 gap-5">
          <ThemeProvider theme={mainTheme}>
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
            >
              <Icon color="action" onClick={searchByNoOrden}>
                search
              </Icon>

              <Input
                placeholder={t("SEARCH_BY_ID")}
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                type="number"
                onChange={handleCHangeSearchNoOrder}
                value={noOrden}
                inputProps={{
                  "aria-label": "Search",
                }}
              />
            </Paper>
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
            >
              <Icon color="action" onClick={searchByCompany}>
                search
              </Icon>

              <Input
                placeholder={t("SEARCH_BY_COMPANY")}
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                onChange={handleOnChangeCompany}
                value={companySearch}
                inputProps={{
                  "aria-label": "Search",
                }}
              />
            </Paper>
          </ThemeProvider>
        </div>
        <motion.div
          className="md:mr-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <IconButton className="sm:hidden" onClick={toggleDateRangeDlgIsOpen}>
            <Icon>calendar_today</Icon>
          </IconButton>
          <Button
            className="whitespace-nowrap hidden sm:inline-block"
            variant="contained"
            color="secondary"
            onClick={toggleDateRangeDlgIsOpen}
          >
            <CalendarTodayIcon className="mr-5" />
            {t("SEARCH_BY_DATE")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          className="inline-block mx-10"
        >
          <IconButton className="sm:hidden" onClick={clearFilter}>
            <CancelRounded />
          </IconButton>
          <Button
            className="whitespace-nowrap hidden sm:inline-block"
            variant="contained"
            color="default"
            onClick={clearFilter}
          >
            <CancelRounded className="mr-5" />
            {t("CLEAR_SEARCH")}
          </Button>
        </motion.div>
        <DateRangePicker
          isOpen={dateRangeDlgIsOpen}
          namespace="orders-admin"
          searchByDate={searchByDate}
          toggleDateRangeDlgIsOpen={toggleDateRangeDlgIsOpen}
          notValidate
          defaultNull
        />
      </div>
      <div className="flex text-right">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <IconButton className="sm:hidden" onClick={() => null}>
            <AddCircleIcon />
          </IconButton>
          <Button
            className="whitespace-nowrap hidden sm:inline-block"
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/orders_create");
            }}
          >
            <AddCircleIcon className="mr-5" />
            {t("NEW_ORDER")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default PageCardedHeader;
