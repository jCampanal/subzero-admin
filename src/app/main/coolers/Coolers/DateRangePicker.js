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
import { useHistory } from "react-router";

function DateRangePicker(props) {
  const { t } = useTranslation(props.namespace);
  const [dialogIsOpen, openDialog] = useState(false);
  const [date, setDate] = useState();

  const toggleDialog = () => {
    openDialog(!dialogIsOpen);
  };
  const search = () => {
    props.searchByDate(date);

    console.log("date", date);

    openDialog(!dialogIsOpen);
  };
  useEffect(() => openDialog(props.isOpen), [props.isOpen]);
  return (
    <Dialog open={dialogIsOpen} onClose={toggleDialog} fullWidth maxWidth="sm">
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
              className="mt-8 mb-16 mx-4"
              value={date}
              onChange={(e) => setDate(e)}
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
            onClick={toggleDialog}
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
};
