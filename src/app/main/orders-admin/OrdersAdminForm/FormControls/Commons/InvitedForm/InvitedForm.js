import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Field from "../Field/Field";
import { InvitedFormS } from "./InvitedForm.style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { intRegex } from "app/lib/regexs";
import { useSelector } from "react-redux";
import { selectCancelStatus } from "app/store/oredersAdmin/ordersAdminSlice";
import { useTranslation } from "react-i18next";

const defaulFormValues = {
  city: "",
  state: "",
  street: "",
  zipCode: "",
  wrehouseId: "None",
  companyName: "",
  email: "",
};

const InvitedForm = ({ warehouses, TryCreateOrder}) => {
  const methods = useFormContext();
  const setBigFormValues = methods.setValue;
  const { t } = useTranslation("orders-admin");

  const cancelForm = useSelector(selectCancelStatus);

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
    reset,
    formState: {dirtyFields, errors },
  } = useForm({
    defaultValues: defaulFormValues,
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const handleChange = (name, data) => {
    setBigFormValues(name, data);
  };

  useEffect(() => {
    if (cancelForm) {
      reset(defaulFormValues);
    }
  }, [cancelForm]);
  return (
    <InvitedFormS>
      <Field
        control={control}
        error={errors.companyName||(!dirtyFields.companyName&&TryCreateOrder)}
        helperText={errors.companyName?errors.companyName.message:!dirtyFields.wrehouseId&&TryCreateOrder?"required field":""}
        labelText={t("COMPANY")}
        name="companyName"
        id="companyName"
        isRequired
        onChange={(value) => handleChange("companyName", value)}
      />
      <Field
        control={control}
        error={errors.email||(!dirtyFields.email&&TryCreateOrder)}
        helperText={errors.email?errors.email.message:!dirtyFields.companyName&&TryCreateOrder?"required field":""}
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
          error={errors.street}
          helperText={errors?.street?.message}
          labelText={t("STREET")}
          name="street"
          id="street"
          placeholder="Street"
        />
        <Field
          control={control}
          onChange={(value) => handleChange("state", value)}
          error={errors.state}
          helperText={errors?.state?.message}
          labelText={t("STATE")}
          name="state"
          id="state"
          placeholder="state"
          type="text"
          options={[]}
        />
        <Field
          control={control}
          onChange={(value) => handleChange("city", value)}
          error={errors.city}
          helperText={errors?.city?.message}
          labelText={t("CITY")}
          name="city"
          id="city"
          placeholder="City"
        />
        <Field
          control={control}
          onChange={(value) => handleChange("zipCode", value)}
          error={errors.zipCode}
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
        error={errors.wrehouseId||(!dirtyFields.wrehouseId&&TryCreateOrder)}
        helperText={errors.wrehouseId?errors.wrehouseId.message:!dirtyFields.wrehouseId&&TryCreateOrder?"required field":""}
        labelText={t("WHAREHOUSE")}
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
