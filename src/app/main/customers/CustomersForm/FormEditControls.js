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
} from "@material-ui/core";

function FormControls({ salesTax }) {
  const { t } = useTranslation("customers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
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
            label={t("priorityCustomer")}
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
