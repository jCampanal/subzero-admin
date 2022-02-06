import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";

function FormControls({ salesTax }) {
  const { t } = useTranslation("customers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            className="mt-8 mb-16"
            error={!!errors.email}
            required
            helperText={errors?.email?.message}
            label={t("EMAIL")}
            id="email"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="companyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="companyName"
            className="mt-8 mb-16"
            error={!!errors.companyName}
            required
            helperText={errors?.companyName?.message}
            label={t("COMPANY_NAME")}
            id="companyName"
            variant="outlined"
            fullWidth
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
    </div>
  );
}

export default FormControls;

FormControls.propTypes = {
  salesTax: PropTypes.array.isRequired,
};
