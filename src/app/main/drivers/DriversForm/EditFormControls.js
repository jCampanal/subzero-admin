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
  const { control } = methods;

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
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
              displayEmpty
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
      <Controller
        name="userId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel id="userId-select-label" className="pl-20 -mt-9">
              {t("USER")}
            </InputLabel>
            <Select
              {...field}
              labelId="userId-select-label"
              id="demo-simple-select"
              required
              displayEmpty
              label={t("USER")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {users.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
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
