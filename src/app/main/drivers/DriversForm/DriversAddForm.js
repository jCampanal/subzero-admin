import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./AddFormControls";
import FormHeader from "./FormHeader";

import FuseLoading from "@fuse/core/FuseLoading";
import { getAllWarehouses } from "app/api-conn/warehouses";
import { showMessage } from "app/store/fuse/messageSlice";
import { phoneRegex } from "app/lib/regexs";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const driverForm = () => {
  const driver = {
    userName: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    warehouseId: "",
    phoneNumber: "",
    image: null,
  };
  const { t } = useTranslation("drivers-form");
  const validationRules = yup.object().shape({
    userName: yup.string().required(t("REQUIRED")),
    name: yup.string().required(t("REQUIRED")),
    lastName: yup.string().required(t("REQUIRED")),
    email: yup.string().email(t("NOT_EMAIL")).max(255),
    password: yup.string().max(255).min(8).required(t("REQUIRED")),
    confirmPassword: yup
      .string()

      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
    warehouseId: yup.string().required(t("REQUIRED")),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: t("NOT_PHONE"),
      excludeEmptyString: true,
    }),
    image: yup.mixed(),
  });

  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      userName: driver.userName,
      name: driver.name,
      lastName: driver.lastName,
      email: driver.email,
      password: driver.password,
      confirmPassword: driver.confirmPassword,
      warehouseId: driver.warehouseId,
      phoneNumber: driver.phoneNumber,
      image: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadWareHouses = () => {
    setLoading(true);
    getAllWarehouses()
      .then((response) => {
        setWarehouses(response.data);
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: t("ERRO_LOADING"),
            variant: "error",
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWareHouses();
  }, []);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "",
        }}
        header={<FormHeader />}
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? (
              <FuseLoading />
            ) : (
              <FormControls warehouses={warehouses} />
            )}
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(driverForm);
