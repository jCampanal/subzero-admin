import { MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Field from "../Field/Field";
import { CustomerFormS } from "./CustomerForm.style";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const CustomerForm = ({ customers }) => {
  const methods = useFormContext();
  const setBigFormValues = methods.setValue;
  const { t } = useTranslation("orders-admin");
  const validationRules = yup.object().shape({
    customerId: yup
      .string()
      .required(t("REQUIRED"))
      .notOneOf(["Nothing selected"]),
    addressId: yup.string().required(t("REQUIRED")),
  });

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerId: "Nothing selected",
      addressId: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const [selectedCustomer, setSelectedCustomer] = useState();

  const handleChangeCustomer = (customerID) => {
    const slectedCustomer = customers.find((c) => c.id === customerID);
    setSelectedCustomer(slectedCustomer);
    setBigFormValues("customerId", customerID);
  };
  const handleChangeAddress = (addressID) => {
    setBigFormValues("addressId", addressID);
  };
  return (
    <CustomerFormS>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Field
          type="select"
          id="user"
          labelText="User"
          name="customerId"
          isRequired
          onChange={handleChangeCustomer}
          control={control}
          noValue="Nothing selected"
          error={!!errors.customerId}
          helperText={errors?.customerId?.message}
          options={customers.map((customer) => {
            return (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            );
          })}
        />
        <Field
          type="select"
          id="addressId"
          labelText="Shipping address"
          isRequired
          name="addressId"
          control={control}
          onChange={handleChangeAddress}
          error={!!errors.addressId}
          helperText={errors?.addressId?.message}
          noValue=""
          options={
            selectedCustomer
              ? [
                  <MenuItem
                    value={selectedCustomer.company.address.id}
                    key={selectedCustomer.company.id}
                  >
                    {selectedCustomer.company.address.street},{" "}
                    {selectedCustomer.company.address.city},{" "}
                    {selectedCustomer.company.address.state},{" "}
                    {selectedCustomer.company.address.zipCode}
                  </MenuItem>,
                ]
              : []
          }
        />
      </div>
    </CustomerFormS>
  );
};

export default CustomerForm;

CustomerForm.propTypes = {
  customers: PropTypes.array.isRequired,
};
