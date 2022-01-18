import React from "react";
import { TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
const Step3 = () => {
  const { t } = useTranslation("orders-admin");

  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
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
    </div>
  );
};

export default Step3;
