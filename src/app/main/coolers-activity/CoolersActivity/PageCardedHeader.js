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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { CancelRounded, EditLocation } from "@material-ui/icons";
const DateRangePicker = lazy(() =>
  import("../../coolers/Coolers/DateRangePicker")
);

function PageCardedHeader({ code, handleMoveCoolerActivity }) {
  const history = useHistory();
  const { t } = useTranslation("coolers-activity");
  const mainTheme = useSelector(selectMainTheme);
  const [dateRangeDlgIsOpen, openDateRangeDlg] = useState(false);
  const [filter, setFilter] = useState({
    code: "",
    dateFrom: "",
    dateTo: "",
  });
  const [searchCode, setSearchCode] = useState("");
  const toggleDateRangeDlgIsOpen = () => {
    openDateRangeDlg(!dateRangeDlgIsOpen);
  };

  const searchByDate = (dateFrom, dateTo) => {
    setFilter({ ...filter, dateFrom: dateFrom, dateTo: dateTo });
  };
  const searchByCode = () => {
    setFilter({ ...filter, code: searchCode });
  };

  const submitFilter = useCallback(() => {
    history.push(
      `/coolers_activity?code=${filter.code}&pickedUpFrom=${filter.dateFrom}&pickedUpTo=${filter.dateTo}`
    );
  }, [filter, history]);
  const clearFilter = () => {
    if (filter.code !== "" || filter.dateFrom !== "" || filter.dateTo !== "") {
      setFilter({
        code: "",
        dateFrom: "",
        dateTo: "",
      });
      setSearchCode("");
    }
    history.push("/coolers_activity");
  };

  const handleCHangeSearchCode = (e) => {
    setSearchCode(e.target.value);
  };

  useEffect(() => {
    if (filter.code !== "" || filter.dateFrom !== "" || filter.dateTo !== "") {
      submitFilter();
    }
  }, [filter, submitFilter]);

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          history
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          {t("COOLERS_ACTIVITY")}
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center px-12 gap-5">
        <ThemeProvider theme={mainTheme}>
          {!code ? (
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
            >
              <Input
                placeholder={t("SEARCH_BY_CODE")}
                className="flex flex-1 mx-8"
                onChange={handleCHangeSearchCode}
                value={searchCode}
                disableUnderline
                fullWidth
                inputProps={{
                  "aria-label": "Search",
                }}
              />
              <Icon color="action" onClick={searchByCode}>
                search
              </Icon>
            </Paper>
          ) : (
            <motion.div
              className="md:mr-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
              <Button
                className="whitespace-nowrap hidden sm:inline-block"
                variant="contained"
                color="secondary"
                onClick={handleMoveCoolerActivity}
              >
                <EditLocation className="mr-5" />
                {t("MOVE_ACTIVITY")}
              </Button>
            </motion.div>
          )}
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
        namespace="coolers"
        searchByDate={searchByDate}
        toggleDateRangeDlgIsOpen={toggleDateRangeDlgIsOpen}
      />
    </div>
  );
}

export default PageCardedHeader;
PageCardedHeader.propTypes = {
  code: PropTypes.string,
  handleMoveCoolerActivity: PropTypes.func.isRequired,
};
