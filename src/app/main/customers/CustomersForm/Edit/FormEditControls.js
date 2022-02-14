import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { optionsTermOrder } from "app/main/orders-admin/helpData";
import EditAddress from "./EditAddress/EditAddress";

function FormControls({ salesTax, warehouses }) {
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
            error={!!errors.companyName}
            helperText={errors?.companyName?.message}
            label={t("COMPANYNAME")}
            id="companyName"
            variant="outlined"
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
        name="warehouseId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel id="warehouseId-select-label" className="pl-20 -mt-9">
              {t("WARE")}
            </InputLabel>
            <Select
              {...field}
              error={!!errors.warehouseId}
              labelId="warehouseId-select-label"
              id="warehouseId-simple-select"
              required
              label={t("WARE")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {warehouses.map((ware) => {
                return (
                  <MenuItem key={ware.id} value={ware.id}>
                    {ware.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="termOrder"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel id="termOrder-select-label" className="pl-20 -mt-9">
              {t("Term order")}
            </InputLabel>
            <Select
              {...field}
              labelId="termOrder-select-label"
              id="demo-simple-select"
              required
              displayEmpty
              label={t("Term order")}
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
        )}
      />
      {errors.termOrder && (
        <FormHelperText error={errors.termOrder}>
          {errors?.termOrder?.message}
        </FormHelperText>
      )}

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

      <Controller
        name="taxExemption"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className="mt-8 mb-16"
            id="taxExemption"
            variant="outlined"
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={t("TAX_EXEPTION")}
          />
        )}
      />

      <EditAddress warehouses={warehouses} />
    </div>
  );
}

export default FormControls;

FormControls.propTypes = {
  salesTax: PropTypes.array.isRequired,
  warehouses: PropTypes.array.isRequired,
};
