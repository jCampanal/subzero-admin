import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

function FormControls({ salesTax }) {
  const { t } = useTranslation("customers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <Controller
        name="companyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.companyName}
            helperText={errors?.companyName?.message}
            label={t("companyName")}
            id="companyName"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          className=""
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={errors.name}
              helperText={errors?.name?.message}
              label={t("name")}
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="lastname"
          className="w-5/12 p-2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={errors.lastname}
              helperText={errors?.lastname?.message}
              label={t("lastname")}
              id="lastname"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={errors.email}
              helperText={errors?.email?.message}
              label={t("email")}
              id="email"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={errors.phoneNumber}
              helperText={errors?.phoneNumber?.message}
              label={t("phoneNumber")}
              id="phoneNumber"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.username}
            helperText={errors?.username?.message}
            label={t("USERNAME")}
            id="username"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="streetAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.streetAddress}
            helperText={errors?.streetAddress?.message}
            label={t("streetAddress")}
            id="streetAddress"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="cityAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.cityAddress}
            helperText={errors?.cityAddress?.message}
            label={t("cityAddress")}
            id="cityAddress"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="stateAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.stateAddress}
            helperText={errors?.stateAddress?.message}
            label={t("stateAddress")}
            id="stateAddress"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="zipCodeAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.zipCodeAddress}
            helperText={errors?.zipCodeAddress?.message}
            label={t("zipCodeAddress")}
            id="zipCodeAddress"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="companyAddressId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel
              id="companyAddressId-select-label"
              className="pl-20 -mt-9"
            >
              {t("companyAddressId")}
            </InputLabel>
            <Select
              {...field}
              labelId="companyAddressId-select-label"
              id="demo-simple-select"
              required
              displayEmpty
              label={t("companyAddressId")}
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
        name="salesTaxId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel id="salesTaxId-select-label" className="pl-20 -mt-9">
              {t("SALE_TAX")}
            </InputLabel>
            <Select
              {...field}
              labelId="salesTaxId-select-label"
              id="demo-simple-select"
              required
              displayEmpty
              label={t("SALE_TAX")}
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
        name="priorityCustomer"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className="mt-8 mb-16"
            error={!!errors.priorityCustomer}
            required
            helperText={errors?.priorityCustomer?.message}
            autoFocus
            id="priorityCustomer"
            variant="outlined"
            fullWidth
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={t("PRIORYTI")}
          />
        )}
      />
    </div>
  );
}

export default FormControls;
