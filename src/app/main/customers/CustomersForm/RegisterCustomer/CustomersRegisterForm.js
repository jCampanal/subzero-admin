import FuseLoading from "@fuse/core/FuseLoading";
import { yupResolver } from "@hookform/resolvers/yup";

import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import * as yup from "yup";

import Controls from "./Controls";

const validationRules = yup.object().shape({
  city: yup.string(),
  companyName: yup.string(),
  confirmPassword: yup
    .string()
    .max(255)
    .min(6)
    .required("REQUIRED")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  lastname: yup.string().required("REQUIRED"),
  name: yup.string().required("REQUIRED"),
  password: yup
    .string()
    .max(255)
    .min(6)
    .required("REQUIRED")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(
      /^(?=.*[!@#$%&*_+-,./';)(><^=-?])/,
      "Must contain at least one special character"
    ),
  phoneNumber: yup.string(),
  salesTaxId: yup.string().required("REQUIRED"),
  state: yup.string(),
  street: yup.string(),
  username: yup.string().required("REQUIRED"),
  zipCode: yup.number(),
});

const CustomersRegisterForm = () => {
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      id: "as6das+6das6d56asd",
      city: "",
      companyName: "",
      confirmPassword: "",
      lastname: "",
      name: "",
      password: "",
      phoneNumber: "",
      salesTaxId: "",
      state: "",
      street: "",
      username: "",
      zipCode: "",
      image: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const [salesTax, setsalesTax] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadSalesTax = () => {
    setLoading(true);
    getAllsalesTax()
      .then((response) => {
        setsalesTax(response.data);
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSalesTax();
  }, []);

  return (
    <>
      {loading ? (
        <FuseLoading />
      ) : (
        <FormProvider {...methods}>
          <Controls salesTax={salesTax} />
        </FormProvider>
      )}
    </>
  );
};

export default CustomersRegisterForm;
