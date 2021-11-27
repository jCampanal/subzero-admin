import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { DatePicker } from "@material-ui/pickers";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import styled from "styled-components";
const formatDate = (date) => {
  let formatted_date =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  return formatted_date;
};
const validateDate = (compareDate) => {
  const today = new Date();
  if (compareDate <= today) {
    return true;
  } else {
    return false;
  }
};

function DateRangePicker({
  toggleDateRangeDlgIsOpen,
  isOpen,
  namespace,
  searchByDate,
}) {
  const { t } = useTranslation(namespace);
  const [date, setDate] = useState();
  const dispatch = useDispatch();

  const toggleDialog = () => {
    toggleDateRangeDlgIsOpen();
  };
  const search = () => {
    if (validateDate(date)) {
      const formatedDate = formatDate(date);
      searchByDate(formatedDate);
      toggleDateRangeDlgIsOpen();
    } else {
      dispatch(
        showMessage({
          message: "Try a past date",
          variant: "error",
        })
      );
    }
  };

  return (
    <Dialog open={isOpen} onClose={toggleDialog} fullWidth maxWidth="sm">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {t("ADVANCED_SEARCH")}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: "p-0" }}>
        <div className="px-16 sm:px-24">
          <div className="flex -mx-4">
            <DatePicker
              label={t("AcTIVITY_DATE")}
              inputVariant="outlined"
              className="mt-8 mb-16 mx-4 DatePicker-cls"
              value={date}
              onChange={(e) => setDate(new Date(e))}
              variant="dialog"
              okLabel={<ButtonDatePickerS>OK</ButtonDatePickerS>}
              cancelLabel={<ButtonDatePickerS>Cancel</ButtonDatePickerS>}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions className="px-8 py-16 justify-end gap-5">
        <div className="px-16">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={toggleDateRangeDlgIsOpen}
          >
            {t("CANCEL")}
          </Button>
        </div>
        <div className="px-16">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={search}
          >
            {t("SEARCH")}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default DateRangePicker;

DateRangePicker.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  namespace: PropTypes.string.isRequired,
  searchByDate: PropTypes.func.isRequired,
  toggleDateRangeDlgIsOpen: PropTypes.func.isRequired,
};

const ButtonDatePickerS = styled.span`
  background-color: #039be5;

  color: rgb(255, 255, 255);
  padding: 6px 16px;
  font-size: 1.3rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: Poppins, Roboto, "Helvetica", Arial, sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 18px;
  text-transform: none;
`;
