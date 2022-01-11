import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getAllOrders } from "app/api-conn/shipments_order";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";

export default function EditDialog({ open, schedule, handleClose }) {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const validationRules = yup.object().shape({
    daysToOrder: yup.array().isRequired,
    status: yup.boolean().isRequired,
    orderId: yup.string.isRequired,
  });
  const methods = useForm({
    defaultValues: {
      daysToOrder: [],
      status: schedule.status,
      orderId: schedule.order.id,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const fetchOrders = useCallback(() => {
    getAllOrders()
      .then((res) => {
        setOrders(res.data);
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
      });
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  schedule: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
