import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Field from "../Field/Field";
import { InvitedFormS } from "./InvitedForm.style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { intRegex } from "app/lib/regexs";

const InvitedForm = ({ warehouses }) => {
  const methods = useFormContext();
  const setBigFormValues = methods.setValue;
  const { t } = useTranslation("orders-admin");
  const validationRules = yup.object().shape({
    city: yup.string(),
    state: yup.string(),
    street: yup.string(),
    zipCode: yup.string().matches(intRegex, {
      message: t("NOT_NUMBER"),
      excludeEmptyString: true,
    }),
    wrehouseId: yup.string().required().notOneOf(["None"]),
    companyName: yup.string().required(),
    email: yup.string().email().required(),
  });

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
      state: "",
      street: "",
      zipCode: "",
      wrehouseId: "None",
      companyName: "",
      email: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const handleChange = (name, data) => {
    setBigFormValues(name, data);
  };
  return (
    <InvitedFormS>
      <Field
        control={control}
        error={!!errors.companyName}
        helperText={errors?.companyName?.message}
        labelText="Company"
        name="companyName"
        id="companyName"
        isRequired
        onChange={(value) => handleChange("companyName", value)}
      />
      <Field
        control={control}
        error={!!errors.email}
        helperText={errors?.email?.message}
        labelText="Email"
        name="email"
        id="email"
        isRequired
        onChange={(value) => handleChange("email", value)}
      />
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Field
          control={control}
          onChange={(value) => handleChange("street", value)}
          error={!!errors.street}
          helperText={errors?.street?.message}
          labelText="Street"
          name="street"
          id="street"
          placeholder="Street"
        />
        <Field
          control={control}
          onChange={(value) => handleChange("state", value)}
          error={!!errors.state}
          helperText={errors?.state?.message}
          labelText="State"
          name="state"
          id="state"
          placeholder="state"
          type="text"
          options={[]}
        />
        <Field
          control={control}
          onChange={(value) => handleChange("city", value)}
          error={!!errors.city}
          helperText={errors?.city?.message}
          labelText="City"
          name="city"
          id="city"
          placeholder="City"
        />
        <Field
          control={control}
          onChange={(value) => handleChange("zipCode", value)}
          error={!!errors.zipCode}
          helperText={errors?.zipCode?.message}
          labelText="Zip Code"
          name="zipCode"
          id="zipCode"
          placeholder="Zip Code"
        />
      </div>
      <Field
        control={control}
        onChange={(value) => handleChange("wrehouseId", value)}
        error={!!errors.wrehouseId}
        helperText={errors?.wrehouseId?.message}
        labelText="Warehouse"
        name="wrehouseId"
        id="wrehouseId"
        noValue="None"
        type="select"
        isRequired
        options={warehouses.map((ware) => {
          return (
            <MenuItem key={ware.id} value={ware.id}>
              {ware.name}
            </MenuItem>
          );
        })}
      />
    </InvitedFormS>
  );
};

export default InvitedForm;

InvitedForm.propTypes = {
  warehouses: PropTypes.array.isRequired,
};
