import FuseLoading from "@fuse/core/FuseLoading";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-ui/core";

import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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

  const {
    getValues,
    formState: { dirtyFields, isValid },
  } = methods;

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
          <div className="w-full h-full pb-56 bg-grey-50">
            <div className="w-full flex justify-center ">
              <div className="w-11/12 sm:w-3/4 max-w-640 mt-72 bg-grey-50-500  rounded-8 shadow-20 p-44 pt-56 pb-56 text-center">
                <h1 className="mb-10 justify-center">Get Started</h1>
                <p className="mb-10">
                  Already have an account?
                  <Link to={"/login"}> Login</Link>
                </p>

                <main>
                  <form action="">
                    <Controls salesTax={salesTax} />
                    <div className="w-full">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth
                        disabled={dirtyFields === {} || !isValid}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </main>
              </div>
            </div>
          </div>
        </FormProvider>
      )}
    </>
  );
};

export default CustomersRegisterForm;
