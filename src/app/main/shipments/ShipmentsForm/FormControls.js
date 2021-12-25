import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import {
  Checkbox,
  FormControlLabel,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

const optionsStatus = [
  "Waiting",
  "Processing",
  "Shipping",
  "Delivered",
  "Canceled",
];
const optionsTermOrder = ["Net30", "Net7", "COD", "NET60"];

const MenuProps = {
  variant: "menu",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

function FormControls({ orders, drivers }) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { t } = useTranslation("customers-form");
  const { errors } = formState;

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <Controller
        name="orderId"
        control={control}
        render={({ field }) => {
          return (
            <FormControl className="mt-8 mb-16">
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
        name="driverId"
        control={control}
        render={({ field }) => {
          return (
            <FormControl className="mt-8 mb-16">
              <InputLabel id="driverId-select-label" className="pl-20 -mt-9">
                {t("DRIVER")}
              </InputLabel>
              <Select
                {...field}
                error={!!errors.driverId}
                labelId="driverId-select-label"
                id="demo-simple-select"
                required
                label={t("DRIVER")}
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
              >
                {drivers.map((driver) => {
                  return (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }}
      />
    </div>
  );
}

export default FormControls;
