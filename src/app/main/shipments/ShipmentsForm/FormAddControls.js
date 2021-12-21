import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

function FormControls({ salesTax }) {
  const { t } = useTranslation("customers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const [showCompanyAddress, setShowCompanyAddress] = useState(false);

  const handleChangeShowCompanyAddress = (event) => {
    setShowCompanyAddress(event.target.checked);
  };
  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <Controller
        name="addressId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel id="addressId-select-label" className="pl-20 -mt-9">
              {t("ADDRESS")}
            </InputLabel>
            <Select
              {...field}
              error={!!errors.addressId}
              labelId="addressId-select-label"
              id="demo-simple-select"
              required
              label={t("ADDRESS")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {salesTax.map((saleTax) => {
                return (
                  <MenuItem key={saleTax.id} value={saleTax.id}>
                    {saleTax.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="customerId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel id="customerId-select-label" className="pl-20 -mt-9">
              {t("CUSTOMER")}
            </InputLabel>
            <Select
              {...field}
              error={!!errors.customerId}
              labelId="customerId-select-label"
              id="demo-simple-select"
              required
              label={t("CUSTOMER")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {salesTax.map((saleTax) => {
                return (
                  <MenuItem key={saleTax.id} value={saleTax.id}>
                    {saleTax.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="driverId"
        control={control}
        render={({ field }) => (
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
              {salesTax.map((saleTax) => {
                return (
                  <MenuItem key={saleTax.id} value={saleTax.id}>
                    {saleTax.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="deliveryTime"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mb-16">
              <DateTimePicker
                {...field}
                inputFormat="MM/dd/yyyy"
                renderInput={(params) => <TextField {...params} />}
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
      </div>
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
        name="termOrder"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.termOrder}
            helperText={errors?.termOrder?.message}
            label={t("termOrder")}
            id="termOrder"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.status}
            helperText={errors?.status?.message}
            label={t("status")}
            id="status"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="productsDescription"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.productsDescription}
            type="productsDescription"
            helperText={errors?.productsDescription?.message}
            label={t("productsDescription")}
            id="productsDescription"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="productsQuanty"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.productsQuanty}
            helperText={errors?.productsQuanty?.message}
            label={t("productsQuanty")}
            id="productsQuanty"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="productsProductTypeId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel
              id="productsProductTypeId-select-label"
              className="pl-20 -mt-9"
            >
              {t("PRODUCT_TYPE")}
            </InputLabel>
            <Select
              {...field}
              error={!!errors.productsProductTypeId}
              labelId="productsProductTypeId-select-label"
              id="demo-simple-select"
              required
              label={t("PRODUCT_TYPE")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {salesTax.map((saleTax) => {
                return (
                  <MenuItem key={saleTax.id} value={saleTax.id}>
                    {saleTax.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />

      <FormControlLabel
        control={
          <Switch
            checked={showCompanyAddress}
            onChange={handleChangeShowCompanyAddress}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Modify Company Adress"
      />
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        {showCompanyAddress && (
          <>
            <div className="flex flex-col">
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    error={!!errors.street}
                    helperText={errors?.street?.message}
                    label={t("street")}
                    id="street"
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    error={!!errors.city}
                    helperText={errors?.city?.message}
                    label={t("city")}
                    id="city"
                    variant="outlined"
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    error={!!errors.state}
                    helperText={errors?.state?.message}
                    label={t("state")}
                    id="state"
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    error={!!errors.zipCode}
                    helperText={errors?.zipCode?.message}
                    label={t("zipCode")}
                    id="zipCode"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FormControls;
