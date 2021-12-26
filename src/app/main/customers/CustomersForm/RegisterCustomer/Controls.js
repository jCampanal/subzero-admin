import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function FormControls({ salesTax }) {
  const { t } = useTranslation("customers-form");

  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const [image, setImage] = useState();

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
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.password}
            type="password"
            helperText={errors?.password?.message}
            label={t("PASSWORD")}
            id="password"
            variant="outlined"
            fullWidth
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
            error={errors.confirmPassword}
            type="password"
            helperText={errors?.confirmPassword?.message}
            label={t("CONFIRMPASSWORD")}
            id="confirmPassword"
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

      <div className="grid gap-x-48 grid-cols-1 ">
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
                label={t("companyName")}
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
      <div className="flex flex-col sm:flex-row sm:gap-7 mt-32 ">
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <label
              htmlFor="button-file"
              title={"CLICK_TO_LOAD"}
              className={
                "flex items-center justify-center relative w-128 h-128 rounded-16 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
              }
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
          <div className="max-w-320">
            <img src={image} alt={t("COOLER_THUMBNAIL")} id="preview" />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormControls;
