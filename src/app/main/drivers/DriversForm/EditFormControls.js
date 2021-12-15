import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { useState } from "react";

function FormControls({ warehouses, users }) {
  const { t } = useTranslation("drivers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

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
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label={t("email")}
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
              label={t("phoneNumber")}
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
              {t("WAREHOUSEID")}
            </InputLabel>
            <Select
              {...field}
              labelId="warehouseId-select-label"
              id="demo-simple-select"
              required
              label={t("WAREHOUSEID")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {warehouses.map((wareHouse) => {
                return (
                  <MenuItem key={wareHouse.id} value={wareHouse.id}>
                    {wareHouse.name}
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
