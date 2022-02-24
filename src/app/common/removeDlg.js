import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { closeDialog } from "../store/fuse/dialogSlice";
import PropTypes from "prop-types";
const RemoveDlg = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <DialogTitle id="alert-dialog-title">{props.dlgTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.dlgText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeDialog())} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.proceedCallback();
            dispatch(closeDialog());
          }}
          color="primary"
        >
          Proceed
        </Button>
      </DialogActions>
    </>
  );
};

export default RemoveDlg;

RemoveDlg.propTypes = {
  dlgText: PropTypes.string.isRequired,
  dlgTitle: PropTypes.string.isRequired,
  proceedCallback: PropTypes.func.isRequired,
};
