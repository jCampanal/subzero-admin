import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

function FormControls({ orders, drivers }) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { t } = useTranslation("shipments");
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
