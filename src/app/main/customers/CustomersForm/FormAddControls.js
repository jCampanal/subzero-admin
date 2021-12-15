import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import { Icon, InputLabel, MenuItem, Select } from "@material-ui/core";
import clsx from "clsx";

function FormControls({ salesTax }) {
  const { t } = useTranslation("customers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [image, setImage] = useState();

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
            label={t("companyName")}
            id="companyName"
            variant="outlined"
          />
        )}
      />
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.name}
              helperText={errors?.name?.message}
              label={t("name")}
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
              label={t("lastname")}
              id="lastname"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.username}
              helperText={errors?.username?.message}
              label={t("username")}
              id="username"
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
              label={t("phoneNumber")}
              id="phoneNumber"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.password}
              helperText={errors?.password?.message}
              label={t("password")}
              id="password"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              label={t("confirmPassword")}
              id="confirmPassword"
              variant="outlined"
            />
          )}
        />
      </div>

      <Controller
        name="companyAddressStreet"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.companyAddressStreet}
            helperText={errors?.companyAddressStreet?.message}
            label={t("companyAddressStreet")}
            id="companyAddressStreet"
            variant="outlined"
          />
        )}
      />
      <Controller
        name="companyAddressCity"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.companyAddressCity}
            helperText={errors?.companyAddressCity?.message}
            label={t("companyAddressCity")}
            id="companyAddressCity"
            variant="outlined"
          />
        )}
      />
      <Controller
        name="companyAddressState"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.companyAddressState}
            helperText={errors?.companyAddressState?.message}
            label={t("companyAddressState")}
            id="companyAddressState"
            variant="outlined"
          />
        )}
      />
      <Controller
        name="companyAddressZipCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.companyAddressZipCode}
            helperText={errors?.companyAddressZipCode?.message}
            label={t("companyAddressZipCode")}
            id="companyAddressZipCode"
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

      <div className="flex flex-col sm:flex-row sm:gap-7">
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <label
              className={
                "flex items-center justify-center relative w-128 h-128 rounded-16 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
              }
              htmlFor="button-file"
              title={t("CLICK_TO_LOAD")}
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={(e) => {
                  setImage(URL.createObjectURL(e.target.files[0]));

                  onChange(e.target.files[0]);
                }}
              />
              <Icon fontSize="large" color="action">
                cloud_upload
              </Icon>
            </label>
          )}
        />
        {image && (
          <div>
            <img src={image} alt={t("COOLER_THUMBNAIL")} id="preview" />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormControls;
