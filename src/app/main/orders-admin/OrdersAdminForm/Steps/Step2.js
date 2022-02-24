import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { days, MenuProps, optionsTermOrder } from "../../helpData";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import Step3 from "./Step3";
const Step2 = ({ customers, drivers }) => {
  const { t } = useTranslation("orders-admin");

  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const [isOpenMulti2, setOpenMulti2] = useState(false);
  return (
    <React.Fragment>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="customerId"
          control={control}
          render={({ field }) => {
            return (
              <FormControl className="mt-8 mb-16">
                <InputLabel
                  id="customerId-select-label"
                  className="pl-20 -mt-9"
                >
                  {t("CUSTOMER")}
                </InputLabel>
                <Select
                  {...field}
                  error={!!errors.customerId}
                  helperText={errors?.customerId?.message}
                  labelId="customerId-select-label"
                  id="demo-simple-select"
                  required
                  label={t("CUSTOMER")}
                  inputProps={{ "aria-label": "Without label" }}
                  variant="outlined"
                >
                  {customers.map((customer) => {
                    return (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            );
          }}
        />
        <Step3 />
      </div>

      <Controller
        name="daysToOrder"
        control={control}
        render={({ field }) => {
          const value = field.value;
          return (
            <FormControl className="mt-8 mb-16">
              <InputLabel id="daysToOrder-select-label" className="pl-20 -mt-9">
                {t("daysToOrder")}
              </InputLabel>
              <Select
                label={t("daysToOrder")}
                style={{ width: "100%" }}
                error={!!errors.daysToOrder}
                helperText={errors?.daysToOrder?.message}
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

      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="scheduleStatus"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              className="mt-8 mb-16"
              id="scheduleStatus"
              variant="outlined"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label={t("scheduleStatus")}
            />
          )}
        />

        <Controller
          name="pickUp"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              className="mt-8 mb-16"
              id="pickUp"
              variant="outlined"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label={t("PICKUP")}
            />
          )}
        />
      </div>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="deliveryTime"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mb-16">
              <DateTimePicker
                {...field}
                error={!!errors.deliveryTime}
                required
                helperText={errors?.deliveryTime?.message}
                label={t("DELIVERY_TIME")}
                id="deliveryTime"
                variant="outlined"
                fullWidth
              />
            </FormControl>
          )}
        />
      </div>

      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
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
                  <MenuItem value={""}>Without driver</MenuItem>
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

        <Controller
          name="termOrder"
          control={control}
          render={({ field }) => {
            return (
              <FormControl className="mt-8 mb-16">
                <InputLabel id="termOrder-select-label" className="pl-20 -mt-9">
                  {t("termOrder")}
                </InputLabel>
                <Select
                  {...field}
                  error={!!errors.termOrder}
                  helperText={errors?.termOrder?.message}
                  labelId="termOrder-select-label"
                  id="demo-simple-select"
                  required
                  label={t("termOrder")}
                  inputProps={{ "aria-label": "Without label" }}
                  variant="outlined"
                >
                  {optionsTermOrder.map((termOrder) => {
                    return (
                      <MenuItem key={termOrder} value={termOrder}>
                        {termOrder}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            );
          }}
        />

        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={errors.tag}
              helperText={errors?.tag?.message}
              label={t("tag")}
              id="tag"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.priority}
              helperText={errors?.priority?.message}
              label={t("PRIORITY")}
              id="priority"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="poNo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.poNo}
              helperText={errors?.poNo?.message}
              label={t("PHONE_NUMBER")}
              id="poNo"
              variant="outlined"
            />
          )}
        />
      </div>
    </React.Fragment>
  );
};

export default Step2;

Step2.propTypes = {
  customers: PropTypes.array.isRequired,
  drivers: PropTypes.array.isRequired,
};
