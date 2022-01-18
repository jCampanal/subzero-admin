import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getAllOrders } from "app/api-conn/shipments_order";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import { days, MenuProps } from "app/main/orders-admin/helpData";
import { useTranslation } from "react-i18next";
import { putSchedule } from "app/api-conn/schedules";
import { getBinaryDays } from "app/lib/formatDate";

export default function EditDialog({ open, schedule, handleClose }) {
  console.log("schedule", schedule);
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation("schedules");
  const [isOpenMulti2, setOpenMulti2] = useState(false);

  const dispatch = useDispatch();
  const validationRules = yup.object().shape({
    daysToOrder: yup.array().isRequired,
    status: yup.boolean().isRequired,
    orderId: yup.string.isRequired,
  });
  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      daysToOrder: [],
      status: schedule.status,
      orderId: schedule.order.id,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const { errors, dirtyFields, isValid } = formState;

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

  const onSubmit = (formData) => {
    const data = {
      daysToOrder: getBinaryDays(formData.daysToOrder),
      status: formData.status,
      orderId: formData.orderId,
    };

    putSchedule(schedule.id, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            showMessage({
              message: "The schedule was successfully updated",
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
        }
        handleClose();
        return null;
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: error.response.data.title || error.response.data.message,
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <Controller
            name="orderId"
            control={control}
            render={({ field }) => {
              return (
                <FormControl className="mt-8 mb-16 w-full">
                  <InputLabel id="orderId-select-label" className="pl-20 -mt-9">
                    {t("ORDER")}
                  </InputLabel>
                  <Select
                    {...field}
                    error={!!errors.orderId}
                    labelId="orderId-select-label"
                    id="demo-simple-select"
                    required
                    label={t("ORDER")}
                    inputProps={{ "aria-label": "Without label" }}
                    variant="outlined"
                  >
                    {orders.map((order) => {
                      return (
                        <MenuItem key={order.id} value={order.id}>
                          {order.address.state}, {order.address.city},{" "}
                          {order.address.street}, {order.tag}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
          <Controller
            name="daysToOrder"
            control={control}
            render={({ field }) => {
              const value = field.value;
              return (
                <FormControl className="mt-8 mb-16 w-full">
                  <InputLabel
                    id="daysToOrder-select-label"
                    className="pl-20 -mt-9 "
                  >
                    {t("daysToOrder")}
                  </InputLabel>
                  <Select
                    label={t("daysToOrder")}
                    style={{ width: "100%" }}
                    error={!!errors.daysToOrder}
                    multiple={true}
                    value={value}
                    onClose={(event) => {
                      field.onBlur(event);
                      setOpenMulti2(false);
                    }}
                    onOpen={() => setOpenMulti2(true)}
                    open={isOpenMulti2}
                    displayEmpty={true}
                    MenuProps={MenuProps}
                    renderValue={(selected) => {
                      return selected?.map((option) => option.name).join(", ");
                    }}
                    {...field}
                    inputProps={{ "aria-label": "Without label" }}
                    variant="outlined"
                  >
                    {days.map((day, i) => (
                      <MenuItem key={i} value={day}>
                        <Checkbox checked={value.indexOf(day) >= 0} />
                        <ListItemText primary={day.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                className="mt-8 mb-16"
                id="status"
                variant="outlined"
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={t("status")}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={dirtyFields === {} || !isValid}
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  schedule: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};
