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
  Switch,
} from "@material-ui/core";
import { useState } from "react";

function FormControls({ salesTax }) {
  const { t } = useTranslation("customers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [showCompanyAddress, setShowCompanyAddress] = useState(false);

  const handleChangeShowCompanyName = (event) => {
    setShowCompanyName(event.target.checked);
  };
  const handleChangeShowCompanyAddress = (event) => {
    setShowCompanyAddress(event.target.checked);
  };

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          className=""
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.name}
              helperText={errors?.name?.message}
              label={t("NAME")}
              id="name"
              variant="outlined"
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
              error={!!errors.lastname}
              helperText={errors?.lastname?.message}
              label={t("LASTNAME")}
              id="lastname"
              variant="outlined"
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
              error={!!errors.email}
              helperText={errors?.email?.message}
              label={t("EMAIL")}
              id="email"
              variant="outlined"
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
              error={!!errors.phoneNumber}
              helperText={errors?.phoneNumber?.message}
              label={t("PHONO")}
              id="phoneNumber"
              variant="outlined"
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
            error={!!errors.username}
            helperText={errors?.username?.message}
            label={t("USERNAME")}
            id="username"
            variant="outlined"
          />
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
              error={!!errors.salesTaxId}
              labelId="salesTaxId-select-label"
              id="demo-simple-select"
              required
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
            id="priorityCustomer"
            variant="outlined"
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

      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col">
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.companyName}
                helperText={errors?.companyName?.message}
                label={t("COMPANYNAME")}
                id="companyName"
                variant="outlined"
              />
            )}
          />
        </div>

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
                label={t("STREET")}
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
                label={t("CITY")}
                id="city"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.state}
                helperText={errors?.state?.message}
                label={t("STATE")}
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
                label={t("ZIPCODE")}
                id="zipCode"
                variant="outlined"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default FormControls;
