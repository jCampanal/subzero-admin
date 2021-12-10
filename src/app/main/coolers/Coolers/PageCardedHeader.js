import React, { useEffect, useState } from "react";
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
import DateRangePicker from "./DateRangePicker";

function PageCardedHeader(props) {
  const { t } = useTranslation("coolers");
  const history = useHistory();
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

  const searchByCode = () => {
    setFilter({ ...filter, code: searchCode });
  };

  const searchByDate = (dateFrom, dateTo) => {
    setFilter({ ...filter, dateFrom: dateFrom, dateTo: dateTo });
  };

  const submitFilter = () => {
    history.push(
      `/coolers?code=${filter.code}&pickedUpFrom=${filter.dateFrom}&pickedUpTo=${filter.dateTo}`
    );
  };

  useEffect(() => {
    if (filter.code !== "" || filter.dateFrom !== "" || filter.dateTo !== "") {
      submitFilter();
    }
  }, [filter]);

  const handleCHangeSearchCode = (e) => {
    setSearchCode(e.target.value);
  };
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
            <span className="fa fa-box" />
          </Icon>
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
          >
            {t("COOLERS")}
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
              <Input
                placeholder={t("SEARCH_BY_CODE")}
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={handleCHangeSearchCode}
              />

              <Icon color="action" onClick={searchByCode}>
                search
              </Icon>
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <IconButton className="sm:hidden" onClick={() => props.addCallback()}>
            <AddCircleIcon />
          </IconButton>
          <Button
            className="whitespace-nowrap hidden sm:inline-block"
            variant="contained"
            color="secondary"
            onClick={() => props.addCallback()}
          >
            <AddCircleIcon className="mr-5" />
            {t("REGISTER")}
          </Button>
        </motion.div>
        <DateRangePicker
          isOpen={dateRangeDlgIsOpen}
          namespace="coolers"
          searchByDate={searchByDate}
          toggleDateRangeDlgIsOpen={toggleDateRangeDlgIsOpen}
        />
      </div>
      <div className="sm:flex-1 text-right">
        <Button
          className="whitespace-nowrap inline-block uppercase"
          onClick={() => history.push("/providers")}
        >
          {t("PROVIDERS")}
        </Button>
        <Button
          className="whitespace-nowrap inline-block uppercase"
          onClick={() => history.push("/coolers_customers")}
        >
          {t("CLIENTS")}
        </Button>
      </div>
    </div>
  );
}

export default PageCardedHeader;
