import React, { lazy, useEffect, useState } from "react";
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
import { EditLocation } from "@material-ui/icons";
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
    date: "",
  });
  const [searchCode, setSearchCode] = useState("");
  const toggleDateRangeDlgIsOpen = () => {
    openDateRangeDlg(!dateRangeDlgIsOpen);
  };

  const searchByDate = (date) => {
    setFilter({ ...filter, date: date });
  };
  const searchByCode = () => {
    setFilter({ ...filter, code: searchCode });
  };

  const submitFilter = () => {
    if (code) {
      history.push(`/coolers_activity?code=${code}&date=${filter.date}`);
    } else {
      history.push(`/coolers_activity?code=${filter.code}&date=${filter.date}`);
    }
  };

  const handleCHangeSearchCode = (e) => {
    setSearchCode(e.target.value);
  };

  useEffect(() => {
    if (filter.code !== "" || filter.date !== "") {
      submitFilter();
    }
  }, [filter]);

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
              <Icon color="action" onClick={searchByCode}>
                search
              </Icon>

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
      <DateRangePicker
        isOpen={dateRangeDlgIsOpen}
        namespace=""
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
